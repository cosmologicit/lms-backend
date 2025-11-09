import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';
import { Department } from 'src/app/core/api-models/institute-model';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/feature/shared/confirmation-dialog/confirmation-dialog.component';
import { AddDepartmentCourseTemplateComponent } from '../add-department-course-template/add-department-course-template.component';
import { AddDepartmentCourseTemplateV2Component } from '../add-department-course-template-v2/add-department-course-template-v2.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent {
  toggleValue = 'table';
  searchDepartmentText: string = '';
  departments: Array<Department> = [];
  teachers: any = [];
  displayedColumns: string[] = ['sno', 'name', 'hod', 'code', 'action'];
  dataSource = new MatTableDataSource<Department>(this.departments);

  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor(public dialog: MatDialog, private instituteService: InstituteService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadTableData();
  }

  loadTableData() {
    const sub = this.instituteService.getDepartments().subscribe(res => {
      if (res.code == 200) {
        this.departments = res.data;
        this.dataSource.data = this.departments;
      } else {
        this.toastr.error(res.message);
      }
    })
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getSerialNumber(index: number): number {
    if (!this.paginator) {
      return index + 1;
    }
    return this.paginator.pageIndex * this.paginator.pageSize + index + 1;
  }

  openAddDepartment() {
    let dialogRef = this.dialog.open(AddDepartmentCourseTemplateV2Component, {
      width: '50%',
      autoFocus: false,
      data: {
        type: 'DEPARTMENT'
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        this.loadTableData();
      }
    });
  }

  editDepartment(id: number) {
    let dialogRef = this.dialog.open(AddDepartmentCourseTemplateV2Component, {
      width: '50%',
      autoFocus: false,
      data: {
        id: id,
        type: 'DEPARTMENT'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.loadTableData();
    });
  }

  deleteDepartment(id: number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '40%',
      autoFocus: false,
      data: {
        title: 'Delete Department',
        message: 'Are you sure you want to delete the selected department?'
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        const sub = this.instituteService.deleteDepartment(id).subscribe(res => {
          if (res.code == 200) {
            this.toastr.success(res.message);
            this.loadTableData();
          } else {
            this.toastr.error(res.message);
          }
        })
      }
    });
  }

}
