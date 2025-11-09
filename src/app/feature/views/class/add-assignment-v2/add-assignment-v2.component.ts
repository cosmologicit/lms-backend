import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Assignment, Association, Chapter, ExamineAssignment, QuestionRequest, SubmitAssignment } from 'src/app/core/api-models/class-model';
import { AssignmentDetailsComponent } from '../assignment-details/assignment-details.component';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { AddAssignmentQuestionComponent } from '../add-assignment-question/add-assignment-question.component';
import { AddAssignmentDetailsComponent } from '../add-assignment-details/add-assignment-details.component';
import { AssignmentModel } from 'src/app/core/api-models/assignment-model';
import { Constants } from 'src/app/core/constants/constants';
import { Subject } from 'src/app/core/api-models/class-model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-assignment-v2',
  templateUrl: './add-assignment-v2.component.html',
  styleUrls: ['./add-assignment-v2.component.scss']
})
export class AddAssignmentV2Component implements OnInit {
  assignment: AssignmentModel = { sections: [{ questions: [{ type: Constants.OBJECTIVE, options: [{ text: 'Option 1' }] }] }] };
  constants = Constants;






  assignmentDetails: Assignment = { questions: [{}] };
  data: Assignment = {};
  sendQuestions: QuestionRequest = {};
  isObjectiveActive = false;
  currentEditableIndex: number = 0;
  status: string = Constants.SUBMIT;
  submitAssignmnet: SubmitAssignment = {
    submitQuestionRequests: []
  }
  role: string = '';
  studentName: string = '';
  examineAssignmnet: ExamineAssignment = {
    questionMarks: []
  }
  canSaveQuestion = false;
  @ViewChildren(AddAssignmentQuestionComponent) questions!: QueryList<AddAssignmentQuestionComponent>;
  @ViewChildren(AddAssignmentQuestionComponent) assignmentQuestion!: AddAssignmentQuestionComponent;




  subjects: Array<Subject> = [];
  filteredSubjects: Array<Subject> = [];
  classes: Array<Association> = [];
  chapters: Array<Chapter> = [];
  filteredChapters: Array<Chapter> = [];

  constructor(private toastr: ToastrService, private classService: ClassService, private dialog: MatDialog, private router: Router,
    private route: ActivatedRoute, private authService: AuthenticationService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.role = this.authService.role;
    this.route.paramMap.subscribe(parameterMap => {
      let type = parameterMap.get('type');
      let id = parameterMap.get('id');
      if (id) {
        if (type?.toLowerCase() == Constants.EDIT.toLowerCase()) {
          if (type?.toLowerCase() == Constants.EDIT.toLowerCase()) {
            this.status = Constants.EDIT;
          } else {
            this.status = Constants.SUBMIT;
            this.submitAssignmnet.assignmentId = parseInt(id);
          }
          const sub = this.classService.getAssignmentById(parseInt(id)).subscribe(res => {
            if (res.code == 200) {
              this.assignment = res.data;
              this.getMasters();
            } else {
              this.toastr.error(res.message)
            }
            sub.unsubscribe();
          });
        } else if (type == 'view') {
          this.status = 'View';
          const sub = this.classService.getSubmittedAssignmentById(parseInt(id)).subscribe(res => {
            if (res.code == 200) {
              this.data = res.data;
              if (this.data.questions && this.data.questions[this.currentEditableIndex].type == 'OBJECTIVE') {
                this.isObjectiveActive = true;
              }
              this.data.questions?.forEach(x => {
                if (x.type == 'SUBJECTIVE' && x.userAnswerText) {
                  x.answerText = x.userAnswerText;
                } else if (x.type == 'OBJECTIVE' && x.userAnswerOptionId) {
                  x.options?.forEach(y => {
                    if (y.id == x.userAnswerOptionId) {
                      y.selectedId = x.userAnswerOptionId;
                    }
                  })
                }
              });
            } else {
              this.toastr.error(res.message)
            }
            sub.unsubscribe();
          });
        } else if (type == 'examine') {
          this.status = 'Examine';
          let studentId = parameterMap.get('studentId')!;
          this.studentName = parameterMap.get('name')!;
          this.studentName = decodeURIComponent(this.studentName);
          this.examineAssignmnet.assignmentId = parseInt(id);
          this.examineAssignmnet.studentId = parseInt(studentId);
          if (studentId) {
            const sub = this.classService.getAssignmentByStudentAndAssignmentId(parseInt(studentId), parseInt(id)).subscribe(res => {
              if (res.code == 200) {
                this.data = res.data;
                if (this.data.questions && this.data.questions[this.currentEditableIndex].type == 'OBJECTIVE') {
                  this.isObjectiveActive = true;
                }
                this.data.questions?.forEach(x => {
                  if (x.type == 'SUBJECTIVE' && x.userAnswerText) {
                    x.answerText = x.userAnswerText;
                  } else if (x.type == 'OBJECTIVE' && x.userAnswerOptionId) {
                    x.options?.forEach(y => {
                      if (y.id == x.userAnswerOptionId) {
                        y.selectedId = x.userAnswerOptionId;
                      }
                    })
                  }
                });
              } else {
                this.toastr.error(res.message)
              }
              sub.unsubscribe();
            });
          }
        }
      } else {
        this.getMasters();
      }
    });
  }

