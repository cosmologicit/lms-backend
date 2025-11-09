import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthResponse } from 'src/app/core/api-models/auth-model';
import { GeneralService } from 'src/app/core/api-services/common/general.service';
import { AppEvents } from 'src/app/core/models/appenums';
import { AppStateService } from 'src/app/core/services/app-state/app.state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleDrawer: EventEmitter<any> = new EventEmitter();
  isMenuOpen = false;
  user: AuthResponse = {};
  isCheckIn = false;

  
  constructor(private appStateService: AppStateService, private router: Router, private generalService: GeneralService,
    private toastr:ToastrService) {}

  ngOnInit() {
    const sub = this.generalService.getCurrentUserDetails().subscribe(res => {
      this.user = res.data
      sub.unsubscribe();
    });
  }

  onToggleDrawer() {
    this.toggleDrawer.emit();
  }

  logOut(path: string) {
    localStorage.clear();
    this.appStateService.sendEvent(AppEvents.LoggedIn, false);
    this.router.navigateByUrl(path);
  }

}
