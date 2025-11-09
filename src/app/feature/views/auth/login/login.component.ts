import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthResponse, Login } from 'src/app/core/api-models/auth-model';
import { AuthService } from 'src/app/core/api-services/auth/auth.service';
import { AppEvents } from 'src/app/core/models/appenums';
import { AppStateService } from 'src/app/core/services/app-state/app.state.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isPasswordVisible = false;
  isLoginFormVisible = true;
  data: Login = {};

  @ViewChild('loginForm') loginForm?: any;
  constructor(private authenservice: AuthenticationService, private toastr: ToastrService, private appStateService: AppStateService,
    private router: Router,private authService:AuthService) { }
  
  onSubmit() {
     if (this.isLoginFormVisible) {
      this.loginForm.control.markAllAsTouched();
    }
    if (!this.loginForm.form.valid)
      return;
     const sub = this.authService.login(this.data).subscribe(res => {
      if (res.code == 200) {
        this.authenservice.token = res.data.token!;
        this.appStateService.sendEvent(AppEvents.SetUser, res.data);
        this.appStateService.sendEvent(AppEvents.LoggedIn, true);
          this.router.navigateByUrl('app/dashboard');
      }
      else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    })
  }
  
}
