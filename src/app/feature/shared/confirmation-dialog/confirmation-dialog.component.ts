import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  title: string = '';

  @Output() confirmed = new EventEmitter<boolean>();
  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string },
    private toastr: ToastrService) { }
  
  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.confirmed.emit(true);
    this.dialogRef.close(true);
  }
}
