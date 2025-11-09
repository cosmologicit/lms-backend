import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/core/api-models/institute-model';
import { ConfirmationDialogComponent } from 'src/app/feature/shared/confirmation-dialog/confirmation-dialog.component';
import { AddDepartmentCourseTemplateComponent } from '../add-department-course-template/add-department-course-template.component';
import { AddDepartmentCourseTemplateV2Component } from '../add-department-course-template-v2/add-department-course-template-v2.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  toggleValue = 'table';
  searchDepartmentText: string = '';
  courses: Array<Course> = [];
  teachers: any = [];
  displayedColumns: string[] = ['sno', 'name', 'duration', 'code', 'action'];
  dataSource = new MatTableDataSource<Course>(this.courses);

  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor(public dialog: MatDialog, private instituteService: InstituteService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadTableData();
  }

  loadTableData() {
    const sub = this.instituteService.getCourses().subscribe(res => {
      if (res.code == 200) {
        this.courses = res.data;
        this.dataSource.data = this.courses
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

  openAddCourse() {
    let dialogRef = this.dialog.open(AddDepartmentCourseTemplateV2Component, {
      width: '50%',
      autoFocus: false,
      data: {
        type: 'COURSE'
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      this.loadTableData();
    });
  }

  opnEditCourse(id: number) {
    let dialogRef = this.dialog.open(AddDepartmentCourseTemplateV2Component, {
      width: '50%',
      autoFocus: false,
      data: {
        id: id,
        type: 'COURSE'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.loadTableData();
    })
  }


  deleteCourse(id: number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '40%',
      autoFocus: false,
      data: {
        title: 'Delete Course',
        message: 'Are you sure you want to delete the selected course?'
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        const sub = this.instituteService.deleteCourse(id).subscribe(res => {
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
