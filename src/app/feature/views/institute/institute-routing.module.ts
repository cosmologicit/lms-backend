import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { BranchComponent } from './branch/branch.component';
import { DepartmentComponent } from './department/department.component';
import { CourseComponent } from './course/course.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { AddEditTimeTableComponent } from './add-edit-time-table/add-edit-time-table.component';
import { HolidayComponent } from './holiday/holiday.component';
import { BookDashboardComponent } from './book-dashboard/book-dashboard.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { FeesDashboardComponent } from './fees-dashboard/fees-dashboard.component';
import { AttendenceViewComponent } from './attendence-view/attendence-view.component';
import { AddEditGradeComponent } from './add-edit-grade/add-edit-grade.component';
import { GradeDahboardComponent } from './grade-dahboard/grade-dahboard.component';

const routes: Routes = [
  {
    path: 'details',
    component: DetailsComponent
  },
  {
    path: 'branch',
    component: BranchComponent
  },
  {
    path: 'department',
    component: DepartmentComponent
  },
  {
    path: 'course',
    component: CourseComponent
  },
  {
    path: 'time-table',
    component: TimeTableComponent
  },
  {
    path: 'holiday',
    component: HolidayComponent
  },
  {
    path: 'books',
    component: BookDashboardComponent
  },
  {
    path: 'attendence',
    component: AttendenceViewComponent
  },
  {
    path: 'announcement',
    component: AnnouncementComponent
  },
  {
    path: 'fees',
    component: FeesDashboardComponent
  },
  {
    path: 'grading',
    component: GradeDahboardComponent
  },
  {
    path: 'grading/add',
    component: AddEditGradeComponent
  },
  {
    path: 'grading/edit/:id',
    component: AddEditGradeComponent
  },
  {
    path: 'time-table/add',
    component: AddEditTimeTableComponent
  },
  {
    path: 'time-table/edit/:id',
    component: AddEditTimeTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstituteRoutingModule { }
