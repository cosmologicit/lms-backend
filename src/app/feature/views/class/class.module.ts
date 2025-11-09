import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ClassRoutingModule } from './class-routing.module';
import { AssignmentComponent } from './assignment/assignment.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { AssignmentDetailsComponent } from './assignment-details/assignment-details.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AssociationComponent } from './association/association.component';
import { AddAssociationComponent } from './add-association/add-association.component';
import { SubjectComponent } from './subject/subject.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { ChapterComponent } from './chapter/chapter.component';
import { AddChapterComponent } from './add-chapter/add-chapter.component';
import { NotesComponent } from './notes/notes.component';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LinkStudentComponent } from './link-student/link-student.component';
import { SyllabusComponent } from './syllabus/syllabus.component';
import { AddSyllabusComponent } from './add-syllabus/add-syllabus.component';
import { MatRadioModule } from '@angular/material/radio';
import { SubmittedAssignmentListComponent } from './submitted-assignment-list/submitted-assignment-list.component';
import { AddAssignmentV2Component } from './add-assignment-v2/add-assignment-v2.component';
import { AddAssignmentQuestionComponent } from './add-assignment-question/add-assignment-question.component';
import { AddAssignmentDetailsComponent } from './add-assignment-details/add-assignment-details.component';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { ExamComponent } from './exam/exam.component';
import { AddEditExamComponent } from './add-edit-exam/add-edit-exam.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ExamNumbersComponent } from './exam-numbers/exam-numbers.component';
import { ExamResultComponent } from './exam-result/exam-result.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TestComponent } from './test/test.component';


@NgModule({
  declarations: [
    AssignmentComponent,
    AddAssignmentComponent,
    AssignmentDetailsComponent,
    AssociationComponent,
    AddAssociationComponent,
    SubjectComponent,
    AddSubjectComponent,
    ChapterComponent,
    AddChapterComponent,
    NotesComponent,
    AddNotesComponent,
    LinkStudentComponent,
    SyllabusComponent,
    AddSyllabusComponent,
    SubmittedAssignmentListComponent,
    AddAssignmentV2Component,
    AddAssignmentQuestionComponent,
    AddAssignmentDetailsComponent,
    StudentAttendanceComponent,
    ExamComponent,
    AddEditExamComponent,
    ExamNumbersComponent,
    ExamResultComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    ClassRoutingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    DragDropModule,
    MatSlideToggleModule,
    MatSelectModule,
    NgxDatatableModule,
    MatRadioModule,
    NgxMaterialTimepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatTooltipModule
  ]
})
export class ClassModule { }
