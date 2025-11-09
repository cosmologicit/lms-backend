import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Grading } from 'src/app/core/api-models/institute-model';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { AddEditGradeComponent } from '../add-edit-grade/add-edit-grade.component';
import { ConfirmationDialogComponent } from 'src/app/feature/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-grade-dahboard',
  templateUrl: './grade-dahboard.component.html',
  styleUrls: ['./grade-dahboard.component.scss']
})
export class GradeDahboardComponent {
  toggleValue = 'table';
  grades: Array<Grading> = [];
  filteredGrades: Array<Grading> = [];
  filterExamtext: string = '';
  resultsLength = 0;
  role: string = '';
  selectedClass:number=0
  public ColumnMode = ColumnMode;

  constructor(public dialog: MatDialog, private toastr: ToastrService, private authService: AuthenticationService,
    private classService: ClassService,private instituteService:InstituteService) { }

  ngOnInit() {
    this.role = this.authService.role;
    this.loadTableData();
  }

  loadTableData() {
    const sub = this.instituteService.getGrades().subscribe(res => {
      if (res.code==200) {
        this.grades = res.data;
        this.filteredGrades = res.data;
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    });
  }

  filterFees() {
    if (this.filterExamtext?.length > 0) {
      let text = this.filterExamtext.toLowerCase();
      this.filteredGrades = this.grades.filter(x =>
        (x.name && x.name.toLowerCase().includes(text))
      );
      } else {
      this.filteredGrades = [...this.grades];
    }
  }

  addGrade() {
    let dialogRef = this.dialog.open(AddEditGradeComponent, {
      width: '60%',
      autoFocus: false,
      data: {}
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        this.loadTableData();
      }
    });
  }

  editGrade(id: number) {
    let dialogRef = this.dialog.open(AddEditGradeComponent, {
      width: '60%',
      autoFocus: false,
      data: {
        id:id
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        this.loadTableData();
      }
    });
  }


  deleteGrade(id: number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        title: 'Delete Grade',
        message: 'Are you sure you want to delete the selected grade?'
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        const sub = this.instituteService.deleteGrade(id).subscribe(res => {
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

  toggleStatus(id:number) {
    
  }

}
