import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Assignment, Association, Chapter } from 'src/app/core/api-models/class-model';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { Subject } from 'src/app/core/api-models/class-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assignment-details',
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.scss']
})
export class AssignmentDetailsComponent implements OnInit {
  isAssignmentFormVisible = true;
  data: Assignment = {};
  subjects: Array<Subject> = [];
  filteredSubjects: Array<Subject> = [];
  classes: Array<Association> = [];
  chapters: Array<Chapter> = [];
  filteredChapters: Array<Chapter> = [];

  @Output() confirmed = new EventEmitter<Assignment>();
  @ViewChild('assignmentForm') assignmentForm?: any;
  constructor(public dialogRef: MatDialogRef<AssignmentDetailsComponent>, @Inject(MAT_DIALOG_DATA) public details: { data: Assignment },
    private classService:ClassService,private toastr:ToastrService) { }
  
  ngOnInit(){
    this.data = { ...this.details.data };
  
    const cls = this.classService.getAllClasses().subscribe(res => {
      if (res.code == 200) {
        this.classes = res.data;

        const sub = this.classService.getAllSubject().subscribe(res => {
          if (res.code == 200) {
            this.subjects = res.data;

            const chap = this.classService.getAllChapters().subscribe(res => {
              if (res.code == 200) {
                this.chapters = res.data;
                this.filterSubjects('first');
                this.filterChapters();
              } else {
                this.toastr.error(res.message);
              }
              chap.unsubscribe();
            });

          } else {
            this.toastr.error(res.message);
          }
          sub.unsubscribe();
        });

      } else {
        this.toastr.error(res.message);
      }
      cls.unsubscribe();
    })    
  }

  filterSubjects(isFirst?:string) {
    if (!this.data.subjectId) {
      this.data.subjectId = 0;
    }
    if (this.data.associationId) {
      this.filteredSubjects = this.subjects.filter(x => x.associationIds != undefined && x.associationIds.length > 0 && x.associationIds?.findIndex(y => y == this.data.associationId) > -1);
    } else {
      this.filteredSubjects = [];
    }
  }

  filterChapters() {
    if (!this.data.chapterId) {
      this.data.chapterId = 0;
    }
    if (this.data.associationId && this.data.subjectId) {
      this.filteredChapters = this.chapters.filter(x => x.subjectId == this.data.subjectId && x.associationId == this.data.associationId);  
    } else {
      this.filteredChapters = [];
    }
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
     if (this.isAssignmentFormVisible) {
      this.assignmentForm.control.markAllAsTouched();
    }
    if (!this.assignmentForm.form.valid)
      return;    
    this.confirmed.emit(this.data);
  }
}
