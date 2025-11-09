import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addMonths, endOfMonth, format, isSameDay, isSameMonth, startOfMonth } from 'date-fns';
import { AttendenceDetailsComponent } from '../../views/institute/attendence-details/attendence-details.component';
import { MatDialog } from '@angular/material/dialog';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';

@Component({
  selector: 'app-attendance-calendar',
  templateUrl: './attendance-calendar.component.html',
  styleUrls: ['./attendance-calendar.component.scss']
})
export class AttendanceCalendarComponent implements OnChanges, OnInit {
  viewDate: Date = new Date();
  startDate: string = '';
  endDate: string = '';
  monthName: string = '';
  selectedDayData: any;
  events: CalendarEvent[] = [];
  weekends: Array<number> = [];
  isOpenAsDialog: boolean = false;
  totalPresent:number = 0;
  totalAbsent:number = 0;
  totalLeave:number = 0;
  totalHoliday:number = 0;

  @Input() attendanceData: any;
  @Input() user: any;
  @Output() refreshAttendance: EventEmitter<any> = new EventEmitter();

  constructor(private dialog: MatDialog, private instituteService: InstituteService) { }

  ngOnInit(): void {
    const work = this.instituteService.getWorkingDays().subscribe(res => {
      if (res.code == 200 && res?.data?.length > 0) {
        let days = res.data;
        days.forEach(x => {
          if (x.dayOfWeek == "MONDAY" && x.workingDay == false) {
            this.weekends.push(1);
          } else if (x.dayOfWeek == "TUESDAY" && x.workingDay == false) {
            this.weekends.push(2);
          } else if (x.dayOfWeek == "WEDNESDAY" && x.workingDay == false) {
            this.weekends.push(3);
          } else if (x.dayOfWeek == "THURSDAY" && x.workingDay == false) {
            this.weekends.push(4);
          } else if (x.dayOfWeek == "FRIDAY" && x.workingDay == false) {
            this.weekends.push(5);
          } else if (x.dayOfWeek == "SATURDAY" && x.workingDay == false) {
            this.weekends.push(6);
          } else if (x.dayOfWeek == "SUNDAY" && x.workingDay == false) {
            this.weekends.push(0);
          }
        });
        this.refreshAttendanceData();
        work.unsubscribe();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['attendanceData'] && changes['attendanceData'].currentValue) {
      this.populateEvents();
    }
  }

  refreshAttendanceData() {
    this.updateMonthName();
    this.startDate = format(startOfMonth(this.viewDate), 'yyyy-MM-dd');
    this.endDate = format(endOfMonth(this.viewDate), 'yyyy-MM-dd');
    this.refreshAttendance.emit({ startDate: this.startDate, endDate: this.endDate });
  }

  populateEvents(): void {
    this.totalPresent = 0;
    this.totalAbsent = 0;
    this.totalHoliday = 0;
    this.totalLeave = 0;
    this.events = this.attendanceData.map((record: any) => ({
      start: new Date(record.date),
      status: record.status,
      holidayName: record.holidayName,
      workingHours: record.workingHours,
      logStatuses: record.logStatuses,
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

  formatTime(input: any): string {
    const timeString = String(input);
    let [hours, minutes] = timeString.split('.');
    minutes = minutes || '00';
    hours = hours.padStart(2, '0');
    minutes = minutes.padEnd(2, '0').slice(0, 2);
    return `${hours}:${minutes} Hrs`;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  isWeekend(date: Date): boolean {
    const dayOfWeek = date.getDay();
    return this.weekends.includes(dayOfWeek)
  }

  previousMonth(): void {
    this.viewDate = addMonths(this.viewDate, -1);
    this.refreshAttendanceData();
  }

  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, +1);
    this.refreshAttendanceData();
  }

  isSameMonth(date1: Date, date2: Date): boolean {
    return isSameMonth(date1, date2);
  }

  updateMonthName(): void {
    this.monthName = format(this.viewDate, 'MMM yyyy');
  }

  onDayClick(day: any, e: any): void {
    const selectedRecords = this.attendanceData.filter((record: any) =>
      isSameDay(new Date(record.date), day.date)
    );

    if (selectedRecords.length > 0) {
      this.selectedDayData = {
        date: format(day.date, 'dd-MM-yyyy'),
        records: selectedRecords[0],
        logStatuses: selectedRecords[0].logStatuses
      };

      if (this.selectedDayData.records.status == 'Weekend' || this.selectedDayData.records.status == 'Holiday' || this.selectedDayData.logStatuses == null || this.selectedDayData.logStatuses.length == 0) {
        return;
      }

      let dialogRef = this.dialog.open(AttendenceDetailsComponent, {
        width: '13%',
        autoFocus: false,
        data: {
          selectedDayData: this.selectedDayData,
          top: e.top,
          left: e.left
        }
      });
    }
  }
}
