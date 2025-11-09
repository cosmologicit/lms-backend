import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { TeacherComponent } from './teacher/teacher.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { StudentComponent } from './student/student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { InstituteModule } from '../institute/institute.module';
import { ViewTeacherComponent } from './view-teacher/view-teacher.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '../../shared/shared.module';
import { ViewStudentComponent } from './view-student/view-student.component';
import { SetPasswordComponent } from './set-password/set-password.component';


@NgModule({
  declarations: [
    AddTeacherComponent,
    StudentComponent,
    AddStudentComponent,
    ViewTeacherComponent,
    ViewStudentComponent,
    SetPasswordComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    NgxDatatableModule,
    RouterModule,
    InstituteModule,
    MatTabsModule,
    SharedModule,
  ]
})
export class UserModule { }
