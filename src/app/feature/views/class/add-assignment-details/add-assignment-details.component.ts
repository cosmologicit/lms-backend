import { Component, ViewChild } from '@angular/core';
import { Assignment, Association, Chapter, Subject } from 'src/app/core/api-models/class-model';

@Component({
  selector: 'app-add-assignment-details',
  templateUrl: './add-assignment-details.component.html',
  styleUrls: ['./add-assignment-details.component.scss']
})
export class AddAssignmentDetailsComponent {
  isAssignmentFormVisible = true;
  assignment: Assignment = {};
  subjects: Array<Subject> = [];
  filteredSubjects: Array<Subject> = [];
  classes: Array<Association> = [];
  chapters: Array<Chapter> = [];
  filteredChapters: Array<Chapter> = [];
  @ViewChild('assignmentForm') assignmentForm?: any;

  constructor() { }

  filterSubjects(isFirst?: string) {
    if (!this.assignment.subjectId) {
      this.assignment.subjectId = 0;
    }
    if (this.assignment.associationId) {
      this.filteredSubjects = this.subjects.filter(x => x.associationIds != undefined && x.associationIds.length > 0 && x.associationIds?.findIndex(y => y == this.assignment.associationId) > -1);
    } else {
      this.filteredSubjects = [];
    }
  }

  filterChapters() {
    if (!this.assignment.chapterId) {
      this.assignment.chapterId = 0;
    }
    if (this.assignment.associationId && this.assignment.subjectId) {
      this.filteredChapters = this.chapters.filter(x => x.subjectId == this.assignment.subjectId && x.associationId == this.assignment.associationId);
    } else {
      this.filteredChapters = [];
    }
  }

  onSubmit() {
    if (this.isAssignmentFormVisible) {
      this.assignmentForm.control.markAllAsTouched();
    }
    if (!this.assignmentForm.form.valid)
      return;

    return this.assignment;
  }

}
