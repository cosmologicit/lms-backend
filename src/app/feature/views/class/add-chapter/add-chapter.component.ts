import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Association, Chapter, SaveChapter, Subject } from 'src/app/core/api-models/class-model';
import { Branch } from 'src/app/core/api-models/institute-model';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';

@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.scss']
})
export class AddChapterComponent implements OnInit {
  data: Chapter = {};
  saveChapter: SaveChapter = {
    chapterDetails:[{}]
  };
  status: string = 'Add';
  branches: Array<Branch> = [];
  subjects: Array<Subject> = [];
  filteredSubjects: Array<Subject> = [];
  classes: Array<Association> = [];
  isChapterFormVisible = true;

  @ViewChild('chapterForm') chapterForm?: any;
  @Output() confirmed = new EventEmitter<boolean>();
  constructor(public dialogRef: MatDialogRef<AddChapterComponent>, @Inject(MAT_DIALOG_DATA) public details: { id: number },
    private classService: ClassService, private toastr: ToastrService, private instituteService: InstituteService) { }
  
  ngOnInit() {
    const subs = forkJoin({
      cls: this.classService.getAllClasses(),
      sub: this.classService.getAllSubject()
    }).subscribe(({ cls, sub }) => {
      if (cls.code == 200) {
        this.classes = cls.data;
      } else {
        this.toastr.error(cls.message);
      }

      if (sub.code == 200) {
        this.subjects = sub.data;
      } else {
        this.toastr.error(sub.message);
      }

      this.loadData();
      subs.unsubscribe();
    });
  }

  loadData(){
    if (this.details.id) {
      this.status = 'Edit';
      const sub = this.classService.getChapterById(this.details.id).subscribe(res => {
        if (res.code == 200) {
          this.data = res.data;
          this.filterSubject()
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    }
  }
  
  close() {
    this.dialogRef.close();
  }

  filterSubject() {
    if (this.data.associationId) {
      this.filteredSubjects = this.subjects.filter(x => x.associationIds != undefined && x.associationIds.length > 0 && x.associationIds?.findIndex(associationId => associationId == this.data.associationId!) > -1);
      if (this.filteredSubjects.length == 0) {
        this.toastr.error('There is no subject link with selected class');
      }
    } else {
      this.filteredSubjects = [];
    }
  }

  onSubmit() {
     if (this.isChapterFormVisible) {
      this.chapterForm.control.markAllAsTouched();
    }
    if (!this.chapterForm.form.valid)
      return;

    if (this.details.id) {
      const sub = this.classService.updateChapter(this.data).subscribe(res => {
        if (res.code == 200) {
          this.toastr.success(res.message);
          this.confirmed.emit(true);
          this.close();
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    } else {  
      this.saveChapter.chapterDetails?.forEach((x, idx) => {
        if (x.name == null || x.name == undefined || x.name.trim().length == 0) {
          this.saveChapter.chapterDetails?.splice(idx, 1);
        }
      })
      this.saveChapter.associationId = this.data.associationId?this.data.associationId:undefined;
      this.saveChapter.subjectId = this.data.subjectId?this.data.subjectId:undefined;
      const sub = this.classService.saveChapter(this.saveChapter).subscribe(res => {
        if (res.code == 200) {
          this.toastr.success(res.message);
          this.confirmed.emit(true);
          this.close();
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    }
  }


  addChapter() {
    this.saveChapter.chapterDetails?.push({});    
  }

  removeChapter(idx:number) {
    this.saveChapter.chapterDetails?.splice(idx, 1);
  }

}