  getMasters() {
    const sub = forkJoin({
      classRes: this.classService.getAllClasses(),
      subjectRes: this.classService.getAllSubject(),
      chapterRes: this.classService.getAllChapters(),
    }).subscribe(({ classRes, subjectRes, chapterRes }) => {
      this.classes = classRes?.data ?? [];
      this.chapters = chapterRes?.data ?? [];
      this.subjects = subjectRes?.data ?? [];
      this.filterSubjects();
      this.filterChapters();
      sub.unsubscribe();
    });
  }

  addSection(sectionIdx: number) {
    if (this.assignment.sections)
      this.assignment.sections.splice(sectionIdx + 1, 0, { questions: [{ type: Constants.OBJECTIVE, options: [{ text: 'Option 1' }] }] });
  }

  addNewQuestion(sectionIdx: number, idx: number) {
    if (this.assignment?.sections)
      this.assignment.sections[sectionIdx].questions?.splice(idx + 1, 0, {});
    this.questionFocused(sectionIdx, idx + 1);
  }

  questionFocused(sectionIdx: number, idx: number) {
    if (this.assignment.sections) {
      this.assignment.sections.forEach((section, sectIdx) => {
        if (section.questions)
          section.questions.forEach((question, quesIdx) => {
            question.isFocused = sectionIdx == sectIdx && quesIdx == idx;
          });
      });

      this.assignment.sections = [...this.assignment.sections];
    }
  }

  questionDeleted(sectionIdx: number, idx: number) {
    if (this.assignment.sections && this.assignment.sections[sectionIdx]) {
      this.assignment.sections[sectionIdx].questions?.splice(idx, 1);
      this.assignment.sections = [...this.assignment.sections];
    }
  }

