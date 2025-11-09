import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { addMonths, endOfMonth, format, isSameDay, isSameMonth, startOfMonth } from 'date-fns';
import { Period, TimeTable } from 'src/app/core/api-models/auth-model';
import { Teacher } from 'src/app/core/api-models/user-model';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';
import { UserService } from 'src/app/core/api-services/user/user.service';
import { AttendenceDetailsComponent } from '../../institute/attendence-details/attendence-details.component';
import { MatDialog } from '@angular/material/dialog';
import { GetTimetable } from 'src/app/core/api-models/class-model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { SetPasswordComponent } from '../set-password/set-password.component';

@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.scss']
})
export class ViewTeacherComponent implements OnInit {
  role :string='';
  teacherId: number = 0;;
  teacher: Teacher = {};
  timeTable: Array<GetTimetable> = [];
  previewProfilePicUrl: string | ArrayBuffer | null = null;
  studentAndTeacherTimeTable: Array<any> = [];
  colors: Array<string> = ['#FDE9ED', '#E6F9FF', '#FEF8EA', '#F2F5FF', '#E8F9E8', '#E9EDF4'];
  sunday: Array<Period> = [];
  monday: Array<Period> = [];
  tuesday: Array<Period> = [];
  wednesday: Array<Period> = [];
  thursday: Array<Period> = [];
  friday: Array<Period> = [];
  saturday: Array<Period> = [];

  isMondayVisible: boolean = true;
  isTuesdayVisible: boolean = true;
  isWednesdayVisible: boolean = true;
  isThursdayVisible: boolean = true;
  isFridayVisible: boolean = true;
  isSaturdayVisible: boolean = true;
  isSundayVisible: boolean = true;

  timetableData: Array<any> = [];
  attendanceData: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private dialog: MatDialog, private instituteService: InstituteService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.role = this.authService.role;
    this.route.paramMap.subscribe(parameterMap => {
      if (parameterMap.get("id")) {
        this.teacherId = Number(parameterMap.get("id"));
        this.getTeacherDetails();
        this.getTeacherTimetable();
      }
    });
  }

  getTeacherDetails() {
    const sub = this.userService.getTeacherById(this.teacherId).subscribe(res => {
      if (res.code == 200) {
        this.teacher = res.data;
        if (this.teacher.photoUrl) {
          this.previewProfilePicUrl = this.teacher.photoUrl;
        }
      }
      sub.unsubscribe();
    });
  }

  getTeacherTimetable() {
    const work = this.instituteService.getWorkingDays().subscribe(res => {
      if (res.code == 200) {
        let days = res.data;
        if (days.length > 0) {
          days.forEach(x => {
            if (x.dayOfWeek == "MONDAY" && x.workingDay == false) {
              this.isMondayVisible = false;
            } else if (x.dayOfWeek == "TUESDAY" && x.workingDay == false) {
              this.isTuesdayVisible = false;
            } else if (x.dayOfWeek == "WEDNESDAY" && x.workingDay == false) {
              this.isWednesdayVisible = false;
            } else if (x.dayOfWeek == "THURSDAY" && x.workingDay == false) {
              this.isThursdayVisible = false;
            } else if (x.dayOfWeek == "FRIDAY" && x.workingDay == false) {
              this.isFridayVisible = false;
            } else if (x.dayOfWeek == "SATURDAY" && x.workingDay == false) {
              this.isSaturdayVisible = false;
            } else if (x.dayOfWeek == "SUNDAY" && x.workingDay == false) {
              this.isSundayVisible = false;
            }
          });
        }

        this.timetableData = days.filter(x => x.workingDay);  
        const sub = this.instituteService.getTimeTableByUserId(this.teacherId).subscribe(res => {
          this.timeTable = res.data;
          this.timeTable.forEach(x => {
            x.color = this.getRandomColor();
            this.studentAndTeacherTimeTable.push(x);
          });
          this.studentAndTeacherTimeTable.forEach(x => {
            if (x.day == 'MONDAY') {
              this.monday.push(x);
            } else if (x.day == 'TUESDAY') {
              this.tuesday.push(x);
            } else if (x.day == 'WEDNESDAY') {
              this.wednesday.push(x);
            } else if (x.day == 'THURSDAY') {
              this.thursday.push(x);
            } else if (x.day == 'FRIDAY') {
              this.friday.push(x);
            } else if (x.day == 'SATURDAY') {
              this.saturday.push(x);
            } else if (x.day == 'SUNDAY') {
              this.sunday.push(x)
            }
          });


          this.timetableData.forEach(day => {

          });

          sub.unsubscribe();
          work.unsubscribe();
        });
      }
    });


  }

  getTeacherAttendance(event: any) {
    const sub = this.userService.getTeacherAttendenceById(this.teacherId, event.startDate, event.endDate).subscribe(res => {
      if (res.code == 200) {
        this.attendanceData = res.data;
      }
      sub.unsubscribe();
    });
  }

  getRandomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  changePassword() {
    let dialogRef = this.dialog.open(SetPasswordComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        id: this.teacherId
      }
    });
  }
}
