import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Association } from 'src/app/core/api-models/class-model';
import { Announcement } from 'src/app/core/api-models/institute-model';
import { ClassService } from 'src/app/core/api-services/class/class.service';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss']
})
export class AddAnnouncementComponent implements OnInit {
  status: string = 'Add';
  data: Announcement = {};
  classes: Array<Association> = [];
  selectUnselectText: string = 'Select All Class';
  isSelectAll = false;
  isAnnouncementFormVisible = true;

  @ViewChild('announcementForm') announcementForm?: any;
  @Output() confirmed = new EventEmitter<boolean>();
  constructor(public dialogRef: MatDialogRef<AddAnnouncementComponent>, @Inject(MAT_DIALOG_DATA) public details: { id: number },
    private instituteService: InstituteService, private classService: ClassService, private toastr: ToastrService) { }
  
  ngOnInit() {
    const sub = this.classService.getAllClasses().subscribe(res => {
      if (res.code == 200) {
        this.classes = res.data;
        this.loadTableData();
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    });
  }

  loadTableData() {
    if (this.details.id) {
      this.status = 'Edit';
      const sub = this.instituteService.getAnnouncementById(this.details.id).subscribe(res => {
        if (res.code == 200) {
          this.data = res.data;
          if (this.data.associationIds?.length == this.classes.length) {
            this.selectUnselectText = 'Unselect All Class';
            this.data.associationIds = this.classes.map(x => x.id!);
            this.isSelectAll = true;
          }
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

  onSubmit() {
    if (this.isAnnouncementFormVisible) {
      this.announcementForm.control.markAllAsTouched();
    }
    if (!this.announcementForm.form.valid)
      return;
    
    if (this.details.id) {
      const sub = this.instituteService.updateAnnouncement(this.data).subscribe(res => {
        if (res.code == 200) {
          this.confirmed.emit(true);
          this.close();
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    } else {
      const sub = this.instituteService.saveAnnoucement(this.data).subscribe(res => {
        if (res.code == 200) {
          this.confirmed.emit(true);
          this.close();
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    }
  }

  checkAll() {    
    if (this.data.associationIds?.length == this.classes.length) {
      this.data.associationIds = []
      this.selectUnselectText = 'Select All Class';
    } else {
      this.selectUnselectText = 'Unselect All Class';
      this.data.associationIds = this.classes.map(x => x.id!);
    }
  }


}
