import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Association } from 'src/app/core/api-models/class-model';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { ConfirmationDialogComponent } from 'src/app/feature/shared/confirmation-dialog/confirmation-dialog.component';
import { AddAssociationComponent } from '../add-association/add-association.component';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { LinkStudentComponent } from '../link-student/link-student.component';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { AttendenceModalComponent } from 'src/app/feature/shared/attendence-modal/attendence-modal.component';
import { GeneralService } from 'src/app/core/api-services/common/general.service';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.scss']
})
export class AssociationComponent {
  toggleValue = 'table';
  filterAssociationText: string = '';
  associations: Array<Association> = [];
  filteredAssociations: Array<Association> = [];
  role: string = '';
  canTakeAttendance: boolean = false;
  public ColumnMode = ColumnMode;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor(public dialog: MatDialog, private classService: ClassService, private toastr: ToastrService,
    private authService:AuthenticationService,private generalService:GeneralService) { }

  ngOnInit() {
    this.role = this.authService.role;
    if (this.role == 'TEACHER') {
       const sub = this.generalService.getAttendanceLastStatus().subscribe(res => {
        if (res.code == 200) {
          if (res.data.length > 0) {
            this.canTakeAttendance = true;
          }
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    }
    this.loadTableData();
  }

  loadTableData() {
    const sub = this.classService.getAllClasses().subscribe(res => {
      if (res.code == 200) {
        this.associations = res.data;
        this.filteredAssociations = this.associations;
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    })
  }

  filterAssociation() {
    if (this.filterAssociationText?.length > 0) {
      let text = this.filterAssociationText.toLowerCase();
      this.filteredAssociations = this.associations.filter(x =>
        (x.name && x.name.toLowerCase().includes(text)));
    } else {
      this.filteredAssociations = [...this.associations];
      
    }
  }

  openAddClass() {
    let dialogRef = this.dialog.open(AddAssociationComponent, {
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

  editClass(id: number) {
    let dialogRef = this.dialog.open(AddAssociationComponent, {
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

  deleteClass(id: number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        title: 'Delete Class',
        message: 'Are you sure you want to delete the selected Class?'
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        const sub = this.classService.deleteClass(id).subscribe(res => {
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

  attendence(id: number) {
    let dialogRef = this.dialog.open(AttendenceModalComponent, {
      width: '80%',
      autoFocus: false,
      data: {
        id:id
      }
    });
  }

  linkUnlinkStudents(id:number) {
     let dialogRef = this.dialog.open(LinkStudentComponent, {
      width: '90%',
      autoFocus: false,
       data: { 
         id: id,
      }
    });
  }
}
