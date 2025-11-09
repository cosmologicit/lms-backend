import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddNotesComponent } from '../add-notes/add-notes.component';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { MapStudentClass } from 'src/app/core/api-models/class-model';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { UserService } from 'src/app/core/api-services/user/user.service';
import { LinkStudentWithClass, Student } from 'src/app/core/api-models/user-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-link-student',
  templateUrl: './link-student.component.html',
  styleUrls: ['./link-student.component.scss']
})
export class LinkStudentComponent implements OnInit {
  students: Array<MapStudentClass> = [];
  data: LinkStudentWithClass = {};
  linkedUnlinkedStudetId: Array<number> = [];
  isSelectAll: boolean = false;
  selectUnselectText:string='Select All Students'
  public ColumnMode = ColumnMode;

  constructor(public dialogRef: MatDialogRef<AddNotesComponent>, @Inject(MAT_DIALOG_DATA) public details: { id: number },
    private classService: ClassService,private userService:UserService,private toastr:ToastrService) { }
  
  ngOnInit() {
    this.data.associationId = this.details.id;
    const sub = this.classService.getMapStudentAssoction(this.details.id).subscribe(res => {
      if (res.code == 200) {
        this.students = res.data; 
        let a = this.students.filter(x => x.isLinked == true);
        if (a.length == this.students.length) {
          this.selectUnselectText = 'Unselect All Class';
          this.isSelectAll = true;
        }
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    });
  }

  close() {
    this.dialogRef.close()
  }

  onSubmit() {
    let a = this.students.filter(x => x.isLinked == true);
    if (a.length > 0) {
      a.forEach(x => {
          this.linkedUnlinkedStudetId.push(x.id!);
      });
    }
    this.data.studentDetailId = [...this.linkedUnlinkedStudetId];
    const sub = this.classService.linkUnlinkStudentWithAssociation(this.data).subscribe(res => {
      if (res.code == 200) {
        this.toastr.success(res.message);
        this.close();
      } else {
        this.toastr.error(res.message); 
      }
      sub.unsubscribe();
    });
  }

  checkAll() {
    let a = this.students.filter(x => x.isLinked == true);
    if (a.length == this.students.length) {
      this.students.forEach(x => {
        x.isLinked = false;
      });
      this.selectUnselectText = 'Select All Studemts';
    } else {
      this.selectUnselectText = 'Unselect All Students';
      this.students.forEach(X => {
        X.isLinked = true;
      })
    }
  }
  
}
