import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentComponent } from './assignment/assignment.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AssociationComponent } from './association/association.component';
import { AddAssociationComponent } from './add-association/add-association.component';
import { SubjectComponent } from './subject/subject.component';
import { NotesComponent } from './notes/notes.component';
import { ChapterComponent } from './chapter/chapter.component';
import { SyllabusComponent } from './syllabus/syllabus.component';
import { SubmittedAssignmentListComponent } from './submitted-assignment-list/submitted-assignment-list.component';
import { AddAssignmentV2Component } from './add-assignment-v2/add-assignment-v2.component';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { ExamComponent } from './exam/exam.component';
import { AddEditExamComponent } from './add-edit-exam/add-edit-exam.component';
import { ExamNumbersComponent } from './exam-numbers/exam-numbers.component';
import { ExamResultComponent } from './exam-result/exam-result.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: 'assignment',
    component: AssignmentComponent
  },
  {
    path: 'assignment/submitted/:name/:id',
    component: SubmittedAssignmentListComponent
  },
  {
    path: 'assignment/add',
    component: AddAssignmentComponent
  },
  {
    path: 'assignment-v2/add',
    component: AddAssignmentV2Component
  },
  {
    path: 'assignment-v2/:type/:id',
    component: AddAssignmentV2Component
  },
  {
    path: 'assignment/:type/:id',
    component: AddAssignmentComponent
  },
  {
    path: 'assignment/:type/:id/:studentId/:name',
    component: AddAssignmentComponent
  },
  {
    path: 'association',
    component: AssociationComponent
  },
  {
    path: 'subject',
    component: SubjectComponent
  },
  {
    path: 'syllabus',
    component: SyllabusComponent
  },
  {
    path: 'notes',
    component: NotesComponent
  },
  {
    path: 'chapter',
    component: ChapterComponent
  },
  {
    path: 'student-attendance',
    component: StudentAttendanceComponent
  },
  {
    path: 'exam',
    component: ExamComponent
  },
  {
    path: 'exam-result',
    component: ExamResultComponent
  },
  {
    path: 'exam/add',
    component: AddEditExamComponent
  },
  {
    path: 'exam/edit/:id',
    component: AddEditExamComponent
  },
  {
    path: 'exam/check/:name/:id/:classId/:date',
    component: ExamNumbersComponent
  },
  {
    path: 'test',
    component: TestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }
