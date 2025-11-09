import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Association, Subject, Syllabus } from 'src/app/core/api-models/class-model';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { AppStateService } from 'src/app/core/services/app-state/app.state.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { AddSyllabusComponent } from '../add-syllabus/add-syllabus.component';
import { ConfirmationDialogComponent } from 'src/app/feature/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-syllabus',
  templateUrl: './syllabus.component.html',
  styleUrls: ['./syllabus.component.scss']
})
export class SyllabusComponent {
 toggleValue = 'table';
  filterChapterText: string = '';
  syllabus: Array<Syllabus> = [];
  filteredSyllabus: Array<Syllabus> = [];
  role: string = '';
  selectedSubject: number = 0;
  selectedClass: number = 0;
  subjects: Array<Subject> = [
    {
      id: 0,
      name:'All'
    }
  ];
  classes: Array<Association> = [
    {
      id: 0,
      name:'All'
    }
  ];
  public ColumnMode = ColumnMode;

  constructor(public dialog: MatDialog, private classService: ClassService, private toastr: ToastrService,
    private appStateService: AppStateService,private authService: AuthenticationService) { }

  ngOnInit() {
    this.role = this.authService.role;
    const sub = this.classService.getAllSubject().subscribe(res => {
      if (res.code == 200) {
        res.data.forEach(x => {
          this.subjects.push(x);
        })
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    });

    const cls = this.classService.getAllClasses().subscribe(res => {
      if (res.code == 200) {
        res.data.forEach(x => {
          this.classes.push(x);
        })
      } else {
        this.toastr.error(res.message);
      }
      cls.unsubscribe();
    });
    this.loadTableData();
  }

  loadTableData() {
    const sub = this.classService.getAllSyllabus().subscribe(res => {
      if (res.code == 200) {
        this.syllabus = res.data;
        this.filteredSyllabus = this.syllabus;
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    })
  }

  filterSyllabus() {
    this.filteredSyllabus = [...this.syllabus];

    if (this.filterChapterText?.length > 0) {
      let text = this.filterChapterText.toLowerCase();
      this.filteredSyllabus = this.syllabus.filter(x =>
        (x.name && x.name.toLowerCase().includes(text)));
    }

    if (this.selectedSubject && this.selectedSubject != 0 && this.selectedClass && this.selectedClass != 0) {
      this.filteredSyllabus = this.filteredSyllabus.filter(x => (x.subjectId && x.subjectId == this.selectedSubject && x.associationId == this.selectedClass));
    } else if (this.selectedSubject && this.selectedSubject != 0 && this.selectedClass == 0) {
      this.filteredSyllabus = this.filteredSyllabus.filter(x => (x.subjectId && x.subjectId == this.selectedSubject));
    } else if (this.selectedSubject == 0 && this.selectedClass && this.selectedClass != 0) {
      this.filteredSyllabus = this.filteredSyllabus.filter(x => (x.associationId == this.selectedClass));
    }
  }

  openAddSyllabus() {
    let dialogRef = this.dialog.open(AddSyllabusComponent, {
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

  editSyllabus(id: number) {
    let dialogRef = this.dialog.open(AddSyllabusComponent, {
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

  deleteSyllabus(id: number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        title: 'Delete Syllabus',
        message: 'Are you sure you want to delete the selected syllabus?'
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        const sub = this.classService.deleteSyllabus(id).subscribe(res => {
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
