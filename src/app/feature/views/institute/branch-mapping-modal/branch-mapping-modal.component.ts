import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-branch-mapping-modal',
  templateUrl: './branch-mapping-modal.component.html',
  styleUrls: ['./branch-mapping-modal.component.scss']
})
export class BranchMappingModalComponent {
  name: string = "";
  @Output() confirmed = new EventEmitter<boolean>();
  constructor(public dialogRef: MatDialogRef<BranchMappingModalComponent>, @Inject(MAT_DIALOG_DATA) public data: { name: string }) {
    this.name = data.name;
  }

  close() {
    this.dialogRef.close();
  }

  onsubmit(check: boolean) {
    this.confirmed.emit(check);
  }
}
