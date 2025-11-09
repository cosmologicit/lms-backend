import { Component } from '@angular/core';
import { AppStateService } from '../core/services/app-state/app.state.service';
import { GeneralService } from '../core/api-services/common/general.service';
import { AuthResponse } from '../core/api-models/auth-model';
import { Router } from '@angular/router';
import { AppEvents } from '../core/models/appenums';
import { AuthenticationService } from '../core/services/authentication/authentication.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {
  public authenticated = true;
  public isMiniSidebar = false;
  public expandMenu: boolean | string = false;
  public isProcessing = false; 
  public isHeaderAndSidebarVisible = false;
  public user: AuthResponse= {};
  public showStartupUi?: boolean;
  
  constructor(private appStateService: AppStateService, private generalService: GeneralService, private router: Router,
    private authService:AuthenticationService
  ) {
    this.appStateService.isLoggedIn().subscribe(res => {
      this.authenticated = res;
    });

    this.generalService.getCurrentUserDetails().subscribe(res => {
      this.user = res.data;
      this.authService.role = res.data.roleName!;
      this.authService.setStartTime = res.data.startTime!;
      this.authService.setStartTime = res.data.startTime!;
      this.authService.setEndTime = res.data.endTime!;
      this.authService.associationId = res.data.associationId?.toString()!;
      this.showStartupUi = this.user?.instituteId == null;
      if (this.user.instituteId == null) {
        this.router.navigateByUrl('app/institute/details');
      }
     
    })

    this.appStateService.isProcessing().subscribe(res => {
      setTimeout(() => {
        this.isProcessing = res;
      }, 0);
    });
  }
}
