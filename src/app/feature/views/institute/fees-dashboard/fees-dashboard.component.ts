import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Fees } from 'src/app/core/api-models/institute-model';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { AddFeesComponent } from '../add-fees/add-fees.component';
import { ConfirmationDialogComponent } from 'src/app/feature/shared/confirmation-dialog/confirmation-dialog.component';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { Association } from 'src/app/core/api-models/class-model';

@Component({
  selector: 'app-fees-dashboard',
  templateUrl: './fees-dashboard.component.html',
  styleUrls: ['./fees-dashboard.component.scss']
})
export class FeesDashboardComponent {
  toggleValue = 'table';
  fees: Fees[] = [];
  filteredFees: Fees[] = [];
  filterFeestext: string = '';
  resultsLength = 0;
  role: string = '';
  classes: Array<Association> = [
    {
      id: 0,
      name:'All'
    }
  ];
  selectedClass:number=0
  public ColumnMode = ColumnMode;

  constructor(public dialog: MatDialog, private instituteService: InstituteService, private toastr: ToastrService,
    private router: Router,private authService: AuthenticationService,private classService:ClassService) { }

  ngOnInit() {
    this.role = this.authService.role;
    this.loadTableData();
  }

  loadTableData() {
    const sub = this.instituteService.getFeeDetails().subscribe(res => {
      if (res.code==200) {
        this.fees = res.data;
        this.filteredFees = res.data;
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    });
    const cls = this.classService.getAllClasses().subscribe(res => {
      if (res.code = 200) {
        res.data.forEach(x => {
          this.classes.push(x);
        })
      } else {
        this.toastr.error(res.message);
      }
      cls.unsubscribe();
    });
  }

  filterFees() {
    this.filteredFees = [...this.fees];
    if (this.filterFeestext?.length > 0) {
      let text = this.filterFeestext.toLowerCase();
      this.filteredFees = this.fees.filter(x =>
        (x.name && x.name.toLowerCase().includes(text)));
    } 

    if (this.selectedClass && this.selectedClass > 0) {
      this.filteredFees = this.filteredFees.filter(x=>x.associationId && x.associationId==this.selectedClass)
    }
  }

  addFees() {
     let dialogRef = this.dialog.open(AddFeesComponent, {
      width: '60%',
      autoFocus: false,
      data: {}
     });
     dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        this.loadTableData();
      }
    });
  }

  editFees(id: number) {
    let dialogRef = this.dialog.open(AddFeesComponent, {
      width: '60%',
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


  deleteFees(id: number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        title: 'Delete Fees',
        message: 'Are you sure you want to delete the selected fees?'
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        const sub = this.instituteService.deleteFees(id).subscribe(res => {
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
