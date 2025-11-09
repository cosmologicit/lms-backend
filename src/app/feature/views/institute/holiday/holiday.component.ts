import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';
import { UserService } from 'src/app/core/api-services/user/user.service';
import { ConfirmationDialogComponent } from 'src/app/feature/shared/confirmation-dialog/confirmation-dialog.component';
import { AddHolidayComponent } from '../add-holiday/add-holiday.component';
import { TimeTable } from 'src/app/core/api-models/auth-model';
import { Holiday } from 'src/app/core/api-models/institute-model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent {
  toggleValue = 'table';
  holidays: Holiday[] = [];
  filteredHolidays: Holiday[] = [];
  filterHolidaytext: string = '';
  resultsLength = 0;
  role: string = '';
  public ColumnMode = ColumnMode;

  constructor(public dialog: MatDialog, private instituteService: InstituteService, private toastr: ToastrService,
    private router: Router,private authService: AuthenticationService) { }

  ngOnInit() {
    this.role = this.authService.role;
    this.loadTableData();
  }

  loadTableData() {
    const sub = this.instituteService.getHolidays().subscribe(res => {
      if (res) {
        this.holidays = res.data;
        this.filteredHolidays = res.data;
      }
      sub.unsubscribe();
    });
  }

  filterHoliday() {
    if (this.filterHolidaytext?.length > 0) {
      let text = this.filterHolidaytext.toLowerCase();
      this.filteredHolidays = this.holidays.filter(x =>
        (x.title && x.title.toLowerCase().includes(text)));
    } else {
      this.filteredHolidays = [...this.holidays];
    }
  }

  addHoliday() {
     let dialogRef = this.dialog.open(AddHolidayComponent, {
      width: '50%',
      autoFocus: false,
      data: {}
     });
     dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        this.loadTableData();
      }
    });
  }

  editHoliday(id: number) {
    let dialogRef = this.dialog.open(AddHolidayComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        id:id
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        this.loadTableData();
      }
    });
  }


  deleteHoliday(id: number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        title: 'Delete Holiday',
        message: 'Are you sure you want to delete the selected holiday?'
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        const sub = this.instituteService.deleteHoliday(id).subscribe(res => {
          if (res.code == 200) {
            this.loadTableData();
            this.toastr.success(res.message);
          } else {
            this.toastr.error(res.message);
          }
        })
      }
    });
  }

}
