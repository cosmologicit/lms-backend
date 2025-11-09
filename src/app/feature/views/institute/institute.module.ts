import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstituteRoutingModule } from './institute-routing.module';
import { DetailsComponent } from './details/details.component';
import { BranchComponent } from './branch/branch.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DepartmentComponent } from './department/department.component';
import { CourseComponent } from './course/course.component';
import { BranchMappingModalComponent } from './branch-mapping-modal/branch-mapping-modal.component';
import { AddDepartmentCourseTemplateComponent } from './add-department-course-template/add-department-course-template.component';
import { MatSelectModule } from '@angular/material/select';
import { AddDepartmentCourseTemplateV2Component } from './add-department-course-template-v2/add-department-course-template-v2.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { AddEditTimeTableComponent } from './add-edit-time-table/add-edit-time-table.component';
import {MatTabsModule} from '@angular/material/tabs';
import { HolidayComponent } from './holiday/holiday.component';
import { AddHolidayComponent } from './add-holiday/add-holiday.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BookDashboardComponent } from './book-dashboard/book-dashboard.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { FeesDashboardComponent } from './fees-dashboard/fees-dashboard.component';
import { AddFeesComponent } from './add-fees/add-fees.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AttendenceViewComponent } from './attendence-view/attendence-view.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AttendenceDetailsComponent } from './attendence-details/attendence-details.component';
import { GradeDahboardComponent } from './grade-dahboard/grade-dahboard.component';
import { AddEditGradeComponent } from './add-edit-grade/add-edit-grade.component';

@NgModule({
  declarations: [
    DetailsComponent,
    BranchComponent,
    AddBranchComponent,
    DepartmentComponent,
    CourseComponent,
    BranchMappingModalComponent,
    AddDepartmentCourseTemplateComponent,
    AddDepartmentCourseTemplateV2Component,
    TimeTableComponent,
    AddEditTimeTableComponent,
    HolidayComponent,
    AddHolidayComponent,
    BookDashboardComponent,
    AddBookComponent,
    AnnouncementComponent,
    AddAnnouncementComponent,
    FeesDashboardComponent,
    AddFeesComponent,
    AttendenceViewComponent,
    AttendenceDetailsComponent,
    GradeDahboardComponent,
    AddEditGradeComponent,
    
  ],
  imports: [
    CommonModule,
    InstituteRoutingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
     NgxDatatableModule,
    MatTabsModule,
    NgSelectModule,
    NgxMaterialTimepickerModule,
     CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [
    AttendenceViewComponent
  ]
})
export class InstituteModule { }
