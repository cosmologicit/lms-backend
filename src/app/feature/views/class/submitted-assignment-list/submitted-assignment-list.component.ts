import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { AssignmentRemainingStudent, SubmittedAssignmentStudentList } from 'src/app/core/api-models/auth-model';
import { ClassService } from 'src/app/core/api-services/class/class.service';

@Component({
  selector: 'app-submitted-assignment-list',
  templateUrl: './submitted-assignment-list.component.html',
  styleUrls: ['./submitted-assignment-list.component.scss']
})
export class SubmittedAssignmentListComponent {
 toggleValue = 'table';
  filterStudentText: string = '';
  students: Array<SubmittedAssignmentStudentList> = [];
  filteredStudents: Array<SubmittedAssignmentStudentList> = [];
  assignmentId: number = 0;
  assignmentName: string = '';
  remainingStudent:AssignmentRemainingStudent={}
  public ColumnMode = ColumnMode;

  constructor( private classService: ClassService,private toastr:ToastrService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(parameterMap => {
      let name= parameterMap.get('name');
      let id = parameterMap.get('id');
      if (name) {
        this.assignmentName = decodeURIComponent(name);
      }
      if (id) {
        this.assignmentId = parseInt(id);
        this.loadTableData();
      }
    });
  }

  loadTableData() {
    const sub = this.classService.getSubmitAssignmentStudents(this.assignmentId).subscribe(res => {
      if (res.code == 200) {
        res.data = res.data.filter(x => x);
        this.students = res.data;
        this.filteredStudents = res.data;
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    });
    const remain = this.classService.getAssignmnetRemainingStudents(this.assignmentId).subscribe(res => {
      if (res.code == 200) {
        this.remainingStudent = res.data;
      } else {
        this.toastr.error(res.message);
      }
      remain.unsubscribe();
    })
  }

  filterStudents() {
    if (this.filterStudentText?.length > 0) {
      let text = this.filterStudentText.toLowerCase();
      this.filteredStudents = this.students.filter(x =>
        (x.name && x.name.toLowerCase().includes(text)));
    } else {
      this.filteredStudents = [...this.students];
    }
  }

}
