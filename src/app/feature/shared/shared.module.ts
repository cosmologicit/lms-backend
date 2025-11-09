import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { DrawerComponent } from './drawer/drawer.component';
import { MatMenuModule } from '@angular/material/menu';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule } from '@angular/router';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AttendenceModalComponent } from './attendence-modal/attendence-modal.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { AttendanceCalendarComponent } from './attendance-calendar/attendance-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';



@NgModule({
  declarations: [
    HeaderComponent,
    DrawerComponent,
    LoaderComponent,
    ConfirmationDialogComponent,
    AttendenceModalComponent,
    AttendanceCalendarComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    RouterModule,
    NgxDatatableModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [
    HeaderComponent,
    DrawerComponent,
    LoaderComponent,
    NgSelectModule,
    AttendanceCalendarComponent
  ]
})
export class SharedModule { }
