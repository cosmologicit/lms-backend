import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { AddNotes, Association, Chapter, GetNotesById, Subject } from 'src/app/core/api-models/class-model';
import { AppBaseService } from 'src/app/core/api-services/base/base-service';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit  {
  data: AddNotes = {};
  status: string = 'Add';
  selectedFiles: any[] =[];
  classes: Array<Association> = [];
  subjects: Array<Subject> = [];
  filteredSubjects: Array<Subject> = [];
  chapters: Array<Chapter> = [];
  filteredChapters: Array<Chapter> = [];
  isNotesFormVisible = true;
  getNotes: GetNotesById = {};
  deleteFilesId: any = [];
  st: any;

  @ViewChild('notesForm') notesForm?: any;
  @Output() confirmed = new EventEmitter<boolean>();
  constructor(public dialogRef: MatDialogRef<AddNotesComponent>, @Inject(MAT_DIALOG_DATA) public details: { id: number,type:string },
    private clasService: ClassService, private toastr: ToastrService, private httpClient: HttpClient) {
     }
  
  ngOnInit() {
    const subs = forkJoin({
      cls: this.clasService.getAllClasses(),
      sub: this.clasService.getAllSubject(),
      chap: this.clasService.getAllChapters(),
    }).subscribe(({ cls, sub, chap }) => {
      if (cls.code == 200) {
        this.classes = cls.data;
      } else {
        this.toastr.error(cls.message)
      }

      if (sub.code == 200) {
        this.subjects = sub.data;
      } else {
        this.toastr.error(sub.message)
      }

      if (chap.code == 200) {
        this.chapters = chap.data;
      } else {
        this.toastr.error(chap.message)
      }
      this.loadData();
      subs.unsubscribe();
    });
  }

  loadData() {
    if (this.details.id) {
      this.status = this.details.type;
       const sub = this.clasService.getNotesById(this.details.id).subscribe(res => {
         if (res.code == 200) {
           this.getNotes = res.data;
           this.data.chapterId = this.getNotes.chapterId;
           this.data.associationId = this.getNotes.associationId;
           this.data.description = this.getNotes.description;
           this.data.subjectId = this.getNotes.subjectId;
           this.data.title = this.getNotes.title;
           this.filterSubjects();
           this.filterChapters();
         } else {
           this.toastr.error(res.message);
         }
       });
    } 
  }

  close() {
    this.dialogRef.close();
  }

  chooseFiles() {
    document.getElementById('file')?.click();
  }

  selectFiles(e: any) {
    if (e.target.files.length > 0) {
      const files: File[] = Array.from(e.target.files);
      this.selectedFiles = [...this.selectedFiles, ...files];      
      this.selectedFiles.forEach(x => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          x.src= event.target.result
        }
        reader.readAsDataURL(x);
      })
    }
  }

  openFile(file: File): void {
     const viewableFileTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'text/plain'
    ];

    if (viewableFileTypes.includes(file.type)) {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } else {
      alert('This file type cannot be opened in a new tab. It will be downloaded.');
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    }
  }

  openGetFile(url: string) {
     window.open(url, '_blank');
  }

  removeFile(index:number) {
    this.selectedFiles.splice(index, 1);
  }

  removeGetFile(id:number,index:number) {
    if (id) {
      this.deleteFilesId.push(id);
      this.getNotes.files?.splice(index, 1);
    }
  }

  onSubmit() {    
    if (this.isNotesFormVisible) {
      this.notesForm.control.markAllAsTouched();
    }
    if (!this.notesForm.form.valid)
      return;

    this.clasService.processing(true);
    const formData = new FormData();
    formData.append('associationId', this.data.associationId ? this.data.associationId.toString() : '-1');
    formData.append('subjectId', this.data.subjectId ? this.data.subjectId.toString() : '-1');
    formData.append('chapterId', this.data.chapterId ? this.data.chapterId.toString() : '-1');
    formData.append('title', this.data.title ? this.data.title : '');
    formData.append('description', this.data.description ? this.data.description : '');
    this.selectedFiles.forEach((file, idx) => {
      formData.append(`files`, file);
    });
    if (this.getNotes.id) {
      formData.append('filesToDelete', this.deleteFilesId ? this.deleteFilesId : []);
      this.httpClient.put(`${environment.lmsEndPoint}notes/update?id=${this.details.id}`, formData).subscribe((res: any) => {
        if (res.code == 200) {
          this.toastr.success(res.message);
          this.close();
          this.confirmed.emit(true);
        } else {
          this.toastr.error(res.message);
        }
        this.clasService.processing(false);
      });
    } else {
      if (this.selectedFiles.length == 0) {
        this.toastr.error('Add Notes First');
        this.clasService.processing(false);
        return;
      }
      this.httpClient.post(`${environment.lmsEndPoint}notes/upload`, formData).subscribe((res: any) => {
        if (res.code == 200) {
          this.toastr.success(res.message);
          this.close();
          this.confirmed.emit(true);
        } else {
          this.toastr.error(res.message);
        }
        this.clasService.processing(false);
      });
    }
  }

  filterSubjects() {
    if (!this.details.id) {
      this.data.subjectId = 0
    }
    if (this.data.associationId) {
      this.filteredSubjects = this.subjects.filter(x => x.associationIds != undefined && x.associationIds.length > 0 && x.associationIds?.findIndex(y => y == this.data.associationId) > -1);
    } else {
      this.filteredSubjects = [];
    }
  }

  filterChapters() {
    if (!this.details.id) {
      this.data.chapterId = -1;
    }
    if (this.data.associationId && this.data.subjectId) {
      this.filteredChapters = this.chapters.filter(x => x.subjectId == this.data.subjectId && x.associationId == this.data.associationId);      
    } else {
      this.filteredChapters = [];
    }
  }
}
