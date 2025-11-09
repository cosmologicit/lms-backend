import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Association, Chapter, Subject } from 'src/app/core/api-models/class-model';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { AddChapterComponent } from '../add-chapter/add-chapter.component';
import { ConfirmationDialogComponent } from 'src/app/feature/shared/confirmation-dialog/confirmation-dialog.component';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AppStateService } from 'src/app/core/services/app-state/app.state.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent {
  toggleValue = 'table';
  filterChapterText: string = '';
  chapters: Array<Chapter> = [];
  filteredChapters: Array<Chapter> = [];
  role: string = '';
  selectedSubject: number = 0;
  selectedClass: number = 0;
  subjects: Array<Subject> = [
    {
      id: 0,
      name:'All'
    }
  ];
  classes: Array<Association> = [
    {
      id: 0,
      name:'All'
    }
  ];
  public ColumnMode = ColumnMode;

  constructor(public dialog: MatDialog, private classService: ClassService, private toastr: ToastrService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.role = this.authService.role;
    const cls = this.classService.getAllClasses().subscribe(res => {
      if (res.code == 200) {
        res.data.forEach(x => {
          this.classes.push(x);
        });
      } else {
        this.toastr.error(res.message);
      }
      cls.unsubscribe();
    })
    const sub = this.classService.getAllSubject().subscribe(res => {
      if (res.code == 200) {
        res.data.forEach(x => {
          this.subjects.push(x);
        })
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    });
    this.loadTableData();
  }

  loadTableData() {
    const sub = this.classService.getAllChapters().subscribe(res => {
      if (res.data) {
        this.chapters = res.data;
        this.filteredChapters = this.chapters;
      } else {
        this.toastr.error(res.message);        
      }
      sub.unsubscribe();
    })
  }

  filterChapters() {
    this.filteredChapters = [...this.chapters];

    if (this.filterChapterText?.length > 0) {
      let text = this.filterChapterText.toLowerCase();
      this.filteredChapters = this.chapters.filter(x =>
        (x.name && x.name.toLowerCase().includes(text)));
    }
    

    if (this.selectedSubject && this.selectedSubject != 0 && this.selectedClass && this.selectedClass != 0) {
      this.filteredChapters = this.filteredChapters.filter(x => (x.subjectId && x.subjectId == this.selectedSubject && x.associationId == this.selectedClass));
    } else if (this.selectedSubject && this.selectedSubject != 0 && this.selectedClass == 0) {
      this.filteredChapters = this.filteredChapters.filter(x => (x.subjectId && x.subjectId == this.selectedSubject));
    } else if (this.selectedSubject == 0 && this.selectedClass && this.selectedClass != 0) {
      this.filteredChapters = this.filteredChapters.filter(x => (x.associationId == this.selectedClass)); 
    }
  }

  openAddChapter() {
    let dialogRef = this.dialog.open(AddChapterComponent, {
      width: '50%',
      autoFocus: false,
      data: {}
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        this.loadTableData();
      }
    });
  }

  editChapter(id: number) {
    let dialogRef = this.dialog.open(AddChapterComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        id: id
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        this.loadTableData();
      }
    });
  }

  deleteChapter(id: number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        title: 'Delete Chapter',
        message: 'Are you sure you want to delete the selected chapter?'
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        const sub = this.classService.deleteChapter(id).subscribe(res => {
          if (res.code == 200) {
            this.toastr.success(res.message);
            this.loadTableData();
          } else {
            this.toastr.error(res.message);
          }
          sub.unsubscribe();
        });
      }
    });
  }
}
