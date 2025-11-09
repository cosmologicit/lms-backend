import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Signup } from 'src/app/core/api-models/auth-model';
import { AuthService } from 'src/app/core/api-services/auth/auth.service';
import { AppEvents } from 'src/app/core/models/appenums';
import { AppStateService } from 'src/app/core/services/app-state/app.state.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  isPasswordVisible = false;
  password: string = '';
  isConfirmPasswordVisible = false;
  isSignUpFormVisible = true;
  data: Signup = {};
  isNumber = false;

  @ViewChild('signUpForm') signUpForm?: any;
  constructor(private authService: AuthService, private authenservice: AuthenticationService,
    private appStateService:AppStateService,private router:Router,private toastr:ToastrService
  ) { }
  
  onSubmit() {
    if (this.isSignUpFormVisible) {
      this.signUpForm.control.markAllAsTouched();      
    }
    if (!this.signUpForm.form.valid)
      return;

    const regex = /^[0-9]+$/
    if (this.data.phone) {
      this.isNumber = regex.test(this.data.phone);
    }

    if (this.data.phone?.trim() == '') {
      this.data.phone = undefined;
    }

    if (this.password.length > 7 && this.password == this.data.password || this.isNumber) {    
      const sub = this.authService.signup(this.data).subscribe(res => {
        if (res.code == 200) {
          this.toastr.success(res.message);
          this.authenservice.token = res.data.token!;
          this.appStateService.sendEvent(AppEvents.SetUser, res.data);
          this.appStateService.sendEvent(AppEvents.LoggedIn, true);
          this.router.navigateByUrl('app/institute/details');
        } else {
          this.toastr.error(res.message);
        }
        sub.unsubscribe();
      });
    }

  }

  isMaxErrorPasswordVisible() {
    let isValid = true;
    if (this.data.password) {
      if (this.data.password!.length < 8) {
        isValid = false;
      }
    }
    return isValid;
  }
}
