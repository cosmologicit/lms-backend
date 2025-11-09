import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Period, TeacherStudentTimeTable, TimeTable } from 'src/app/core/api-models/auth-model';
import { Workingdays } from 'src/app/core/api-models/institute-model';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { AttendenceModalComponent } from 'src/app/feature/shared/attendence-modal/attendence-modal.component';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {
  timeTables: Array<TimeTable> = [];
  role: string = '';
  studentAndTeacherTimeTable: Array<any> = [];
  colors: Array<string> = ['#FDE9ED', '#E6F9FF', '#FEF8EA', '#F2F5FF', '#E8F9E8', '#E9EDF4'];
  sunday: Array<Period> = [ ];
  monday: Array<Period> = [ ];
  tuesday: Array<Period> = [];
  wednesday: Array<Period> = [];
  thursday: Array<Period> = [];
  friday: Array<Period> = [];
  saturday: Array<Period> = [];
  assignedColors: string[] = [];
  days: Array<Workingdays> = [];
  isMondayVisible: boolean = true;
  isTuesdayVisible: boolean = true;
  isWednesdayVisible: boolean = true;
  isThursdayVisible: boolean = true;
  isFridayVisible: boolean = true;
  isSaturdayVisible: boolean = true;
  isSundayVisible: boolean = true;

  constructor(private router: Router, private instituteService: InstituteService, private authService: AuthenticationService,
    private dialog:MatDialog,private toastr:ToastrService) { }

  ngOnInit() {  
    this.role = this.authService.role;  
      const sub = this.instituteService.getTimeTables().subscribe(res => {
        this.timeTables = res.data;
        // student & teacher
        if (this.role == 'STUDENT') {
          if (this.timeTables[0] && this.timeTables[0].periods) {
            this.studentAndTeacherTimeTable =  this.timeTables[0].periods
            this.studentAndTeacherTimeTable.forEach(x => {
              x.associationName = this.timeTables[0].associationName;
              x.color = this.getRandomColor();
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
                 this.sunday.push(x);
              }
             });
          }
        } else if (this.role == 'TEACHER') {
          this.timeTables.forEach(x => {
            x.periods?.forEach(y => {
              y.associationName = x.associationName;
              y.associationId = x.associationId;
              y.color = this.getRandomColor()
              this.studentAndTeacherTimeTable.push(y)
            });  
          })          
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
        }
        sub.unsubscribe();
      });
    
    const work = this.instituteService.getWorkingDays().subscribe(res => {
      if (res.code == 200) {
        this.days = res.data;
        if (this.days.length > 0) {
          this.days.forEach(x => {
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
      } else {
        this.toastr.error(res.message);
      }
      work.unsubscribe()
    });
  }

  createTimeTable() {
    this.router.navigateByUrl('app/institute/time-table/add');
  }

  editTimeTable(id:number) {
   this.router.navigateByUrl('app/institute/time-table/edit/'+id);
  }

  getRandomColor(): string {
    return this.colors[Math.floor(Math.random()*this.colors.length)];
  }

   attendence(id: number) {
     let dialogRef = this.dialog.open(AttendenceModalComponent, {
       width: '80%',
       autoFocus: false,
       data: {
         id: id
       }
     });
  }
}
