import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Question } from 'src/app/core/api-models/assignment-model';
import { Constants } from 'src/app/core/constants/constants';

@Component({
  selector: 'app-add-assignment-question',
  templateUrl: './add-assignment-question.component.html',
  styleUrls: ['./add-assignment-question.component.scss']
})
export class AddAssignmentQuestionComponent {
  @Input() question: Question = {};
  @Output() questionFocused = new EventEmitter<any>();
  @Output() questionDeleted = new EventEmitter<any>();
  constants = Constants;

  constructor() { }

  addOption() {
    if (this.question?.options && this.question?.options?.length >= 0) {
      this.question.options.push({ text: `Option ${this.question.options.length + 1}` });
    } else {
      this.question.options = [{ text: `Option 1` }];
    }
  }

  deleteOption(optionIdx: number) {
    this.question.options?.splice(optionIdx, 1);
  }

  deleteQuestion() {
    this.questionDeleted.emit();
  }

  clearData() {
    // this.questionRequest = {};
  }

  focusQuestion() {
    if (this.question.isFocused != true) {
      this.questionFocused.emit();
    }
  }
}
