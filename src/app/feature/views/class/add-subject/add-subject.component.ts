import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Association, Subject } from 'src/app/core/api-models/class-model';
import { Branch } from 'src/app/core/api-models/institute-model';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {
  data: Subject = {};
  branches: Array<Branch> = [];
  issubjectFormVisible = true;
  status: string = 'Add'
  classes: Array<Association> = [];
  isSelectAll = false;
  selectUnselectText: string = 'Select All Class';


  @ViewChild('subjectForm') subjectForm?: any;
  @Output() confirmed = new EventEmitter<boolean>();
  constructor(public dialogRef: MatDialogRef<AddSubjectComponent>, @Inject(MAT_DIALOG_DATA) public details: { id: number },
    private classService: ClassService, private toastr: ToastrService, private instituteService: InstituteService) { }
  
  ngOnInit(){
    const cls = this.classService.getAllClasses().subscribe(res => {
      this.classes = res.data;
      this.loadTableData();
      cls.unsubscribe();
    });
  }
  
  loadTableData() {
    if (this.details.id) {
      this.status = 'Edit';
      const sub = this.classService.getSubjectById(this.details.id).subscribe(res => {
        this.data = res.data;
        if (this.data.associationIds?.length == this.classes.length) {
          this.selectUnselectText = 'Unselect All Class';
          this.data.associationIds = this.classes.map(x => x.id!);
          this.isSelectAll = true;
        }
        sub.unsubscribe();
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
     if (this.issubjectFormVisible) {
      this.subjectForm.control.markAllAsTouched();
    }
    if (!this.subjectForm.form.valid)
      return;

    if (this.details.id) {
      const sub = this.classService.updateSubject(this.data).subscribe(res => {
        if (res.code == 200) {
          this.close();
          this.confirmed.emit(true);
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    } else {
      const sub = this.classService.saveSubject(this.data).subscribe(res => {
        if (res.code == 200) {
          this.close();
          this.confirmed.emit(true);
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    }
  }

  checkAll() {        
    if (this.data.associationIds?.length == this.classes.length) {
      this.data.associationIds = []
      this.selectUnselectText = 'Select All Class';
    } else {
      this.selectUnselectText = 'Unselect All Class';
      this.data.associationIds = this.classes.map(x => x.id!);
    }
  }

  
}
