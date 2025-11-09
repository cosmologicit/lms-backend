import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Books } from 'src/app/core/api-models/institute-model';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';
import { ConfirmationDialogComponent } from 'src/app/feature/shared/confirmation-dialog/confirmation-dialog.component';
import { AddBookComponent } from '../add-book/add-book.component';

@Component({
  selector: 'app-book-dashboard',
  templateUrl: './book-dashboard.component.html',
  styleUrls: ['./book-dashboard.component.scss']
})
export class BookDashboardComponent {
  toggleValue = 'table';
  books: Array<Books> = [];
  filteredBooks: Array<Books> = [];
  filterbooksText: string = '';
  resultsLength = 0;
  public ColumnMode = ColumnMode;

  constructor(public dialog: MatDialog, private instituteService: InstituteService, private toastr: ToastrService,
  private router: Router) { }

  ngOnInit() {
    this.loadTableData();
  }

  loadTableData() {
    
  }

  filterTeachers() {
    if (this.filterbooksText?.length > 0) {
      let text = this.filterbooksText.toLowerCase();
      this.filteredBooks = this.books.filter(x =>
        (x.name && x.name.toLowerCase().includes(text)));
    } else {
      this.filteredBooks = [...this.books];
    }
  }

  addBook() {
    let dialogRef = this.dialog.open(AddBookComponent, {
      width: '60%',
      autoFocus: false,
      data: {}
    });
  }

  editBook(id: number) {
    let dialogRef = this.dialog.open(AddBookComponent, {
      width: '60%',
      autoFocus: false,
      data: {}
    });
  }


  deleteBook(id: number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        title: 'Delete Book',
        message: 'Are you sure you want to delete the selected book?'
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        // const sub = this.userService.deleteUser(id).subscribe(res => {
        //   if (res.code == 200) {
        //     this.loadTableData();
        //     this.toastr.success(res.message);
        //   } else {
        //     this.toastr.error(res.message);
        //   }
        // })
      }
    });
  }

}
