import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Books } from 'src/app/core/api-models/institute-model';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  status: string = 'Add';
  data: Books = {};
  isBookFormVisible = true;

  @ViewChild('bookForm') bookForm?: any;
  @Output() confirmed = new EventEmitter<boolean>();
  constructor(public dialogRef: MatDialogRef<AddBookComponent>, @Inject(MAT_DIALOG_DATA) public details: { id: number },
  private instituteService:InstituteService,private toastr:ToastrService) { }
  
  ngOnInit(){
    if (this.details.id) {
      const sub = this.instituteService.getBookDetailById(this.details.id).subscribe(res => {
        if (res.code == 200) {
          this.data = res.data;
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      })
    }
  }

  onSubmit() {
    if (this.isBookFormVisible) {
      this.bookForm.control.markAllAsTouched();
    }
    if (!this.bookForm.form.valid)
      return;

    if (this.details.id) {
      const sub = this.instituteService.upadteBook(this.data).subscribe(res => {
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
      const sub = this.instituteService.saveBook(this.data).subscribe(res => {
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

  close() {
    this.dialogRef.close();
  }

}