  filterSubjects() {
    if (!this.assignment.subjectId) {
      this.assignment.subjectId = 0;
    }
    if (this.assignment.associationId) {
      this.filteredSubjects = this.subjects.filter(x => x.associationIds != undefined && x.associationIds.length > 0 && x.associationIds?.includes(this.assignment?.associationId ?? -1));
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














  drop(event: CdkDragDrop<string[]>) {
    if (this.status == 'Add' || this.status == 'Edit') {
      moveItemInArray(this.data.questions!, event.previousIndex, event.currentIndex);
    }
  }

  toggleQuestionType() {
    if (this.isObjectiveActive && this.data.questions) {
      this.data.questions[this.currentEditableIndex].options = [{}];
      this.data.questions[this.currentEditableIndex].type = 'OBJECTIVE';
    } else {
      this.data.questions![this.currentEditableIndex].options = undefined
      this.data.questions![this.currentEditableIndex].type = 'SUBJECTIVE';
    }
  }

  addQuestion() {
    if (this.status == 'Add' || this.status == 'Edit') {
      if (this.data.questions && this.data.questions[this.currentEditableIndex].question && this.data.questions[this.currentEditableIndex].question!.length > 0) {
        if (this.data.questions && this.data.questions![this.currentEditableIndex].positiveMark == null) {
          this.toastr.error("Positive marking can't be empty");
        } else if (this.data.questions && this.data.questions![this.currentEditableIndex].positiveMark! <= 0) {
          this.toastr.error('Postive marks had to be greater than zero');
        } else {
          if (this.isObjectiveActive && this.data.questions[this.currentEditableIndex].options!.length < 2) {
            this.toastr.error('Add two option minimum');
          } else {
            if (this.currentEditableIndex == (this.data.questions.length - 1)) {
              this.data.questions?.push({
                type: 'SUBJECTIVE'
              });
              this.isObjectiveActive = false;
              this.currentEditableIndex = (this.data.questions!.length - 1);
            } else {
              this.currentEditableIndex += 1;
              if (this.data.questions![this.currentEditableIndex].type == 'OBJECTIVE') {
                this.isObjectiveActive = true;
              } else {
                this.isObjectiveActive = false;
              }
            }
          }
        }
      } else {
        this.toastr.error('Enter Question First');
      }
    } else {
      if (this.status == 'Examine') {
        if (this.data.questions![this.currentEditableIndex].obtainMarks! > this.data.questions![this.currentEditableIndex].positiveMark!) {
          this.toastr.error(`Obtained mark can't be greater than positive mark`);
          return;
        } else if (this.data.questions![this.currentEditableIndex].negativeMark != null && this.data.questions![this.currentEditableIndex].negativeMark && this.data.questions![this.currentEditableIndex].obtainMarks! < (this.data.questions![this.currentEditableIndex].negativeMark! * -1)) {
          this.toastr.error(`Obtained mark can't be less than negative mark`);
        }
      }

      if (this.currentEditableIndex == this.data.questions!.length - 1) {
        this.currentEditableIndex = 0;;
      } else {
        this.currentEditableIndex += 1
      }

      if (this.data.questions![this.currentEditableIndex].type == 'OBJECTIVE') {
        this.isObjectiveActive = true;
      } else {
        this.isObjectiveActive = false;
      }
    }
  }

  previousQuestion() {
    if (this.status == 'Examine') {
      if (this.data.questions![this.currentEditableIndex].obtainMarks! > this.data.questions![this.currentEditableIndex].positiveMark!) {
        this.toastr.error(`Obtained mark can't be greater than positive mark`);
        return;
      } else if (this.data.questions![this.currentEditableIndex].negativeMark != null && this.data.questions![this.currentEditableIndex].obtainMarks! < (this.data.questions![this.currentEditableIndex].negativeMark! * -1)) {
        this.toastr.error(`Obtained mark can't be less than negative mark`)
      }
    }
    if (this.currentEditableIndex != 0) {
      this.currentEditableIndex -= 1;
    } else {
      this.currentEditableIndex = this.data.questions!.length - 1
    }

    if (this.data.questions![this.currentEditableIndex].type == 'OBJECTIVE') {
      this.isObjectiveActive = true;
    } else {
      this.isObjectiveActive = false;
    }
  }


  editQuestion(index: number) {
    this.currentEditableIndex = index;
    if (this.data.questions![this.currentEditableIndex].type == 'OBJECTIVE') {
      this.isObjectiveActive = true;
    } else {
      this.isObjectiveActive = false;
    }
  }

  addOption() {
    let isOptionNull = false
    if (this.data.questions && this.data.questions[this.currentEditableIndex].options) {
      this.data.questions![this.currentEditableIndex].options!.forEach(x => {
        if (!x.text || x.text && x.text.length <= 0) {
          this.toastr.error("Option Can't be empty");
          isOptionNull = true;
        }
      });
    }
    if (isOptionNull == false && this.data.questions && this.data.questions[this.currentEditableIndex]) {
      this.data.questions[this.currentEditableIndex].options!.push({});
      // this.currentEditableIndex = (this.data.questions!.length - 1);
    }
  }

  removeOption(idx: number) {
    let id = this.data.questions![this.currentEditableIndex].options![idx].id;
    this.data.questions![this.currentEditableIndex].deletedOptionIds?.push(id!);
    this.data.questions![this.currentEditableIndex].options?.splice(idx, 1);
  }

  getLetterIndex(index: number): string {
    return String.fromCharCode(97 + index);
  }

  openModal() {
    if (this.data.questions && this.data.questions.length == 1 && this.data.questions[1] && this.data.questions[1].question) {
      if (this.data.questions[1].question?.length == 0) {
        this.toastr.error('Enter Question First');
        return;
      }
      if (this.data.questions[1].positiveMark == null || this.data.questions[1].positiveMark <= 0) {
        this.toastr.error("Positive marking can't be empty or equal to zero");
      }
    }
    let dialogRef = this.dialog.open(AssignmentDetailsComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        data: this.data
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        this.data.title = res.title;
        this.data.chapterId = res.chapterId;
        this.data.associationId = res.associationId;
        this.data.subjectId = res.subjectId;
        this.data.endDate = res.endDate;
        this.data.startDate = res.startDate;
        this.data.time = res.time;
        this.data.description = res.description;
        this.onSubmit();
        dialogRef.close();
      }
    });
  }

