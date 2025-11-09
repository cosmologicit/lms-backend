import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { ExamNumbers, SubmitExamNumbers } from 'src/app/core/api-models/class-model';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-exam-numbers',
  templateUrl: './exam-numbers.component.html',
  styleUrls: ['./exam-numbers.component.scss']
})
export class ExamNumbersComponent {
  students: Array<ExamNumbers> = [];
  filteredStudents: Array<ExamNumbers> = [];
  filterExamtext: string = '';
  resultsLength = 0;
  role: string = '';
  examName: string = '';
  submitExamsNumbers: SubmitExamNumbers = {
    examResults: []
  };
  public ColumnMode = ColumnMode;

  constructor(private toastr: ToastrService, private authService: AuthenticationService,private route:ActivatedRoute,
    private classService: ClassService) { }

  ngOnInit() {
    this.role = this.authService.role;
    this.route.paramMap.subscribe(parameterMap => {
      this.examName = parameterMap.get('name')!;
      let id = parameterMap.get('id');
      let associationId = parameterMap.get('classId');
      let date = parameterMap.get('date');
      if (id) {
        this.submitExamsNumbers.examScheduleId = parseInt(id);
        const sub = this.classService.getSubmittedExams(parseInt(id)).subscribe(res => {
          if (res.code == 200) {
            this.students = res.data;
            this.filteredStudents = res.data;
            let getAttendance = false;
            this.students.forEach(x => {
              if (x.attendanceStatus) {
                getAttendance = true;
              }
            })
            
            if (!getAttendance) {
              this.getStudentsAttendance(parseInt(associationId!),date!);
            }
          } else {
            this.toastr.error(res.message); 
          }
          sub.unsubscribe();
        });
      }
    })
  }

  getStudentsAttendance(associationId:number,date:string) {
      const attendance = this.classService.getAttendanceByClassAndDate(associationId, date).subscribe(res => {
        if (res.code == 200) {
          let attendanceData = res.data;
          if (attendanceData.attendance) {
            attendanceData.studentAttendanceResponseList?.forEach(x => {
              let student = this.students.find(s => s.studentId === x.studentDetailId);
              if (student && x.status && x.status !== 'HOLIDAY') {
                student.attendanceStatus = x.status;
              }
            });
          }
        } else {
          this.toastr.error(res.message);
        }
        attendance.unsubscribe();
      });
  }

  filterExam() {
    if (this.filterExamtext?.length > 0) {
      let text = this.filterExamtext.toLowerCase();
      this.filteredStudents = this.students.filter(x =>
        (x.studentName && x.studentName.toLowerCase().includes(text))
      );
      } else {
      this.students = [...this.students];
    }
  }

  setMarksAndAttendance(index:number,type:string) {
    if (this.filteredStudents[index].attendanceStatus && this.filteredStudents[index].attendanceStatus!='PRESENT' && type=='Attendance') {
      this.filteredStudents[index].marks = undefined;
    }
    if (this.filteredStudents[index].marks && type=='Marks') {
      this.filteredStudents[index].attendanceStatus = 'PRESENT';
    } 
  }

  onSubmit() {
    this.students.forEach(x => {
      if (x.marks) {
        this.submitExamsNumbers.examResults!.push({
          userId: x.studentId,
          attendanceStatus: x.attendanceStatus,
          comment: x.comments,
          marks: x.marks
        });
      }
    });
    const sub = this.classService.submitExamNumbers(this.submitExamsNumbers).subscribe(res => {
      if (res.code == 200) {
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    })
  }

}
