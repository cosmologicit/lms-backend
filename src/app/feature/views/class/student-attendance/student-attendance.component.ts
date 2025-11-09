import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { format } from 'date-fns';
import { is } from 'date-fns/locale';
import { ToastrService } from 'ngx-toastr';
import { Association, GetAttendanceByClassAndDate } from 'src/app/core/api-models/class-model';
import { Attendance, Student } from 'src/app/core/api-models/user-model';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { UserService } from 'src/app/core/api-services/user/user.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.scss']
})
export class StudentAttendanceComponent implements OnInit {
  attendanceDate: string = '';
  todayDate: string = '';
  selectedAssociationId: number = 0;
  // students: Array<Student> = [];
  students: GetAttendanceByClassAndDate = {
    studentAttendanceResponseList: []
  }
  classes: Array<Association> = [];
  data: Attendance = {
    studentStatusRequests: []
  };
  public ColumnMode = ColumnMode;
  role: string = '';
  markAllAs: string = '';
  isUpdate:boolean=false;

  constructor(private classService: ClassService, private toastr: ToastrService, private userService: UserService, private authService: AuthenticationService,
    ) { }
  
  ngOnInit() {
    this.attendanceDate = format(new Date(), 'yyyy-MM-dd');
    this.todayDate = format(new Date(), 'yyyy-MM-dd');
    this.role = this.authService.role;
    if (this.role == 'TEACHER') {
      this.selectedAssociationId = parseInt(this.authService.associationId);
      this.getAttendance();
    }

    if (this.role == 'INSTITUTE_ADMIN') {
      const cls = this.classService.getAllClasses().subscribe(res => {
        if (res.code == 200) {
          this.classes = [...res.data];
          if (this.classes.length > 0) {
            this.selectedAssociationId = this.classes[0].id!;
            this.getAttendance();
          }
        } else {
          this.toastr.error(res.message);
        }
        cls.unsubscribe();
      });
    }
  }

  getAttendance() {
    this.markAllAs = '';
    if (this.selectedAssociationId) {
      const attendance = this.classService.getAttendanceByClassAndDate(this.selectedAssociationId, this.attendanceDate).subscribe(res => {
        if (res.code == 200) {
          this.students = res.data;          
            if (this.students.attendance) {
              this.students.studentAttendanceResponseList!.forEach(x => {
                if (x.status == 'PRESENT') {
                  x.isPresent = true;
                } else if (x.status == 'ABSENT') {
                  x.isAbsent = true;
                } else if (x.status == 'LEAVE') {
                  x.isLeave = true;
                } else if (x.status == 'HOLIDAY') {
                  x.isHoliday = true;
                }
              });
              this.isUpdate = true;
            } else {
              this.isUpdate = false;
            }
        } else {
          this.toastr.error(res.message);
        }
        attendance.unsubscribe();
      });
    }
  }

  onSubmit() {
    this.data.studentStatusRequests = [];
    this.data.associationId = this.selectedAssociationId;
    this.data.date = this.attendanceDate;
    let isAttendanceNotFilled = false;
    for (let i = 0; i < this.students.studentAttendanceResponseList!.length; i++){
      if (this.students.studentAttendanceResponseList![i].isPresent) {
        this.data.studentStatusRequests!.push({ studentDetailId: this.students.studentAttendanceResponseList![i].studentDetailId!, attendanceStatus: 'PRESENT', comment: this.students.studentAttendanceResponseList![i].comment });
      } else if (this.students.studentAttendanceResponseList![i].isHoliday) {
        this.data.studentStatusRequests!.push({ studentDetailId: this.students.studentAttendanceResponseList![i].studentDetailId!, attendanceStatus: 'HOLIDAY', comment: this.students.studentAttendanceResponseList![i].comment });
      } else if (this.students.studentAttendanceResponseList![i].isLeave) {
        this.data.studentStatusRequests!.push({ studentDetailId: this.students.studentAttendanceResponseList![i].studentDetailId!, attendanceStatus: 'LEAVE', comment: this.students.studentAttendanceResponseList![i].comment });
      } else if(this.students.studentAttendanceResponseList![i].isAbsent) {
        this.data.studentStatusRequests!.push({ studentDetailId: this.students.studentAttendanceResponseList![i].studentDetailId!, attendanceStatus: 'ABSENT', comment: this.students.studentAttendanceResponseList![i].comment });
      } else {
        this.toastr.error(this.students.studentAttendanceResponseList![i].studentName + ' Attenance is not FIlled');
        isAttendanceNotFilled = true;
        break
      }
    }
    if (isAttendanceNotFilled) {
      return;
    }
    if (this.isUpdate) {
      const sub = this.classService.updateAttendance(this.data).subscribe(res => {
        if (res.code == 200) {
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    } else {
      const sub = this.classService.saveAttendence(this.data).subscribe(res => {
        if (res.code == 200) {
          this.toastr.success(res.message);
          this.isUpdate=true;
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    }
  }

  markAll() {
    if (this.markAllAs == 'Present') {
      this.students.studentAttendanceResponseList!.forEach(x => {
        x.isPresent = true;
        x.isAbsent = false;
        x.isLeave = false;
        x.isHoliday = false;
      });
    } else if (this.markAllAs == 'Absent') {
      this.students.studentAttendanceResponseList!.forEach(x => {
        x.isAbsent = true;
        x.isPresent = false;
        x.isLeave = false;
        x.isHoliday = false;
      });
    } else if (this.markAllAs == 'Leave') {
      this.students.studentAttendanceResponseList!.forEach(x => {
        x.isLeave = true;
        x.isAbsent = false;
        x.isPresent = false;
        x.isHoliday = false;
      });
    } else if (this.markAllAs == 'Holiday') {
      this.students.studentAttendanceResponseList!.forEach(x => {
        x.isHoliday = true;
        x.isAbsent = false;
        x.isLeave = false;
        x.isPresent = false;
      });
    }
  }

}
