import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { el } from 'date-fns/locale';
import { ToastrService } from 'ngx-toastr';
import { Grading } from 'src/app/core/api-models/institute-model';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';

@Component({
  selector: 'app-add-edit-grade',
  templateUrl: './add-edit-grade.component.html',
  styleUrls: ['./add-edit-grade.component.scss']
})
export class AddEditGradeComponent implements OnInit{
  data: Grading = {
    examStatus:'ACTIVE'
  };
  status: string = 'Add';
  isGradeFormVisible: boolean = true;

  @ViewChild('gradeForm') gradeForm?: any;
  @Output() confirmed = new EventEmitter<boolean>();
  constructor(public dialogRef: MatDialogRef<AddEditGradeComponent>, @Inject(MAT_DIALOG_DATA) public details: { id: number },
    private instituteService: InstituteService,private toastr:ToastrService) { }
  
  ngOnInit() {
    if (this.details.id) {   
      this.status = 'Edit';
      const sub = this.instituteService.getGradeById(this.details.id).subscribe(res => {
        if (res.code == 200) {
          this.data = res.data;
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.isGradeFormVisible) {
      this.gradeForm.control.markAllAsTouched();
    }

    if (!this.gradeForm.form.valid) {
      return
    }
    if (this.details.id) {
      const sub = this.instituteService.updateGrade(this.data).subscribe(res => {
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
      const sub = this.instituteService.saveGrade(this.data).subscribe(res => {
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

  setMinMarks() {
    if(this.data.maxMarks && this.data.minMarks && this.data.maxMarks<this.data.minMarks){
      this.data.minMarks = undefined;
    }
  }
}
