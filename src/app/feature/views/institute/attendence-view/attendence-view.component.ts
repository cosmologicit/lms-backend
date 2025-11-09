import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import {  addMonths, endOfMonth, format, isSameDay, isSameMonth, startOfMonth } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/api-services/user/user.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { AttendenceDetailsComponent } from '../attendence-details/attendence-details.component';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';

@Component({
  selector: 'app-attendence-view',
  templateUrl: './attendence-view.component.html',
  styleUrls: ['./attendence-view.component.scss']
})
export class AttendenceViewComponent implements OnInit {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [
  ];
  startDate: string = '';
  endDate: string = '';
  monthName: string = '';
  userId: number = 0;
  role: string = '';
  isOpenAsDialog: boolean = false;
  attendanceData: any;
  selectedDayData: any;
  infoCard = { top: 0, left: 0, right: 0, bottom: 0 };
  weekends: Array<number> = [];
  totalPresent:number = 0;
  totalAbsent:number = 0;
  totalLeave:number = 0;
  totalHoliday:number = 0;

  constructor(private toastr: ToastrService, private userService: UserService, @Optional() private dialogRef: MatDialogRef<AttendenceViewComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public details: { id: number, type: string }, private authenticationService: AuthenticationService,
  private dialog:MatDialog,private instituteService:InstituteService
  ) { 
    if (dialogRef) {
      this.isOpenAsDialog = true;      
    }
  }
  
  ngOnInit() {    
    const sub = this.instituteService.getWorkingDays().subscribe(res => {
      if (res.code == 200) {
        res.data.forEach(x => {
          if (x.dayOfWeek == 'SUNDAY' && x.workingDay == false) {
            this.weekends.push(0)
          } else if (x.dayOfWeek == 'MONDAY' && x.workingDay == false) {
            this.weekends.push(1)
          } else if (x.dayOfWeek == 'TUESDAY' && x.workingDay == false) {
            this.weekends.push(2)
          } else if (x.dayOfWeek == 'WEDNESDAY' && x.workingDay == false) {
            this.weekends.push(3)
          } else if (x.dayOfWeek == 'THURSDAY' && x.workingDay == false) {
            this.weekends.push(4)
          } else if (x.dayOfWeek == 'FRIDAY' && x.workingDay == false) {
            this.weekends.push(5)
          } else if (x.dayOfWeek == 'SATURDAY' && x.workingDay == false) {
            this.weekends.push(6)
          }
        })
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    })
    this.userId = parseInt(this.authenticationService.userId);
    this.role = this.authenticationService.role;  
    this.loadData();
    if (!this.isOpenAsDialog && this.role=='') {
      
    }    
  }

  loadData() {
    this.updateMonthName(); 
    this.startDate = format(startOfMonth(this.viewDate), 'yyyy-MM-dd');
    this.endDate = format(endOfMonth(this.viewDate), 'yyyy-MM-dd');
    if (this.details?.type == 'STUDENT' || this.role == 'STUDENT') {
      const sub = this.userService.getStudentAttendenceById(this.details?.id ? this.details.id : this.userId, this.startDate, this.endDate).subscribe(res => {
        if (res.code == 200) {
          this.attendanceData = res.data;
          this.populateEvents();
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    } else {      
      const sub = this.userService.getTeacherAttendenceById(this.details?.id ? this.details.id : this.userId, this.startDate, this.endDate).subscribe(res => {
        if (res.code == 200) {
          this.attendanceData = res.data;
          this.populateEvents();
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    }
  }

  populateEvents(): void {
    this.totalPresent = 0;
    this.totalAbsent = 0;
    this.totalHoliday = 0;
    this.totalLeave = 0;
    this.events = this.attendanceData.map((record:any) => ({
      start: new Date(record.date),
      status: record.status,
      holidayName: record.holidayName,
      workingHours: record.workingHours,
      logStatuses:record.logStatuses,
      color: {
        primary: record.status === "Present" ? '#28a745' : '#dc3545',
        secondary: '#f0f0f0'
      }
    }));
    this.totalPresent = this.attendanceData.filter((x: any) => x.status == 'PRESENT').length;
    this.totalAbsent = this.attendanceData.filter((x: any) => x.status == 'ABSENT').length;
    this.totalHoliday = this.attendanceData.filter((x: any) => x.status == 'HOLIDAY').length;
    this.totalLeave = this.attendanceData.filter((x: any) => x.status == 'LEAVE').length;
  }

  handleEvent(event: CalendarEvent): void {
   this.toastr.success(`You clicked on: ${event.title}`, 'Event Clicked');
  }

  isWeekend(date: Date): boolean {
    const dayOfWeek = date.getDay();
    return this.weekends.includes(dayOfWeek)
  }

  previousMonth(): void {
    this.viewDate = addMonths(this.viewDate, -1);
    this.loadData();
  }

  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, +1);
    this.loadData();
  }
  
  isSameMonth(date1: Date, date2: Date): boolean {
    return isSameMonth(date1, date2);
  }

  isToday(date: Date): boolean {
  const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }
  

  updateMonthName(): void {
    this.monthName = format(this.viewDate, 'MMM yyyy'); 
  }
    
  onDayClick(day: any,e:any): void {  
    
    if (this.role == 'STUDENT' && this.details.type=='STUDENT') {
       return
     }
     const selectedRecords = this.attendanceData.filter((record:any) => 
      isSameDay(new Date(record.date), day.date)
    );
    
    if (selectedRecords.length > 0) {    
      this.selectedDayData = {
        date: format(day.date,'dd-MM-yyyy'),
        records: selectedRecords[0],
        logStatuses:selectedRecords[0].logStatuses
      };
      
      if (this.selectedDayData.records.status == 'Weekend' || this.selectedDayData.records.status == 'Holiday' || this.selectedDayData.logStatuses == null || this.selectedDayData.logStatuses.length == 0) {        
        return;
      }
      
      let dialogRef = this.dialog.open(AttendenceDetailsComponent, {
        width: '13%',
        autoFocus: false,
        data: {
          selectedDayData: this.selectedDayData,
          top:e.top,
          left:e.left
        }
      });
    }
  }

  formatTime(input: any): string {
    const timeString = String(input);
    let [hours, minutes] = timeString.split('.');
    minutes = minutes || '00';
    hours = hours.padStart(2, '0'); 
    minutes = minutes.padEnd(2, '0').slice(0, 2);
    return `${hours}:${minutes} Hrs`;
  }

}
