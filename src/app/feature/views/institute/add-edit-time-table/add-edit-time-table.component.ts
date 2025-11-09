import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { concat, forkJoin} from 'rxjs';
import { Period, TimeTable } from 'src/app/core/api-models/auth-model';
import { Teacher } from 'src/app/core/api-models/user-model';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';
import { UserService } from 'src/app/core/api-services/user/user.service';
import { Association, Subject } from 'src/app/core/api-models/class-model';
import { Workingdays } from 'src/app/core/api-models/institute-model';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { ConfirmationDialogComponent } from 'src/app/feature/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-time-table',
  templateUrl: './add-edit-time-table.component.html',
  styleUrls: ['./add-edit-time-table.component.scss']
})
export class AddEditTimeTableComponent implements OnInit {
  data: TimeTable = {}
  monday: Period[] = [];
  tuesday: Period[] = [];
  wednesday: Period[] = [];
  thursday: Period[] = [];
  friday: Period[] = [];
  saturday: Period[] = [];
  sunday: Period[] = [];
  days: Array<Workingdays> = [];

  status: string = 'Add';
  teachers: Array<Teacher> = [];
  subjects: Array<Subject> = [];
  filteredSubjects: Array<Subject> = [];
  classes: Array<Association> = [];
  isTimeTableFormVisible = true;
  timeSlots: string[] = [];
  tabs = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  copydataTabs: Array<string> = [];
  selected = new FormControl(0);
  selectedTab: number = 0;
  startTime: string=''
  endTime: string = ''
  getMondayData: string = '';
  getTuesdayData: string = '';
  getWednesdayData: string = '';
  getThursdayData: string = '';
  getFridayData: string = '';
  getSaturdayData: string = '';
  getSundayData: string = '';


  @ViewChild('timeTableForm') timeTableForm?: any;
  constructor(private userService: UserService, private instituteService: InstituteService, private router: Router,
    private toastr: ToastrService, private classService: ClassService, private route: ActivatedRoute, private authService: AuthenticationService,
  private dialog:MatDialog) { }
  

  ngOnInit() {
    this.startTime = this.authService.startTime; 
    this.endTime = this.authService.endTime;
    const subs = forkJoin({
      cls: this.classService.getAllClasses(),
      sub: this.classService.getAllSubject(),
      user: this.userService.getTeachers(),
      work: this.instituteService.getWorkingDays()
    }).subscribe(({ cls, sub, user, work }) => {
      if (cls.code == 200) {
        this.classes = cls.data;
      } else {
        this.toastr.error(cls.message)
      }
    
      if (sub.code == 200) {
        this.subjects = sub.data;
      } else {
        this.toastr.error(sub.message)
      }
    
      if (user.code == 200) {
        this.teachers = user.data;
      } else {
        this.toastr.error(user.message)
      }

      if (work.code == 200) {  
        this.days = work.data;
        if (this.days.length > 0) {
          this.days.forEach(x => {
            if (x.dayOfWeek == "MONDAY" && x.workingDay == false) {
              let idx = this.tabs.findIndex(x => x == 'Monday');
              this.tabs.splice(idx, 1);
            } if (x.dayOfWeek == "TUESDAY" && x.workingDay == false) {
              let idx = this.tabs.findIndex(x => x == 'Tuesday');
              this.tabs.splice(idx, 1);
            } else if (x.dayOfWeek == "WEDNESDAY" && x.workingDay == false) {
              let idx = this.tabs.findIndex(x => x == 'Wednesday');
              this.tabs.splice(idx, 1);
            } else if (x.dayOfWeek == "THURSDAY" && x.workingDay == false) {
              let idx = this.tabs.findIndex(x => x == 'Thursday');
              this.tabs.splice(idx, 1);
            } else if (x.dayOfWeek == "FRIDAY" && x.workingDay == false) {
              let idx = this.tabs.findIndex(x => x == 'Friday');
              this.tabs.splice(idx, 1);
            } else if (x.dayOfWeek == "SATURDAY" && x.workingDay == false) {
              let idx = this.tabs.findIndex(x => x == 'Saturday');
             this.tabs.splice(idx, 1);
            } else if (x.dayOfWeek == "SUNDAY" && x.workingDay == false) {
              let idx = this.tabs.findIndex(x => x == 'Sunday');
              this.tabs.splice(idx, 1);
            }
          });
        }
      } else {
        this.toastr.error(work.message);
      }
        
      this.loadData();
      subs.unsubscribe();
    });
    this.generateTimeSlots()
  }

