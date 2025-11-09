import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-attendence-details',
  templateUrl: './attendence-details.component.html',
  styleUrls: ['./attendence-details.component.scss']
})
export class AttendenceDetailsComponent implements OnInit {
  logStatuses: any = [];
  top:number=0
  left: number = 0;
  checkIn: any =[];
  checkOut: any= [];

  constructor(private dialogRef: MatDialogRef<AttendenceDetailsComponent>, @Inject(MAT_DIALOG_DATA) public details: { selectedDayData:any,top:number,left:number },) {
    
  }

  ngOnInit() {    
    if (this.details.selectedDayData.logStatuses) {
      this.logStatuses = this.details.selectedDayData.logStatuses;   
      if (this.logStatuses.length > 2) {
        this.logStatuses.forEach((x: any) => {
          if (x.status == 'CHECK_IN') {
            this.checkIn.push(x);
          } else {
            this.checkOut.push(x);
          }
          
        });
      }
    }
  }
}
