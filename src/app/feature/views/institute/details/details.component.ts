import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthResponse } from 'src/app/core/api-models/auth-model';
import { State } from 'src/app/core/api-models/common-model';
import { InstituteDetails, Workingdays } from 'src/app/core/api-models/institute-model';
import { GeneralService } from 'src/app/core/api-services/common/general.service';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';
import { AppEvents } from 'src/app/core/models/appenums';
import { AppStateService } from 'src/app/core/services/app-state/app.state.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { ConfirmationDialogComponent } from 'src/app/feature/shared/confirmation-dialog/confirmation-dialog.component';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  data: InstituteDetails = {};
  dateRanges: string[] = [];
  isdetailsFormForm = true;
  states: Array<State> = [];
  user: AuthResponse = {};
  hasLogo: boolean = false;
  isInstituteSave: boolean = true;
  days: Array<Workingdays> = [
    {
      dayOfWeek: 'MONDAY',
      workingDay:false
    },
    {
      dayOfWeek: 'TUESDAY',
      workingDay:false
    },
    {
      dayOfWeek: 'WEDNESDAY',
      workingDay:false
    },
    {
      dayOfWeek: 'THURSDAY',
      workingDay:false
    },
    {
      dayOfWeek: 'FRIDAY',
      workingDay:false
    },
    {
      dayOfWeek: 'SATURDAY',
      workingDay:false
    },
    {
      dayOfWeek: 'SUNDAY',
      workingDay:false
    },
  ];
  workingDays: Array<string> = [];

  @ViewChild('detailsForm') detailsForm?: any;
  constructor(private instituteService: InstituteService, private toastr: ToastrService, private router: Router,private httpClient: HttpClient,
    private authenservice: AuthenticationService, private generalService: GeneralService, private appStateService: AppStateService,
  private dialog:MatDialog) { }
  
  ngOnInit() {
    const currentYear = new Date().getFullYear();
    this.dateRanges = this.generateDateRanges(2014, currentYear);
    this.data.session = currentYear + '-' + (currentYear + 1);
    const sub = this.generalService.getStates().subscribe(res => {
      this.states = res.data;
      sub.unsubscribe();
    });
    this.getUserDetails(false);

    const work = this.instituteService.getWorkingDays().subscribe(res => {
      if (res.code == 200) {
        this.days = res.data;
        if (this.days.length > 0) {
          this.days.forEach(x => {
            if (x.workingDay == true) {
              this.workingDays.push(x.dayOfWeek!)
            }
          });
       }
      } else {
        this.toastr.error(res.message);
      }
      work.unsubscribe()
    });
    let startTime = this.authenservice.startTime;
    if(startTime!='null'){
      this.loadData();
    }
  }

  loadData() {
    const det = this.instituteService.getInstituteDetails().subscribe(res => {
      if (res.code == 200) {
        this.data = res.data;
        if (this.data.logoUrl) {
          this.hasLogo = true;
        }
      } else {
        this.toastr.error(res.message);
      }
      det.unsubscribe();
    });
  }

  getUserDetails(setCurrentUser:boolean) {
    const user = this.generalService.getCurrentUserDetails().subscribe(res => {
      this.user = res.data;
      if (this.user.instituteId == null) {
        this.isInstituteSave = false;
      }
      if (setCurrentUser) {
        this.appStateService.sendEvent(AppEvents.SetUser,this.user)
      }
      user.unsubscribe();
    });
  }

  addLogo(id:string) {
    document.getElementById(id)?.click();
  }

  onLogoChange(e: any) {
    let file = e.target.files[0];
    let formData: any = new FormData();
    formData.append('logo', file);
    this.instituteService.processing(true);
    this.httpClient.post(`${environment.lmsEndPoint}institute/institute-logo?isDeleted=false`, formData).subscribe((res: any) => {
      if (res.code == 200) {
        this.data.logoUrl = res.data;
        this.hasLogo = true;
        this.toastr.success('Logo updated successfully. Please refresh to sync')
      }
    });
    this.instituteService.processing(false);
  }

    generateDateRanges(startYear: number, endYear: number): string[] {
      const dateRanges: string[] = [];
      for (let year = startYear; year < (endYear+1); year++) {
        dateRanges.push(`${year}-${year + 1}`);
      }
      return dateRanges;
    }

  removeLogo() {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        message: 'Are you sure you want to remove logo ?',
        title: 'Remove logo'
      },
    });

    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        this.httpClient.post(`${environment.lmsEndPoint}institute/institute-logo?isDeleted=true`, null).subscribe((res: any) => {
          if (res.code == 200) {
            this.hasLogo = false;
            this.toastr.success('Logo updated successfully. Please refresh to sync')
          }
        });
      }
    });
  }
  
  onSubmit() {
     if (this.isdetailsFormForm) {
      this.detailsForm.control.markAllAsTouched();
    }
    if (!this.detailsForm.form.valid)
      return;
    
    let check = false;
    if (this.user.instituteId == null) {
      check = true;
    }
    if (this.data.id) {     
      const sub = this.instituteService.updateInstituteDetails(this.data).subscribe(res => {
      if (res.code == 200) {
        this.toastr.success(res.message);
        this.appStateService.sendEvent(AppEvents.SetUser, res.data);
        console.log(this.workingDays);
        
        if (this.days.length > 0) {  
          this.days.forEach(x => {
            if (this.workingDays.includes(x.dayOfWeek!)) {
              x.workingDay = true;
            } else {
              x.workingDay = false;
            }
         })
          const work = this.instituteService.saveWorkingDays(this.days).subscribe(res => {
            if (res.code == 200) {
              
            } else {
              this.toastr.error(res.message);
            }
            work.unsubscribe();
          });
        }
        if (check) {
          this.authenservice.token = res.data.token!;
          window.location.reload();
        }
      } else {
        this.toastr.error(res.message)
      }
      sub.unsubscribe();
    });
    } else {
      const sub = this.instituteService.saveInstituteDetails(this.data).subscribe(res => {
        if (res.code == 200) {
          this.toastr.success(res.message);
          if (check) {
            this.authenservice.token = res.data.token!;
            window.location.reload();
          }
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    }
  }

  formatTime(inputTime: string): void {
   if (!inputTime) return;
    const [time, period] = inputTime.split(' ');
    let [hours, minutes] = time.split(':');

    hours = hours.padStart(2, '0');

    this.data.startTiming = `${hours}:${minutes} ${period}`;
    
  }

  formatEndTime(inputTime: string): void {
    if (!inputTime) return;
    const [time, period] = inputTime.split(' ');
    let [hours, minutes] = time.split(':');

    hours = hours.padStart(2, '0');

    this.data.endTiming = `${hours}:${minutes} ${period}`;
  }


  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
  
}