  loadData() {
    this.route.paramMap.subscribe(parameterMap => {
      let id = parameterMap.get('id');
      if (id) {
        this.status = 'Edit';
        const timetable = this.instituteService.getTimeTableById(parseInt(id)).subscribe(res => {
          this.data = res.data;
          this.data.periods!.forEach(x => {
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
          if (this.monday.length == 0) {
            this.monday.push({
              day: 'MONDAY'
            });
          }
          if (this.tuesday.length == 0) {
            this.tuesday.push({
              day: 'TUESDAY'
            });
          }
          if (this.wednesday.length == 0) {
            this.wednesday.push({
              day: 'WEDNESDAY'
            });
          }
          if (this.thursday.length == 0) {
            this.thursday.push({
              day: 'THURSDAY'
            });
          }
          if (this.friday.length == 0) {
            this.friday.push({
              day: 'FRIDAY'
            });
          }
          if (this.saturday.length == 0) {
            this.saturday.push({
              day: 'SATURDAY'
            });
          }
          if (this.sunday.length == 0) {
            this.saturday.push({
              day: 'SUNDAY'
            });
          }
          this.onTabChange(0);
          this.filterSubjects();
          timetable.unsubscribe();
        })
      } else {
        this.monday.push({
          day: 'MONDAY'
        });
        this.tuesday.push({
          day: 'TUESDAY'
        });
        this.wednesday.push({
          day: 'WEDNESDAY'
        });
        this.thursday.push({
          day: 'THURSDAY'
        });
        this.friday.push({
          day: 'FRIDAY'
        });
        this.saturday.push({
          day: 'SATURDAY'
        });
        this.sunday.push({
          day: 'SUNDAY'
        });
      }
        
    });
  }

  onTabChange(e: any) {
    this.selectedTab = e;
    this.copydataTabs = [];
    this.tabs.forEach((x, idx) => {
      if (e != idx && x == 'Monday' && this.monday.length>0) {
        this.copydataTabs.push('Monday')
      } else if (e != idx && x == 'Tuesday' && this.tuesday.length>0) {
        this.copydataTabs.push('Tuesday')
      } else if (e != idx && x == 'Wednesday' && this.wednesday.length>0) {
        this.copydataTabs.push('Wednesday')
      } else if (e != idx && x == 'Thursday' && this.thursday.length>0) {
        this.copydataTabs.push('Thursday')
      } else if (e != idx && x == 'Friday' && this.friday.length>0) {
        this.copydataTabs.push('Friday')
      } else if (e != idx && x == 'Saturday' && this.saturday.length>0) {
        this.copydataTabs.push('Saturday')
      } else if (e != idx && x == 'Sunday' && this.sunday.length>0) {
        this.copydataTabs.push('Sunday')
      } 
    })
  }

  

  setData(day:string) {
    if (day == 'Monday' && this.monday.length > 0) {
      this.getPermisiion(day);
    } else if (day == 'Tuesday' && this.tuesday.length > 0) {
      this.getPermisiion(day);
    } else if (day == 'Wednesday' && this.wednesday.length > 0) {
      this.getPermisiion(day);
    } else if (day == 'Thursday' && this.thursday.length > 0) {
      this.getPermisiion(day);
    } else if (day == 'Friday' && this.friday.length > 0) {
      this.getPermisiion(day);
    } else if (day == 'Saturday' && this.saturday.length > 0) {
      this.getPermisiion(day);
    } else if (day == 'Sunday' && this.sunday.length > 0) {
      this.getPermisiion(day);
    } else {
      this.copydata(day);
    }
  }

  getPermisiion(day:string) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        title: 'Replace Data',
        message: 'Are you sure you want to replace the data?'
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        this.copydata(day)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getMondayData = '';
      this.getTuesdayData = '';
      this.getWednesdayData = '';
      this.getThursdayData = '';
      this.getFridayData = '';
      this.getSaturdayData = '';
    });
  }

  copydata(day: string) {
    let dayData :any = [];
    if (day == 'Monday') {
      this.monday = [];    
    } else if (day == 'Tuesday') {
      this.tuesday = [];
    } else if (day == 'Wednesday') {
      this.wednesday = [];
    } else if (day == 'Thursday') {
      this.thursday = [];
    } else if (day == 'Friday') {
      this.friday = [];
    } else if (day == 'Saturday') {
      this.saturday = [];
    } else if (day == 'Sunday') {
      this.sunday = [];
    }

    if (this.getSundayData=='Monday' ||this.getTuesdayData =='Monday' || this.getWednesdayData == 'Monday' || this.getThursdayData =='Monday' || this.getFridayData =='Monday' || this.getSaturdayData=='Monday') {
      let data = [...this.monday];
      data.forEach(x => {
        let newObj = { ...x, day: day,id :undefined };
        dayData.push(newObj);
      });
    }else if (this.getSundayData=='Tuesday' || this.getMondayData=='Tuesday' || this.getWednesdayData == 'Tuesday' || this.getThursdayData =='Tuesday' || this.getFridayData =='Tuesday' || this.getSaturdayData=='Tuesday') {
      let data = [...this.tuesday];
      data.forEach(x => {
        let newObj = { ...x, day: day,id :undefined };
        dayData.push(newObj);
      });
    } else if (this.getSundayData=='Wednesday' || this.getMondayData=='Wednesday' ||this.getTuesdayData =='Wednesday' || this.getThursdayData =='Wednesday' || this.getFridayData =='Wednesday' || this.getSaturdayData=='Wednesday') {
      let data = [...this.wednesday];
      data.forEach(x => {
        let newObj = { ...x, day: day,id :undefined };
        dayData.push(newObj);
      });
    } else if (this.getSundayData=='Thursday' || this.getMondayData=='Thursday' ||this.getTuesdayData =='Thursday' || this.getWednesdayData == 'Thursday' || this.getFridayData =='Thursday' || this.getSaturdayData=='Thursday') {
      let data = [...this.thursday];
      data.forEach(x => {
        let newObj = { ...x, day: day,id :undefined };
        dayData.push(newObj);
      });
    } else if (this.getSundayData=='Friday' || this.getMondayData=='Friday' ||this.getTuesdayData =='Friday' || this.getWednesdayData == 'Friday' || this.getThursdayData =='Friday' || this.getSaturdayData=='Friday') {
      let data = [...this.friday];
      data.forEach(x => {
        let newObj = { ...x, day: day,id :undefined };
        dayData.push(newObj);
      });
    } else if (this.getSundayData=='Saturday' || this.getMondayData=='Saturday' ||this.getTuesdayData =='Saturday' || this.getWednesdayData == 'Saturday' || this.getThursdayData =='Saturday' || this.getFridayData =='Saturday') {
      let data = [...this.saturday];
      data.forEach(x => {
        let newObj = { ...x, day: day,id :undefined };
        dayData.push(newObj);
      });
    } else if (this.getMondayData=='Sunday' ||this.getTuesdayData =='Sunday' || this.getWednesdayData == 'Sunday' || this.getThursdayData =='Sunday' || this.getFridayData =='Sunday' || this.getSaturdayData =='Sunday') {
      let data = [...this.saturday];
      data.forEach(x => {
        let newObj = { ...x, day: day,id :undefined };
        dayData.push(newObj);
      });
    } 
    if (day == 'Monday') {
      this.monday = [...dayData];  
    } else if (day == 'Tuesday') {
      this.tuesday = [...dayData];
    } else if (day == 'Wednesday') {
      this.wednesday = [...dayData];
    } else if (day == 'Thursday') {
      this.thursday = [...dayData];
    } else if (day == 'Friday') {
      this.friday = [...dayData];
    } else if (day == 'Saturday') {
      this.saturday = [...dayData];
    } else if (day == 'Sunday') {
      this.sunday = [...dayData];
    }
    
    this.getMondayData = '';
    this.getTuesdayData = '';
    this.getWednesdayData = '';
    this.getThursdayData = '';
    this.getFridayData = '';
    this.getSaturdayData = '';
  }

  addNew() {    
    const day:string = this.tabs[this.selectedTab];
    if (day == 'Monday') {
      if (this.monday.length != 0) {
        if (this.monday[this.monday.length - 1].intervalFrom && this.monday[this.monday.length - 1].intervalTo && ((this.monday[this.monday.length - 1].subjectId && this.monday[this.monday.length - 1].userId)||(this.monday[this.monday.length-1].isBreak))) {
          this.monday.push({
            day: 'MONDAY'
          });
        } else {
          this.toastr.error('Fill the Details First')
        }
      } else {
        this.monday.push({
          day: 'MONDAY'
        });
      }
    } else if (day == 'Tuesday') {
      if (this.tuesday.length != 0) {
        if (this.tuesday[this.tuesday.length - 1].intervalFrom && this.tuesday[this.tuesday.length - 1].intervalTo && ((this.tuesday[this.tuesday.length - 1].subjectId && this.tuesday[this.tuesday.length - 1].userId)||(this.tuesday[this.tuesday.length-1].isBreak))) {
          this.tuesday.push({
            day: 'TUESDAY'
          });
        } else {
          this.toastr.error('Fill the Details First')
        }
      } else {
        this.tuesday.push({
          day: 'TUESDAY'
        });
      }
    } else if (day == 'Wednesday') {
       if (this.wednesday.length != 0) {
        if (this.wednesday[this.wednesday.length - 1].intervalFrom && this.wednesday[this.wednesday.length - 1].intervalTo && ((this.wednesday[this.wednesday.length - 1].subjectId && this.wednesday[this.wednesday.length - 1].userId)||(this.wednesday[this.wednesday.length-1].isBreak))) {
          this.wednesday.push({
            day: 'WEDNESDAY'
          });
        } else {
          this.toastr.error('Fill the Details First')
        }
      } else {
        this.wednesday.push({
          day: 'WEDNESDAY'
        });
      }
    } else if (day == 'Thursday') {
       if (this.thursday.length != 0) {
        if (this.thursday[this.thursday.length - 1].intervalFrom && this.thursday[this.thursday.length - 1].intervalTo && ((this.thursday[this.thursday.length - 1].subjectId && this.thursday[this.thursday.length - 1].userId)||(this.thursday[this.thursday.length-1].isBreak))) {
          this.thursday.push({
            day: 'THURSDAY'
          });
        } else {
          this.toastr.error('Fill the Details First')
        }
      } else {
        this.thursday.push({
          day: 'THURSDAY'
        });
      }
    } else if ( day == 'Friday') {
      if (this.friday.length != 0) {
        if (this.friday[this.friday.length - 1].intervalFrom && this.friday[this.friday.length - 1].intervalTo && ((this.friday[this.friday.length - 1].subjectId && this.friday[this.friday.length - 1].userId)||(this.friday[this.friday.length-1].isBreak))) {
          this.friday.push({
            day: 'FRIDAY'
          });
        } else {
          this.toastr.error('Fill the Details First')
        }
      } else {
        this.friday.push({
          day: 'FRIDAY'
        });
      }
    } else if (day == 'Saturday') {
       if (this.saturday.length != 0) {
        if (this.saturday[this.saturday.length - 1].intervalFrom && this.saturday[this.saturday.length - 1].intervalTo && ((this.saturday[this.saturday.length - 1].subjectId && this.saturday[this.saturday.length - 1].userId)||(this.saturday[this.saturday.length-1].isBreak))) {
          this.saturday.push({
            day: 'SATURDAY'
          });
        } else {
          this.toastr.error('Fill the Details First')
        }
      } else {
        this.saturday.push({
          day: 'SATURDAY'
        });
      }
    } else if (day == 'Sunday') {
       if (this.sunday.length != 0) {
        if (this.sunday[this.sunday.length - 1].intervalFrom && this.sunday[this.saturday.length - 1].intervalTo && ((this.sunday[this.saturday.length - 1].subjectId && this.sunday[this.sunday.length - 1].userId)||(this.sunday[this.sunday.length-1].isBreak))) {
          this.sunday.push({
            day: 'SUNDAY'
          });
        } else {
          this.toastr.error('Fill the Details First')
        }
      } else {
        this.sunday.push({
          day: 'SUNDAY'
        });
      }
    }
  }

  removePeriod(day:string,idx:number) {
    if (day == 'monday') {
      this.monday.splice(idx,1);
    } else if (day == 'tuesday') {
      this.tuesday.splice(idx,1);
    } else if (day == 'wednesday') {
      this.wednesday.splice(idx,1);
    } else if (day == 'thursday') {
      this.thursday.splice(idx,1);
    } else if ( day == 'friday') {
      this.friday.splice(idx,1);
    } else if ( day == 'saturday') {
      this.saturday.splice(idx,1);
    } else if ( day == 'sunday') {
      this.sunday.splice(idx,1);
    }
  }

  onSubmit() {
     if (this.isTimeTableFormVisible) {
      this.timeTableForm.control.markAllAsTouched();
    }
    if (!this.timeTableForm.form.valid)
      return;
    let periods = this.validateAndMergeArrays();
    
    if (periods && periods.length > 0) {
      
      this.data.periods = periods;

      if (this.status == 'Edit') {
        const sub = this.instituteService.updateTimeTable(this.data).subscribe(res => {
          if (res.code == 200) {
            this.toastr.success(res.message);
            this.router.navigateByUrl('/app/institute/time-table')
          } else {
            this.toastr.error(res.message);
          }
          sub.unsubscribe();
        });
      } else {    
        const sub = this.instituteService.saveTimeTable(this.data).subscribe(res => {
          if (res.code == 200) {
            this.toastr.success(res.message);
            this.router.navigateByUrl('/app/institute/time-table')
          } else {
            this.toastr.error(res.message);
          }
          sub.unsubscribe();
        });
      }
    }
  }

  cancel() {
    this.router.navigateByUrl('/app/institute/time-table')
  }

  validateAndMergeArrays(): Period[] | void {
    const allDays = [this.monday, this.tuesday, this.wednesday, this.thursday, this.friday,this.saturday];

    const mergedArray: Period[] = [];

    const hasEmptyField = (obj: Period): boolean => {
      if (obj.isBreak) {        
        return (
          !obj.intervalFrom ||
          !obj.intervalTo ||
          !obj.periodName
        );
      }
      return (
        !obj.intervalFrom ||
        !obj.intervalTo ||
        obj.subjectId === 0 ||
        obj.userId === 0
      );
    };
    
    let check = false
    for (const dayArray of allDays) {  
      for (let i = 0; i < dayArray.length; i++){      
        if (!dayArray[i].intervalFrom && !dayArray[i].intervalTo && !dayArray[i].subjectId && !dayArray[i].userId && !dayArray[i].isBreak) {
          dayArray.splice(i, 1);
        } else {
          if (hasEmptyField(dayArray[i])) {
            this.toastr.error('Fill All Data of ' + dayArray[i].day);
            check = true
            break;
          } else {
            mergedArray.push(dayArray[i]);
          }
        }
      }
      if (check) {
        break;        
      }
    }
    if (!check) {
      return mergedArray
    }
  }

  generateTimeSlots() {
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const period = hour < 12 ? 'AM' : 'PM';
        let displayHour = hour % 12;
        if (displayHour === 0) {
          displayHour = 12; 
        }
        const displayMinute = minute === 0 ? '00' : '30';
        this.timeSlots.push(`${displayHour}:${displayMinute}${period}`);
      }
    }
  }

  filterSubjects() {
    if (this.data.associationId) {
      this.filteredSubjects = this.subjects.filter(x => x.associationIds && x.associationIds.length > 0 && x.associationIds.findIndex(id => id == this.data.associationId) > -1);
      if (this.filteredSubjects.length == 0) {
        this.toastr.error('There is no subject linked with selected class');
      }
    } else {
      this.filteredSubjects = [];
    }
  }

  compareTimes(a: string, b: string): boolean {
    const dateA = this.convertTo24HourFormat(a);
    const dateB = this.convertTo24HourFormat(b);

    return dateA < dateB;
  }

  convertTo24HourFormat(time: string): Date {
    const [timePart, meridian] = time.split(' ');
    const [hours, minutes] = timePart.split(':').map(Number);

    let hour = hours;
    if (meridian === 'PM' && hours < 12) {
      hour += 12;
    } else if (meridian === 'AM' && hours === 12) {
      hour = 0;
    }

    const date = new Date();
    date.setHours(hour, minutes, 0, 0);
    return date;
  }

  periodTimeTo(day:string,index:number) {
    if (day == 'MONDAY') {
      let check = this.compareTimes(this.monday[index].intervalTo!, this.monday[index].intervalFrom!);
      if (check) {
        this.monday[index].intervalTo = undefined;
      }
    } else if (day == 'TUESDAY') {
      let check = this.compareTimes(this.tuesday[index].intervalTo!, this.tuesday[index].intervalFrom!);
      if (check) {
        this.tuesday[index].intervalTo = undefined;
      }
    } else if (day == 'WEDNESDAY') {
      let check = this.compareTimes(this.wednesday[index].intervalTo!, this.wednesday[index].intervalFrom!);
      if (check) {
        this.wednesday[index].intervalTo = undefined;
      }
    } else if (day == 'THURSDAY') {
      let check = this.compareTimes(this.thursday[index].intervalTo!, this.thursday[index].intervalFrom!);
      if (check) {
        this.thursday[index].intervalTo = undefined;
      }
    } else if (day == 'FRIDAY') {
      let check = this.compareTimes(this.friday[index].intervalTo!, this.friday[index].intervalFrom!);
      if (check) {
        this.friday[index].intervalTo = undefined;
      }
    } else if (day == 'SATURDAY') {
      let check = this.compareTimes(this.saturday[index].intervalTo!, this.saturday[index].intervalFrom!);
      if (check) {
        this.saturday[index].intervalTo = undefined;
      }
    } else if (day == 'SUNDAY') {
      let check = this.compareTimes(this.sunday[index].intervalTo!, this.sunday[index].intervalFrom!);
      if (check) {
        this.sunday[index].intervalTo = undefined;
      }
    }
  }

  validatePeriodsTimeTo(day: string, index: number) { 
    if (day == 'MONDAY' && this.monday.length>1) {
      for (let i = 1; i <= this.monday.length; i++){
        let check = this.compareTimes(this.monday[i].intervalFrom!, this.monday[i-1].intervalTo!)
        if (check) {
          this.monday[i].intervalFrom = undefined;
        }
      }
    } else if (day == 'TUESDAY' && this.tuesday.length>1) {
      for (let i = 1; i <= this.tuesday.length; i++){
        let check = this.compareTimes(this.tuesday[i].intervalFrom!, this.tuesday[i-1].intervalTo!)
        if (check) {
          this.tuesday[i].intervalFrom = undefined;
        }
      }
    } else if (day == 'WEDNESDAY' && this.wednesday.length>1) {
      for (let i = 1; i <= this.wednesday.length; i++){
        let check = this.compareTimes(this.wednesday[i].intervalFrom!, this.wednesday[i-1].intervalTo!)
        if (check) {
          this.wednesday[i].intervalFrom = undefined;
        }
      }
    } else if (day == 'THURSDAY' && this.thursday.length>1) {
      for (let i = 1; i <= this.thursday.length; i++){
        let check = this.compareTimes(this.thursday[i].intervalFrom!, this.thursday[i-1].intervalTo!)
        if (check) {
          this.thursday[i].intervalFrom = undefined;
        }
      }
    } else if (day == 'FRIDAY' && this.friday.length>1) {
      for (let i = 1; i <= this.friday.length; i++){
        let check = this.compareTimes(this.friday[i].intervalFrom!, this.friday[i-1].intervalTo!)
        if (check) {
          this.friday[i].intervalFrom = undefined;
        }
      }
    } else if (day == 'SATURDAY' && this.saturday.length>1) {
      for (let i = 1; i <= this.saturday.length; i++){
        let check = this.compareTimes(this.saturday[i].intervalFrom!, this.saturday[i-1].intervalTo!)
        if (check) {
          this.saturday[i].intervalFrom = undefined;
        }
      }
    } else if (day == 'SUNDAY' && this.sunday.length>1) {
      for (let i = 1; i <= this.sunday.length; i++){
        let check = this.compareTimes(this.sunday[i].intervalFrom!, this.sunday[i-1].intervalTo!)
        if (check) {
          this.sunday[i].intervalFrom = undefined;
        }
      }
    }
  }

}
