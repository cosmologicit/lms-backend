import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Announcement } from 'src/app/core/api-models/institute-model';
import { InstituteService } from 'src/app/core/api-services/institute/institute.service';
import { ConfirmationDialogComponent } from 'src/app/feature/shared/confirmation-dialog/confirmation-dialog.component';
import { AddAnnouncementComponent } from '../add-announcement/add-announcement.component';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent {
  toggleValue = 'table';
  announcement: Array<Announcement> = [];
  filteredAnnouncement: Array<Announcement> = [];
  filterAnnouncementText: string = '';
  resultsLength = 0;
  role: string = '';
  public ColumnMode = ColumnMode;

  constructor(public dialog: MatDialog, private instituteService: InstituteService, private toastr: ToastrService,
  private router: Router,private authService: AuthenticationService) { }

  ngOnInit() {
    this.role = this.authService.role;
    this.loadTableData();
  }

  loadTableData() {
    const sub = this.instituteService.getAnnouncemnets().subscribe(res => {
      if (res.code == 200) {
        this.announcement = res.data;
        this.filteredAnnouncement = res.data;
      } else {
        this.toastr.error(res.message);
      }
    })
  }

  filterAnnouncement() {
    if (this.filterAnnouncementText?.length > 0) {
      let text = this.filterAnnouncementText.toLowerCase();
      this.filteredAnnouncement = this.announcement.filter(x =>
        (x.title && x.title.toLowerCase().includes(text)));
    } else {
      this.filteredAnnouncement = [...this.announcement];
    }
  }

  addAnnouncement() {
     let dialogRef = this.dialog.open(AddAnnouncementComponent, {
      width: '50%',
      autoFocus: false,
      data: {}
     });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      this.loadTableData();
    });
  }

  editAnnouncement(id: number) {
     let dialogRef = this.dialog.open(AddAnnouncementComponent, {
      width: '50%',
      autoFocus: false,
       data: {
        id:id
      }
     });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      this.loadTableData();
    });
  }


  deleteAnnouncement(id: number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        title: 'Delete Announcement',
        message: 'Are you sure you want to delete the selected announcement?'
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(res => {
      if (res) {
        const sub = this.instituteService.deleteAnnouncemnet(id).subscribe(res => {
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

}
