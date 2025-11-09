import { Component, OnInit, ViewChild } from '@angular/core';
import { AddNotesComponent } from '../add-notes/add-notes.component';
import { MatDialog } from '@angular/material/dialog';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { Association, Notes, Subject } from 'src/app/core/api-models/class-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/feature/shared/confirmation-dialog/confirmation-dialog.component';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  toggleValue = 'table';
  filterNotestext: string = '';
  notes: Array<Notes> = [];
  filteredNotes: Array<Notes> = [];
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


  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor(public dialog: MatDialog,private classService:ClassService,private toastr:ToastrService,private authService: AuthenticationService) { }
  
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
    const sub = this.classService.getAllNotes().subscribe(res => {
      if (res.code == 200) {
        this.notes = res.data;
        this.filteredNotes = res.data;
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  openAddNotes() {
    let dialogRef = this.dialog.open(AddNotesComponent, {
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

  editViewNotes(id:number,type:string) {
    let dialogRef = this.dialog.open(AddNotesComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        id: id,
        type:type
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      this.loadTableData();
    })
  }


  deleteNotes(id:number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        title: 'Delete Notes',
        message: 'Are you sure you want to delete the selected notes?'
      }
    });
     dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        const sub = this.classService.deleteNotes(id).subscribe(res => {
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

  filterNotes() {
    this.filteredNotes = [...this.notes];

    if (this.filterNotestext?.length > 0) {
      let text = this.filterNotestext.toLowerCase();
      this.filteredNotes = this.notes.filter(x =>
        (x.title && x.title.toLowerCase().includes(text)));
    } 

    if (this.selectedSubject && this.selectedSubject != 0 && this.selectedClass && this.selectedClass != 0) {
      this.filteredNotes = this.filteredNotes.filter(x => (x.subjectId && x.subjectId == this.selectedSubject && x.associationId == this.selectedClass));
    } else if (this.selectedSubject && this.selectedSubject != 0 && this.selectedClass == 0) {
      this.filteredNotes = this.filteredNotes.filter(x => (x.subjectId && x.subjectId == this.selectedSubject));
    } else if (this.selectedSubject == 0 && this.selectedClass && this.selectedClass != 0) {
      this.filteredNotes = this.filteredNotes.filter(x => (x.associationId == this.selectedClass));
    }
    
  }
}
