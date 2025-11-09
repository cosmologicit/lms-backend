import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { State } from 'src/app/core/api-models/common-model';
import { Branch } from 'src/app/core/api-models/institute-model';
import { GeneralService } from 'src/app/core/api-services/common/general.service';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';
import { BranchMappingModalComponent } from '../branch-mapping-modal/branch-mapping-modal.component';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent implements OnInit {
  status: string = 'Add';
  data: Branch = {};
  isbranchFormVisible = true;
  states: Array<State> = [];
  dateRanges: string[] = [];

  @ViewChild('branchForm') branchForm?: any;
  @Output() confirmed = new EventEmitter<boolean>();
  constructor(public dialogRef: MatDialogRef<AddBranchComponent>, @Inject(MAT_DIALOG_DATA) public details: { id: number },
    private instituteService: InstituteService, private toastr: ToastrService, private generalService: GeneralService, private dialog: MatDialog) { }

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    this.dateRanges = this.generateDateRanges(2014, currentYear);
    this.data.session = currentYear + '-' + (currentYear + 1);

    if (this.details.id != null) {
      this.status = 'Edit'
      const sub = this.instituteService.getBranchById(this.details.id).subscribe(res => {
        if (res.code == 200) {
          this.data = res.data;
        } else {
          this.toastr.error(res.message);
        }
      });
    }
    const sub = this.generalService.getStates().subscribe(res => {
      this.states = res.data;
      sub.unsubscribe();
    })
  }

  generateDateRanges(startYear: number, endYear: number): string[] {
    const dateRanges: string[] = [];
    for (let year = startYear; year < (endYear + 1); year++) {
      dateRanges.push(`${year}-${year + 1}`);
    }
    return dateRanges;
  }


  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.isbranchFormVisible) {
      this.branchForm.control.markAllAsTouched();
    }
    if (!this.branchForm.form.valid)
      return;

    const sub = this.instituteService.checkDefaultMapping().subscribe(res => {
      if (res.code == 200) {
        this.data.updateDefaultBranch = res.data.defaultBranchExists;
        if (res.data.defaultBranchMappingExists) {
          this.openBranchMappingModal();
        } else {
          this.saveAndUpdatedata();
        }
      } else {

      }

      sub.unsubscribe();
    })


  }

  saveAndUpdatedata() {
    if (this.details.id) {
      const sub = this.instituteService.updateBranch(this.data).subscribe(res => {
        if (res.code == 200) {
          this.toastr.success(res.message);
          this.confirmed.emit(true);
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    } else {
      const sub = this.instituteService.saveBranch(this.data).subscribe(res => {
        if (res.code == 200) {
          this.toastr.success(res.message);
          this.confirmed.emit(true);
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    }
  }

  openBranchMappingModal() {
    let dialogRef = this.dialog.open(BranchMappingModalComponent, {
      width: '30%',
      autoFocus: 'false',
      data: {
        name: this.data.name
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      this.data.updateDefaultBranch = res;
      this.saveAndUpdatedata();
      dialogRef.close()
    })
  }

}
