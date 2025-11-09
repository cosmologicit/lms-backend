import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddBranchComponent } from '../add-branch/add-branch.component';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';
import { Branch } from 'src/app/core/api-models/institute-model';
import { ConfirmationDialogComponent } from 'src/app/feature/shared/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
  toggleValue = 'table';
  searchDepartmentText: string = '';
  branches: Array<Branch> = [];
  teachers: any = [];
  displayedColumns: string[] = ['sno', 'name', 'code', 'phone', 'action'];
  dataSource = new MatTableDataSource<Branch>(this.branches);

  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor(public dialog: MatDialog,private instituteService:InstituteService,private toastr:ToastrService) { }
  
  ngOnInit(){
    this.loadTableData();
  }

  loadTableData() {
     const sub = this.instituteService.getBranches().subscribe(res => {
      if (res.code == 200) {
        this.branches = res.data;
        this.dataSource.data = this.branches
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    });
  }

    
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;  
  }

  getSerialNumber(index: number): number {
   if (!this.paginator) {
      return index + 1;
    }
    return this.paginator.pageIndex * this.paginator.pageSize + index + 1;
  }
  
  openAddBranch() {
    let dialogRef = this.dialog.open(AddBranchComponent, {
      width: '50%',
      autoFocus: false,
      data: {}
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {      
      this.loadTableData();
      dialogRef.close();
    });
  }

  openEditBranch(id:number) {
    let dialogRef = this.dialog.open(AddBranchComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        id: id
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        this.loadTableData();
        dialogRef.close();
      }
    })
  }

  deleteBranch(id:number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        title: 'Delete Branch',
        message: 'Are you sure you want to delete the selected branch?'
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        const sub = this.instituteService.deleteBranch(id).subscribe(res => {
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
