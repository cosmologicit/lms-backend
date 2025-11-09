import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Association, Exam, Subject } from 'src/app/core/api-models/class-model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { ConfirmationDialogComponent } from 'src/app/feature/shared/confirmation-dialog/confirmation-dialog.component';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { el } from 'date-fns/locale';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent {
  exam: Array<Exam> = [];
  filteredExam: Array<Exam> = [];
  filterExamtext: string = '';
  resultsLength = 0;
  role: string = '';
  selectedSubject: number = 0;
  selectedClass: number = 0;
  selectedChapter: number = 0;
  selectedExamType: string = 'ALL';
  subjects: Array<Association> = [
    {
      id: 0,
      name: 'All'
    }
  ];
  classes: Array<Subject> = [
    {
      id: 0,
      name: 'All'
    }
  ];
  public ColumnMode = ColumnMode;

  constructor(public dialog: MatDialog, private toastr: ToastrService, private authService: AuthenticationService,
    private classService: ClassService) { }

  ngOnInit() {
    this.role = this.authService.role;
       const cls = this.classService.getAllClasses().subscribe(res => {
      if (res.code == 200) {
        res.data.forEach(x => {
          this.classes.push(x);
        });
      } else {
        this.toastr.error(res.message);
      }
      cls.unsubscribe();
    });
    const sub = this.classService.getAllSubject().subscribe(res => {
      if (res.code == 200) {
        res.data.forEach(x => {
          this.subjects.push(x);
        });
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    }); 
    this.loadTableData();
  }

  loadTableData() {
    const sub = this.classService.getAllExam().subscribe(res => {
      if (res.code==200) {
        this.exam = res.data;
        this.filteredExam = res.data;
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    });
  }

  filterExam() {
    this.filteredExam = [...this.exam];

    if (this.filterExamtext?.length > 0) {
      let text = this.filterExamtext.toLowerCase();
      this.filteredExam = this.exam.filter(x =>
        (x.name && x.name.toLowerCase().includes(text))
      );
    }

    if (this.selectedClass != 0 && this.selectedSubject != 0 && this.selectedExamType != 'ALL') {
      this.filteredExam = this.filteredExam.filter(x => x.subjectId == this.selectedSubject && x.associationId == this.selectedClass && x.examType == this.selectedExamType);
    } else if (this.selectedClass != 0 && this.selectedClass != 0 && this.selectedExamType == 'ALL') {
      this.filteredExam = this.filteredExam.filter(x => x.associationId == this.selectedClass && x.subjectId == this.selectedSubject);
    } else if (this.selectedClass != 0 && this.selectedSubject == 0 && this.selectedExamType != 'ALL') {
      this.filteredExam = this.filteredExam.filter(x => x.associationId == this.selectedClass && x.examType == this.selectedExamType);
    } else if (this.selectedClass == 0 && this.selectedSubject != 0 && this.selectedExamType != 'ALL') {
      this.filteredExam = this.filteredExam.filter(x => x.subjectId == this.selectedSubject && x.examType == this.selectedExamType);
    } else if (this.selectedClass != 0 && this.selectedSubject == 0 && this.selectedExamType == 'ALL') {
      this.filteredExam = this.filteredExam.filter(x => x.associationId == this.selectedClass);
    } else if (this.selectedClass == 0 && this.selectedSubject != 0 && this.selectedExamType == 'ALL') {
      this.filteredExam = this.filteredExam.filter(x => x.subjectId == this.selectedSubject);
    } else if (this.selectedClass == 0 && this.selectedSubject == 0 && this.selectedExamType != 'ALL') {
      this.filteredExam = this.filteredExam.filter(x => x.examType == this.selectedExamType);
    }
  }


  deleteExam(id: number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        title: 'Delete Exam',
        message: 'Are you sure you want to delete the selected exam?'
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        const sub = this.classService.deleteExam(id).subscribe(res => {
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

  checkDate(date: string) {
    const givenDate = new Date(date);    
    let todayDate = new Date()
    todayDate.setHours(0, 0, 0, 0);
    return givenDate > todayDate;
  }

}
