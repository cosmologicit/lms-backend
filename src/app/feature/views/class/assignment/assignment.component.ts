import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AddTeacherComponent } from '../../user/add-teacher/add-teacher.component';
import { ConfirmationDialogComponent } from 'src/app/feature/shared/confirmation-dialog/confirmation-dialog.component';
import { AddStudentComponent } from '../../user/add-student/add-student.component';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { Assignment, Association, Subject } from 'src/app/core/api-models/class-model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent {
  toggleValue = 'table';
  filterAssignmentText: string = '';
  assignments: Array<Assignment> = [];
  filteredAssignments: Array<Assignment> = [];
  role: string = '';
  selectedSubject: number = 0;
  selectedClass: number = 0;
  subjects: Array<Association> = [
    {
      id: 0,
      name:'All'
    }
  ];
  classes: Array<Subject> = [
    {
      id: 0,
      name:'All'
    }
  ];
  public ColumnMode = ColumnMode;


  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor(public dialog: MatDialog, private classService: ClassService, private toastr: ToastrService,
    private authService: AuthenticationService) { }

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
    const sub = this.classService.getAllAssignment().subscribe(res => {
      if (res.code == 200) {
        this.assignments = res.data;
        this.filteredAssignments = res.data;
      } else {
        this.toastr.error(res.message);
      }
    })
  }

  filterAssignment() {
    this.filteredAssignments = [...this.assignments];

    if (this.filterAssignmentText?.length > 0) {
      let text = this.filterAssignmentText.toLowerCase();
      this.filteredAssignments = this.assignments.filter(x =>
        (x.title && x.title.toLowerCase().includes(text)));
    } 

    
    if (this.selectedSubject && this.selectedSubject != 0 && this.selectedClass && this.selectedClass != 0) {
      this.filteredAssignments = this.filteredAssignments.filter(x => (x.subjectId && x.subjectId == this.selectedSubject && x.associationId == this.selectedClass));
    } else if (this.selectedSubject && this.selectedSubject != 0 && this.selectedClass == 0) {
      this.filteredAssignments = this.filteredAssignments.filter(x => (x.subjectId && x.subjectId == this.selectedSubject));
    } else if (this.selectedSubject == 0 && this.selectedClass && this.selectedClass != 0) {
      this.filteredAssignments = this.filteredAssignments.filter(x => (x.associationId == this.selectedClass));
    }
  }

  deleteAssignment(id: number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        title: 'Delete Assignement',
        message: 'Are you sure you want to delete the selected assignment?'
      }
    });
     dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        const sub = this.classService.deleteAssignment(id).subscribe(res => {
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
