import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { endOfMonth, endOfQuarter, endOfWeek, format, startOfMonth, startOfQuarter, startOfWeek } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { AttendanceStatus, CheckInOutResponse, CheckInTimeStamps, Period, TimeTable } from 'src/app/core/api-models/auth-model';
import { Assignment, Association, Chapter, Subject } from 'src/app/core/api-models/class-model';
import { AssocationDetails, Quotes } from 'src/app/core/api-models/dashboard-model';
import { Announcement, Fees, Holiday } from 'src/app/core/api-models/institute-model';
import { Student, Teacher } from 'src/app/core/api-models/user-model';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { GeneralService } from 'src/app/core/api-services/common/general.service';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';
import { UserService } from 'src/app/core/api-services/user/user.service';
import { AppStateService } from 'src/app/core/services/app-state/app.state.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { AttendenceModalComponent } from 'src/app/feature/shared/attendence-modal/attendence-modal.component';
import { ConfirmationDialogComponent } from 'src/app/feature/shared/confirmation-dialog/confirmation-dialog.component';
import { StudentAttendanceComponent } from '../../class/student-attendance/student-attendance.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  subjects: Array<Subject> = [];
  chapters: Array<Chapter> = [];
  user: any = {};
  profileTabData: any = {};
  role: string = '';
  weekStartDate: Date = new Date();
  weekEndDate: Date = new Date();
  timer: number = 0;
  timerInterval: any;
  isTimerRunning: boolean = false;
  attendanceStatus: AttendanceStatus = {};
  weekDays: { date: Date; hours: number; isWeekend: boolean; isHoliday: boolean }[] = [];
  isCheckIn = false;
  CheckInTimeStamps: CheckInTimeStamps[] = [];
  associationDetails: AssocationDetails = {};
  attendanceData: any;
  todayDate: string = '';
  startDate: any;
  endDate: any;
  monthSatrtDate: any;
  monthEndDate: any;
  quaterStartDate: any;
  quaterEndDate: any;
  viewDate: Date = new Date();
  timeTable: Array<TimeTable> = [];
  periods: Array<Period> = [];
  fees: any = {};
  holidays: Array<Holiday> = [];
  quotes: Quotes = {};
  assignments: Array<Assignment> = [];
  announcements: Array<Announcement> = [];
  students: Array<Student> = [];
  teachers: Array<Teacher> = [];
  classes: Array<Association> = [];
  colors: Array<string> = ['#FDE9ED', '#E6F9FF', '#FEF8EA', '#F2F5FF', '#E8F9E8', '#E9EDF4'];
  feeItems: Array<{ label: string; value: number; image: string }> = [];
  feesMap = {
    examinationFee: 'Examination Fee',
    libraryFee: 'Library Fee',
    activityFee: 'Activity Fee',
    computerFee: 'Computer Fee',
    hostelFee: 'Hostel Fee',
    tuitionFee: 'Tuition Fee',
    transportFee: 'Transport Fee',
    duesFee: 'Dues Fee',
    otherFee: 'Other Fee',
    admissionFee: 'Admission Fee',
  };
  imagesMap = {
    examinationFee: 'assets/images/examination_fee.jpg',
    libraryFee: 'assets/images/library_fee.jpg',
    activityFee: 'assets/images/activity_fee.jpg',
    computerFee: 'assets/images/computer_fee.jpg',
    hostelFee: 'assets/images/hostel_fee.jpg',
    tuitionFee: 'assets/images/tuition_fee.jpg',
    transportFee: 'assets/images/transport_fee.jpg',
    duesFee: 'assets/images/dues_fee.jpg',
    otherFee: 'assets/images/other_fee.jpg',
    admissionFee: 'assets/images/admission_fee.jpg',
  };
  weekData: any = [];
  constructor(private classService: ClassService, private toastr: ToastrService, private authService: AuthenticationService,
    private generalService: GeneralService, private dialog: MatDialog, private userService: UserService, private instituteService: InstituteService,
  ) { }
  
  ngOnInit() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    this.role = this.authService.role;

    this.todayDate = format(this.viewDate, 'yyyy-MM-dd');
    this.startDate = format(startOfWeek(this.viewDate), 'yyyy-MM-dd');
    this.endDate = format(endOfWeek(this.viewDate), 'yyyy-MM-dd');
    this.monthSatrtDate = format(startOfMonth(this.viewDate), 'yyyy-MM-dd');
    this.monthEndDate = format(endOfMonth(this.viewDate), 'yyyy-MM-dd');
    this.quaterStartDate = format(startOfQuarter(this.viewDate), 'yyyy-MM-dd');
    this.quaterEndDate = format(endOfQuarter(this.viewDate), 'yyyy-MM-dd');
    this.generalService.getCurrentUserDetails().subscribe(res => {
      this.user = res.data;
      this.loadData();
      if (this.user.associationId) {
        const cls = this.generalService.getClassAttendanceInformation(this.user.associationId,this.todayDate).subscribe(response => {
          if (res.code == 200) {
            this.associationDetails = response.data;
          } else {
            this.toastr.error(response.message);
          }
          cls.unsubscribe();
        });  
      }
    }); 

    const holi = this.instituteService.getHolidaysByDate(this.quaterStartDate, this.quaterEndDate).subscribe(res => {
      if (res.code == 200) {
        res.data.forEach(x => {
          x.color = this.getRandomColor();
          this.holidays.push(x);
        });
      } else {
        this.toastr.error(res.message);
      }
      
      holi.unsubscribe();
    });

    const sub = this.instituteService.getQuotes().subscribe(res => {
      if (res.code == 200) {
        this.quotes = res.data;
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    });

    const assign = this.classService.getAssignmentByDate(this.monthSatrtDate, this.monthEndDate).subscribe(res => {
      if (res.code == 200) {
        res.data.forEach(x => {
          x.color = this.getRandomColor();
          this.assignments.push(x);
        })
      } else {
        this.toastr.error(res.message);
      }
      assign.unsubscribe();
    });

    const announce = this.instituteService.getAnnouncemnetsByDate(this.monthSatrtDate, this.monthEndDate).subscribe(res => {
      if (res.code == 200) {
        res.data.forEach(x => {
          x.color = this.getRandomColor();
          this.announcements.push(x);
        })
      } else {
        this.toastr.error(res.message);
      }
      announce.unsubscribe();
    });

    if (this.role == 'INSTITUTE_ADMIN') {  
      const user = this.userService.getStudents().subscribe(res => {
        if (res.code == 200) {
          this.students = res.data;
        } else {
          this.toastr.error(res.message);
        }        
        user.unsubscribe();
      });

      const teach = this.userService.getTeachers().subscribe(res => {
        if (res.code == 200) {
          this.teachers = res.data;
        } else {
          this.toastr.error(res.message);
        }
        teach.unsubscribe();
      });

      const cls = this.classService.getAllClasses().subscribe(res => {
        if (res.code == 200) {
          this.classes = res.data;
        } else {
          this.toastr.error(res.message);
        }
        cls.unsubscribe();
      });

      const sub = this.classService.getAllSubject().subscribe(res => {
        if (res.code == 200) {
          this.subjects = res.data;
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    }
    this.generateWeekDays();
    this.scheduleReload()
  }

  handleVisibilityChange(): void {
    if (document.visibilityState === 'visible' && this.role!='STUDENT') {
      this.loadData();      
    }
  }

  loadData() {
    if (this.role == 'TEACHER') {      
      const sub = this.generalService.getAttendanceLastStatus().subscribe(res => {
        if (res.code == 200) {
          this.CheckInTimeStamps = res.data
          if (this.CheckInTimeStamps.length > 0) {
            this.calculateTotalTime();
          }
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
      const atten = this.userService.getTeacherAttendenceById(this.user.id, this.startDate, this.endDate).subscribe(res => {
        if (res.code == 200) {
          this.attendanceData = res.data; 
          this.generateWeekData();
        } else {
          this.toastr.error(res.message);
        }
        atten.unsubscribe();
      });
    } else if (this.role == 'STUDENT') {
      const sub = this.userService.getStudentAttendenceById(this.user.id, this.startDate, this.endDate).subscribe(res => {
        if (res.code == 200) {
          this.attendanceData = res.data;
          this.generateWeekData();
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });

      const fee = this.instituteService.getFeeDetails(this.user.associationId).subscribe(res => {
        if (res) {
          let fee = res.data;
          this.fees = fee[0];
          for (const [key, label] of Object.entries(this.feesMap)) {
            const value = this.fees[key! as keyof typeof this.fees];
            if (value) {
              this.feeItems.push({
                label,
                value: value as number,
                image: '',
                // image: this.imagesMap[key as keyof typeof this.imagesMap],
              });
            }
          }
        }
        fee.unsubscribe();
      });
    }
    if (this.role != 'INSTITUTE_ADMIN') {   
      this.periods = [];
      const time = this.instituteService.getTodayTimeTable().subscribe(res => {
        if (res.code == 200) {
          this.timeTable = res.data;
          if (this.role != 'INSTITUTE_ADMIN') {
            this.timeTable.forEach(x => {
              x.periods?.forEach(y => {
                y.associationName = x.associationName;
                y.color = this.getRandomColor()
                this.periods.push(y)
              });
            })
          }
        } else {
          this.toastr.error(res.message);
        }
      });
      const sub = this.generalService.getClassAttendanceInformation(this.user.associationId, this.startDate).subscribe(res => {
        if(res.code == 200) {
          
        } else {
          this.toastr.error(res.message);
        }
       });
    }
  }

  calculateTotalTime() {
    let lastIndex = this.CheckInTimeStamps.length - 1;
    let checkInTime : Date 
    let checkOutTime: Date 
    let timeDifference: number = 0;
    let isLastCheckIn: boolean = false;
    this.CheckInTimeStamps.forEach((x, idx) => {
      if (x.status == 'CHECK_IN') {
        checkInTime = new Date(x.dateTime!);
      } else if (x.status == 'CHECK_OUT') {
        checkOutTime = new Date(x.dateTime!);
        const differenceInSeconds = (checkOutTime.getTime() - checkInTime.getTime()) / 1000;
        timeDifference += differenceInSeconds;
      }

      if (idx == lastIndex && x.status == 'CHECK_IN') {
        const currentTime = new Date();
        const differenceInSeconds = (currentTime.getTime() - checkInTime.getTime()) / 1000;
        timeDifference += differenceInSeconds;  
        isLastCheckIn = true;
      }
    });
    
    this.timer = timeDifference;
    if (isLastCheckIn) {
      this.isCheckIn = true;
      this.startTimer();
    }
  }

  generateWeekData() {
    this.weekData = [];
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    for (let currentDate = start; currentDate <= end; currentDate.setDate(currentDate.getDate() + 1)) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const existingData = this.attendanceData.find((item: any) => item.date === dateStr);
      if (existingData) {
        this.weekData.push({
          ...existingData,
          day: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
        });
      } else {
        this.weekData.push({
          date: dateStr,
          status: 'nil',
          day: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
        });
      }
    }    
  }

  checkInAndOut() {
    const sub = this.generalService.attendanceUpdateStatus(this.isCheckIn ? 'CHECK_OUT' : 'CHECK_IN').subscribe(res => {
      if (res.code == 200) {

        if (!this.isCheckIn) {
          this.startTimer()
        } else {
          this.stopTimer();
        }
        this.isCheckIn = !this.isCheckIn
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    });
  }

  generateWeekDays() {
    const currentDate = new Date();
    const startOfWeek = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1) // Monday
    );
    const endOfWeek = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7) // Sunday
    );

    this.weekStartDate = startOfWeek;
    this.weekEndDate = endOfWeek;

    this.weekDays = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(
        startOfWeek.getFullYear(),
        startOfWeek.getMonth(),
        startOfWeek.getDate() + i
      );
      return {
        date: day,
        hours: Math.random() * 10,
        isWeekend: day.getDay() === 0 || day.getDay() === 6,
        isHoliday: day.getDay() === 3,
      };
    });
  }

  startTimer(): void {
    if (!this.isTimerRunning) {
      this.isTimerRunning = true;
      this.timerInterval = setInterval(() => {
        this.timer++;
      }, 1000);
    }``
  }

  stopTimer(): void {
    if (this.isTimerRunning) {
      clearInterval(this.timerInterval);
      this.isTimerRunning = false;
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

  formatTimer(seconds: number): string {
    const totalSeconds = Math.round(seconds);

    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');

    return `${hours}:${minutes}:${secs}`;
  }

  scheduleReload() {
    const now = new Date();
    const nextMidnight = new Date();
    nextMidnight.setHours(24, 0, 0, 0);
    const timeToMidnight = nextMidnight.getTime() - now.getTime();
    setTimeout(() => {
      this.reloadComponent();
      setInterval(() => {
        this.reloadComponent();
      }, 24 * 60 * 60 * 1000);
    }, timeToMidnight);
  }

  reloadComponent() {
    this.loadData();
  }

  getRandomColor(): string {
    return this.colors[Math.floor(Math.random()*this.colors.length)];
  }

}

