import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Holiday } from 'src/app/core/api-models/institute-model';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.scss']
})
export class AddHolidayComponent implements OnInit {
  status: string = 'Add';
  data: Holiday = {};
  isHolidayFormVisible = true;

  @ViewChild('holidayForm') holidayForm?: any;
  @Output() confirmed = new EventEmitter<boolean>();
  constructor(public dialogRef: MatDialogRef<AddHolidayComponent>, @Inject(MAT_DIALOG_DATA) public details: { id: number },
    private instituteService: InstituteService,private toastr:ToastrService) { }
  
  ngOnInit(){
    if (this.details.id) {
      this.status='Edit'
      const sub = this.instituteService.getHolidayById(this.details.id).subscribe(res => {
        this.data = res.data;
        sub.unsubscribe();
      })
    }
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
   if (this.isHolidayFormVisible) {
      this.holidayForm.control.markAllAsTouched();
    }
    if (!this.holidayForm.form.valid)
      return;

    if (this.details.id) {
        const sub = this.instituteService.updateHoliday(this.data).subscribe(res => {
        if (res.code == 200) {
          this.toastr.success(res.message); 
          this.confirmed.emit(true);
          this.close();
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    } else {    
      const sub = this.instituteService.saveHoliday(this.data).subscribe(res => {
        if (res.code == 200) {
          this.toastr.success(res.message); 
          this.confirmed.emit(true);
          this.close();
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    }
  }

  setEndTime() {
    if (this.data.startDate && !this.data.endDate) {
      this.data.endDate = this.data.startDate;
    } else if (this.data.startDate && this.data.endDate) {
      let check = this.data.startDate <= this.data.endDate
      if (!check) {
        this.data.endDate = this.data.startDate;
      }
    }
  }
}
