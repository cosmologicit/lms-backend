import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'src/app/core/api-models/class-model';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { AddSubjectComponent } from '../add-subject/add-subject.component';
import { ConfirmationDialogComponent } from 'src/app/feature/shared/confirmation-dialog/confirmation-dialog.component';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent {
  toggleValue = 'table';
  filterTeachertext: string = '';
  subjects: Array<Subject> = [];
  filteredSubjects: Array<Subject> = [];
  public ColumnMode = ColumnMode;
  role: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor(public dialog: MatDialog, private classService: ClassService, private toastr: ToastrService,
      private authService: AuthenticationService
  ) { }

  ngOnInit() {
     this.role = this.authService.role;
    this.loadTableData();
  }

  loadTableData() {
    const sub = this.classService.getAllSubject().subscribe(res => {
      this.subjects = res.data;
      this.filteredSubjects = res.data;
      sub.unsubscribe();
    })
  }

  filterSubjects() {
    if (this.filterTeachertext?.length > 0) {
      let text = this.filterTeachertext.toLowerCase();
      this.filteredSubjects = this.subjects.filter(x =>
        (x.name && x.name.toLowerCase().includes(text)));
    } else {
      this.filteredSubjects = [...this.subjects];
    }
  }

  openAddSubject() {
    let dialogRef = this.dialog.open(AddSubjectComponent, {
      width: '50%',
      autoFocus: false,
      data: {}
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        this.loadTableData();
      }
    });
  }

  editSubject(id: number) {
    let dialogRef = this.dialog.open(AddSubjectComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        id: id
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        this.loadTableData();
      }
    });
  }

  deleteSubject(id: number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        title: 'Delete Subject',
        message: 'Are you sure you want to delete the selected subject?'
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        const sub = this.classService.deleteSubject(id).subscribe(res => {
          if (res.code == 200) {
            this.toastr.success(res.message);
            this.loadTableData();
          } else {
            this.toastr.error(res.message);
          }
          sub.unsubscribe();
        });
      }
    });
  }
}
