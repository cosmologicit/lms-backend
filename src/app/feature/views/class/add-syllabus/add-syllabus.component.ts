import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Association, Chapter, Subject, Syllabus } from 'src/app/core/api-models/class-model';
import { ClassService } from 'src/app/core/api-services/class/class.service';

@Component({
  selector: 'app-add-syllabus',
  templateUrl: './add-syllabus.component.html',
  styleUrls: ['./add-syllabus.component.scss']
})
export class AddSyllabusComponent implements OnInit {
  status: string = 'Add';
  data: Syllabus = {};
  classes: Array<Association> = [];
  subjects: Array<Subject> = [];
  filteredSubject: Array<Subject> = [];
  chapters: Array<Chapter> = [];
  filteredChapters: Array<Chapter> = [];
  isSyllabusFormVisible = true;

  @ViewChild('syllabusForm') syllabusForm?: any;
  @Output() confirmed = new EventEmitter<boolean>();
  constructor(public dialogRef: MatDialogRef<AddSyllabusComponent>, @Inject(MAT_DIALOG_DATA) public details: { id: number },
  private classService:ClassService,private toastr:ToastrService) { }
  
  ngOnInit() {
    const subs = forkJoin({
      cls: this.classService.getAllClasses(),
      sub: this.classService.getAllSubject(),
      chap: this.classService.getAllChapters()
    }).subscribe(({ cls, sub, chap }) => {
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
      
      if (chap.code == 200) {
        this.chapters = chap.data;
      } else {
        this.toastr.error(chap.message);
      }
      this.loadData();
      subs.unsubscribe();
    });
  }

  loadData() {
    if (this.details.id) {
      this.status = 'Edit';
      const sub = this.classService.getSyllabusById(this.details.id).subscribe(res => {
        if (res.code == 200) {
          this.data = res.data;           
          this.filterSubject();
           this.filterChapters();
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

  onSubmit() {
    if (this.isSyllabusFormVisible)
      this.syllabusForm.control.markAllAsTouched();
    if (!this.syllabusForm.form.valid) {
      return
    }

    if (this.details.id) {
      const sub = this.classService.updateSyllabus(this.data).subscribe(res => {
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
      const sub = this.classService.saveSyllabus(this.data).subscribe(res => {
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

  filterSubject() {
    if (this.data.associationId) {
      this.filteredSubject = this.subjects.filter(res => res.associationIds && res.associationIds.length > 0 && res.associationIds.findIndex(id => id == this.data.associationId!) > -1);      
       if (this.filteredSubject.length == 0) {
        this.toastr.error('There is no subject link with selected class');
      }
    } else {
      this.filteredSubject = [];
    }
  }

 filterChapters() {
    if (!this.details.id) {
      this.data.chapterIds = [];
    }
   if (this.data.associationId && this.data.subjectId) {
      console.log('ghjk');
      
      this.filteredChapters = this.chapters.filter(x => x.subjectId == this.data.subjectId && x.associationId == this.data.associationId);
      console.log(this.filteredChapters);
    } else {
      this.filteredChapters = [];
    }
  }
}
