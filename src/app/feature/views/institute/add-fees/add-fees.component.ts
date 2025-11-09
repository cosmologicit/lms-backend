import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Association } from 'src/app/core/api-models/class-model';
import { Fees } from 'src/app/core/api-models/institute-model';
import { Student } from 'src/app/core/api-models/user-model';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';
import { UserService } from 'src/app/core/api-services/user/user.service';

@Component({
  selector: 'app-add-fees',
  templateUrl: './add-fees.component.html',
  styleUrls: ['./add-fees.component.scss']
})
export class AddFeesComponent implements OnInit {
  status: string = 'Add ';
  data: Fees = {};
  classes: Array<Association> = [];
  isFeesFormVisible = true;

  @ViewChild('feeForm') feeForm?: any;
  @Output() confirmed = new EventEmitter<boolean>();
  constructor(private classService: ClassService, private toastr: ToastrService, public dialogRef: MatDialogRef<AddFeesComponent>,
    @Inject(MAT_DIALOG_DATA) public details: { id: number },private instituteService:InstituteService) { }
  
  ngOnInit() {    
    const sub = this.classService.getAllClasses().subscribe(res => {
      if (res.code == 200) {
        this.classes = res.data;
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    });
    if (this.details.id) {
      this.status='Edit'
      const fee = this.instituteService.getFeesById(this.details.id).subscribe(res => {
      if (res.code == 200) {
        this.data = res.data;
      } else {
        this.toastr.error(res.message);
      }
      fee.unsubscribe();
    });
    }
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.isFeesFormVisible) {
      this.feeForm.control.markAllAsTouched();
    }
    if (!this.feeForm.form.valid)
      return;

    if (this.details.id) {
      const sub = this.instituteService.updateFeesDeatils(this.data).subscribe(res => {
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
      const sub = this.instituteService.saveFeesDeatils(this.data).subscribe(res => {
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

}
