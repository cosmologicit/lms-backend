import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';
import { AddStudentComponent } from '../add-student/add-student.component';
import { ConfirmationDialogComponent } from 'src/app/feature/shared/confirmation-dialog/confirmation-dialog.component';
import { Student, Teacher } from 'src/app/core/api-models/user-model';
import { UserService } from 'src/app/core/api-services/user/user.service';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AttendenceViewComponent } from '../../institute/attendence-view/attendence-view.component';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { Association } from 'src/app/core/api-models/class-model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  toggleValue = 'table';
  filterStudentText: string = '';
  students: Array<Student> = [];
  filteredStudents: Array<Student> = [];
  displayedColumns: string[] = ['sno', 'name', 'action'];
  role: string = '';
  selectedClass: number = 0;
  classes: Array<Association> = [
    {
      id: 0,
      name:'All'
    }
  ];
  public ColumnMode = ColumnMode;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor(public dialog: MatDialog, private userService: UserService, private toastr: ToastrService, private router: Router,
    private authService:AuthenticationService,private classService:ClassService
  ) { }

  ngOnInit() {
    this.role = this.authService.role;
    const sub = this.classService.getAllClasses().subscribe(res => {
      if (res.code == 200) {
        res.data.forEach(x => {
          this.classes.push(x);
        })
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    })
    this.loadTableData();
  }

  loadTableData() {
    const sub = this.userService.getStudents().subscribe(res => {
      if (res.code == 200) {
        res.data = res.data.filter(x => x);
        this.students = res.data;
        this.filteredStudents = res.data;
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    });
  }

  filterStudents() {
    this.filteredStudents = [...this.students];

    if (this.filterStudentText?.length > 0) {
      let text = this.filterStudentText.toLowerCase();
      this.filteredStudents = this.students.filter(x =>
        (x.name && x.name.toLowerCase().includes(text)));
    } 

    if (this.selectedClass!=0) {
      this.filteredStudents = this.filteredStudents.filter(x => x.associationId && x.associationId == this.selectedClass);
    }
  }

  addStudent() {
    this.router.navigateByUrl('/app/user/student/add');
  }

  editViewStudent(id: number, isView: boolean) {
    if (isView) {
      this.router.navigateByUrl('app/user/student/view/' + id);
    } else {
      this.router.navigateByUrl('app/user/student/edit/' + id);
    }
  }


  deleteStudent(id: number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        title: 'Delete Student',
        message: 'Are you sure you want to delete the selected student?'
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        const sub = this.userService.deleteUser(id).subscribe(res => {
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

   viewAttendence(id:number,type:string) {
      let dialogRef = this.dialog.open(AttendenceViewComponent, {
        width: '95%',
        autoFocus: false,
        data: {
          id: id,
          type:type
        }
      });
    }
}
