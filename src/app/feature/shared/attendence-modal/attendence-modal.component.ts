import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/core/api-models/user-model';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { UserService } from 'src/app/core/api-services/user/user.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
// import { Attendence } from 'src/app/core/api-models/auth-model';

@Component({
  selector: 'app-attendence-modal',
  templateUrl: './attendence-modal.component.html',
  styleUrls: ['./attendence-modal.component.scss']
})
export class AttendenceModalComponent {
 students: Array<Student> = [];
  data: any = {};
  presentStudentsId: Array<number> = [];
  isSelectAll: boolean = false;
  selectUnselectText: string = 'Select All Students';
  status: string = '';
  public ColumnMode = ColumnMode;

  @ViewChild('dataTable') table?: DatatableComponent;
  constructor(public dialogRef: MatDialogRef<AttendenceModalComponent>, @Inject(MAT_DIALOG_DATA) public details: { id: number },
    private classService: ClassService,private userService:UserService,private toastr:ToastrService) { }
  
  ngOnInit() {
    this.data.associationId = this.details.id;
    const sub = this.userService.getStudentsByAssociationId(this.details.id).subscribe(res => {
      if (res.code == 200) {
        this.students = [...res.data];
        const attendance = this.classService.getTodayAttendance(this.details.id).subscribe(res => {
          if (res.code == 200) {
            if (res.data.length > 0) {
              this.status = 'View';
              this.students.forEach((student) => {
                const attendance = res.data.find(
                  (record) => record.studentDetailId === student.id && record.status =='PRESENT'
                );
                student.isPresent = !!attendance;
              });
            }
          } else {
            this.toastr.error(res.message);
          }
          attendance.unsubscribe();
        });
        this.calcTableSize();
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe()
    });
  }

  calcTableSize() {
    
  }

  close() {
    this.dialogRef.close()
  }

  onSubmit() {
    let a = this.students.filter(x => x.isPresent == true);
    if (a.length > 0) {
      a.forEach(x => {
          this.presentStudentsId.push(x.id!);
      });
    }
    this.data.studentDetailId = [...this.presentStudentsId];
    if (this.details.id) {
      const sub = this.classService.saveAttendence(this.data).subscribe(res => {
        if (res.code == 200) {
          this.toastr.success(res.message);
          this.close();
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    } else {    
      const sub = this.classService.updateAttendence(this.data).subscribe(res => {
        if (res.code == 200) {
          this.toastr.success(res.message);
          this.close();
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    }
  }

  checkAll() {
    let a = this.students.filter(x => x.isPresent == true);
    if (a.length == this.students.length) {
      this.students.forEach(x => {
        x.isPresent = false;
      });
      this.selectUnselectText = 'Select All Studemts';
    } else {
      this.selectUnselectText = 'Unselect All Students';
      this.students.forEach(X => {
        X.isPresent = true;
      })
    }
  }
}