  onSubmit() {
    // for student 
    this.submitAssignmnet.submitQuestionRequests = [];
    if (this.role == 'STUDENT') {
      this.data.questions?.forEach(x => {
        this.submitAssignmnet.submitQuestionRequests?.push({
          questionId: x.id,
          answerText: x.answerText,
          answerOptionId: x.answeroptionId
        });
      });
      const sub = this.classService.submitAssignment(this.submitAssignmnet).subscribe(res => {
        if (res.code == 200) {
          this.router.navigateByUrl('app/class/assignment');
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe()
      });
      return;
    }
    // for tecaher and admin 
    if (this.status == 'Examine') {
      if (this.data.questions![this.currentEditableIndex].obtainMarks! > this.data.questions![this.currentEditableIndex].positiveMark!) {
        this.toastr.error(`Obtained mark can't be greater than positive mark`);
        return;
      } else if (this.data.questions![this.currentEditableIndex].negativeMark != null && this.data.questions![this.currentEditableIndex].obtainMarks! < (this.data.questions![this.currentEditableIndex].negativeMark! * -1)) {
        this.toastr.error(`Obtained mark can't be less than negative mark`)
        return
      }

      this.data.questions?.forEach(x => {
        this.examineAssignmnet.questionMarks!.push({
          questionId: x.id,
          marksObtained: x.obtainMarks
        });
      });

      const sub = this.classService.examineAssignment(this.examineAssignmnet).subscribe(res => {
        if (res.code == 200) {
          this.toastr.success(res.message)
          this.router.navigateByUrl('app/class/assignment/submitted/' + this.data.title + '/' + this.data.assignmentId);
          return;
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe()
      });
    } else {
      this.data.questions?.forEach((x, idx) => {
        x.order = (idx + 1)
      });
      this.data.totalPositiveMark = 0;
      this.data.totalNegativeMark = 0;
      this.data.questions?.forEach(x => {
        this.data.totalPositiveMark! += x.positiveMark!;
        this.data.totalNegativeMark! += x.negativeMark!;
      });
      if (this.status == 'Edit') {
        const sub = this.classService.updateAssignment(this.data).subscribe(res => {
          if (res.code == 200) {
            this.router.navigateByUrl('app/class/assignment');
          } else {
            this.toastr.error(res.message);
          }
          sub.unsubscribe()
        });
      } else {
        const sub = this.classService.saveAssignment(this.data).subscribe(res => {
          if (res.code == 200) {
            this.router.navigateByUrl('app/class/assignment');
          } else {
            this.toastr.error(res.message);
          }
          sub.unsubscribe()
        });
      }
    }
  }

  setOptionId(id: number) {
    this.data.questions![this.currentEditableIndex].answeroptionId = id;
  }

  saveAssignment(status: string) {
    let totalMarks = 0;
    if (this.assignment?.sections && this.assignment?.sections?.length > 0) {
      this.assignment.sections.forEach(section => {
        if (section?.questions && section?.questions?.length > 0) {
          section.questions.forEach(question => {
            totalMarks += question?.positiveMark ?? 0;
            if (question?.options && question?.options?.length > 0) {
              question.options.forEach(option => {
                option.correct = option.isCorrect;
              });
            }
          });
        }
      });
    }
    this.assignment.totalPositiveMark = totalMarks;
    this.assignment.totalMarks = totalMarks;
    this.assignment.isSubmitted = Constants.DRAFT == status;

    console.log(this.assignment);
    if (this.status == Constants.SUBMIT) {
      const sub = this.classService.saveAssignment(this.assignment).subscribe(res => {
        if (res.code == 200) {
          this.router.navigateByUrl('app/class/assignment');
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe()
      });
    } else {
      const sub = this.classService.updateAssignment(this.assignment).subscribe(res => {
        // if (res.code == 200) {
        //   this.router.navigateByUrl('app/class/assignment');
        // } else {
        //   this.toastr.error(res.message);
        // }
        sub.unsubscribe()
      });
    }


  }

}
