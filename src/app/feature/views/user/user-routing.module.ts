import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ViewTeacherComponent } from './view-teacher/view-teacher.component';
import { ViewStudentComponent } from './view-student/view-student.component';

const routes: Routes = [
  {
    path: 'teacher',
    component: TeacherComponent
  },
  {
    path: 'teacher/add',
    component: AddTeacherComponent
  },
  {
    path: 'teacher/edit/:id',
    component: AddTeacherComponent
  },
  {
    path: 'teacher/view/:id',
    component: ViewTeacherComponent
  },
  {
    path: 'student/view/:id',
    component: ViewStudentComponent
  },
  {
    path: 'student',
    component: StudentComponent
  },
  {
    path: 'student/add',
    component: AddStudentComponent
  },
  {
    path: 'student/edit/:id',
    component: AddStudentComponent
  },
  {
    path: 'student/view/:id',
    component: AddStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
