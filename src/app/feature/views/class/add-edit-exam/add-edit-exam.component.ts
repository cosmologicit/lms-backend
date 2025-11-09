import { Component, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { fi } from 'date-fns/locale';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Association, Exam, Subject } from 'src/app/core/api-models/class-model';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-add-edit-exam',
  templateUrl: './add-edit-exam.component.html',
  styleUrls: ['./add-edit-exam.component.scss']
})
export class AddEditExamComponent {
 data: Exam = {};
  status: string = 'Add';
  isExamFormVisible: boolean = true;
  startTime: string = '';
  endTime: string = '';
  classes: Array<Association> = [];
  subjects: Array<Subject> = [];
  filteredSubjects: Array<Subject> = [];
  todayDate: any;

  @ViewChild('examForm') examForm?: any;
  @Output() confirmed = new EventEmitter<boolean>();
  constructor(private classService: ClassService, private toastr: ToastrService, private authService: AuthenticationService,
    private router:Router,   private route: ActivatedRoute
  ) { }
  
  ngOnInit() {
    const date = new Date();
    this.todayDate = date.toISOString().split('T')[0];
    this.startTime = this.authService.startTime;
    this.endTime = this.authService.endTime;

    const subs = forkJoin({
      cls: this.classService.getAllClasses(),
      sub: this.classService.getAllSubject()
    }).subscribe(({ cls, sub }) => {
      if (cls.code == 200) {
        this.classes = cls.data;
      } else {
        this.toastr.error(cls.message);
      }
    
      if (sub.code == 200) {
        this.subjects = sub.data;
      } else {
        this.toastr.error(sub.message);
      }
    
      this.loadData();
      subs.unsubscribe();
    });
  }

  close() {
    this.router.navigateByUrl('/app/class/exam');
  }

  loadData() {
    this.route.paramMap.subscribe(parameterMap => {
      let id = parameterMap.get('id');
      
      if (id) {
        this.status = 'Edit';
        const sub = this.classService.getExamById(parseInt(id)).subscribe(res => {
          if (res.code == 200) {
            this.data = res.data;
            this.filterSubjects();
          } else {
            this.toastr.error(res.message);
          }
          sub.unsubscribe();
        });
      }
    });
  }


  onSubmit() {
    if (this.isExamFormVisible) {
      this.examForm.control.markAllAsTouched();
    }

    if (!this.examForm.form.valid) {
      return
    }
    if (this.data.id) {
      const sub = this.classService.updateExam(this.data).subscribe(res => {
        if (res.code == 200) {
          this.toastr.success(res.message);
          this.confirmed.emit(true);
          this.close();
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    } else {
      const sub = this.classService.saveExam(this.data).subscribe(res => {
        if (res.code == 200) {
          this.toastr.success(res.message);
          this.confirmed.emit(true);
          this.close();
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    }
  }

  setMarks() {
    if(this.data.maxMarks && this.data.passingMarks && this.data.passingMarks>this.data.maxMarks){
      this.data.passingMarks = undefined;
    }
  }

  filterSubjects() {
    if (this.data.associationId) {
      this.filteredSubjects = this.subjects.filter(x => x.associationIds != undefined && x.associationIds.length > 0 && x.associationIds?.findIndex(y => y == this.data.associationId) > -1);
    } else {
      this.filteredSubjects = [];
      this.toastr.error('There is no subject linked with this class');
    }
  }
}
