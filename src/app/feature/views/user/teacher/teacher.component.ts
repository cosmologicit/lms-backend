import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';
import { ConfirmationDialogComponent } from 'src/app/feature/shared/confirmation-dialog/confirmation-dialog.component';
import { AddTeacherComponent } from '../add-teacher/add-teacher.component';
import { AddStudentComponent } from '../add-student/add-student.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { UserService } from 'src/app/core/api-services/user/user.service';
import { Teacher } from 'src/app/core/api-models/user-model';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Router, RouterModule } from '@angular/router';
import { AttendenceViewComponent } from '../../institute/attendence-view/attendence-view.component';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    CommonModule,
    NgxDatatableModule,
    RouterModule
  ],
})
export class TeacherComponent {
  toggleValue = 'table';
  teachers: Teacher[] = [];
  filteredTeachers: Teacher[] = [];
  filterTeachertext: string = '';
  resultsLength = 0;
  public ColumnMode = ColumnMode;

  constructor(public dialog: MatDialog, private instituteService: InstituteService, private toastr: ToastrService,
    private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loadTableData();
  }

  loadTableData() {
    const sub = this.userService.getTeachers().subscribe(res => {
      if (res.code == 200) {
        this.teachers = res.data;
        this.filteredTeachers = res.data;
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    });
  }

  filterTeachers() {
    if (this.filterTeachertext?.length > 0) {
      let text = this.filterTeachertext.toLowerCase();
      this.filteredTeachers = this.teachers.filter(x =>
        (x.name && x.name.toLowerCase().includes(text)));
    } else {
      this.filteredTeachers = [...this.teachers];
    }
  }

  deleteTeacher(id: number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        title: 'Delete Teacher',
        message: 'Are you sure you want to delete the selected teacher?'
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        const sub = this.userService.deleteUser(id).subscribe(res => {
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

  viewAttendence(id: number, type: string) {
    let dialogRef = this.dialog.open(AttendenceViewComponent, {
      width: '95%',
      autoFocus: false,
      data: {
        id: id,
        type: type
      }
    });
  }

}

