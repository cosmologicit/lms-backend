import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SetPassword } from 'src/app/core/api-models/auth-model';
import { AuthService } from 'src/app/core/api-services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';
  isResetPasswordFormVisible = true;
  isPasswordVisible = false;
  password: string = '';
  isConfirmPasswordVisible = false;
  status: string = '';
  data: SetPassword = {};

  @ViewChild('resetPasswordForm') resetPasswordForm?: any;
  constructor(private authService: AuthService, private toastr: ToastrService,private route: ActivatedRoute,private router:Router) { }
  
  ngOnInit() {
      this.route.paramMap.subscribe(parameterMap => {
      let token = parameterMap.get('token');
      if (token != null) {
        this.data.token = token;
      }
    });
    this.route.url.subscribe(urlSegments => {
      const urlPath = urlSegments.map(segment => segment.path).join('/');
      if (urlPath.startsWith('set-password')) {
        this.status = 'Set';
      } else if (urlPath.startsWith('reset-password')) {
        this.status = 'Reset';
      } else {
        this.status = '';
      }
    });
  }
  
  onSubmit() {
     if (this.isResetPasswordFormVisible) {
      this.resetPasswordForm.control.markAllAsTouched();
    }
    if (!this.resetPasswordForm.form.valid)
      return;
    if (this.data.password!.length >7 && this.password.length>7 && this.data.password==this.password) {
      const sub = this.authService.setPassword(this.data).subscribe(res => {
        if (res.code == 200) {
          this.toastr.success(res.message);
          this.router.navigateByUrl('auth/login')
        } else {
          this.toastr.error(res.message)
        }
        sub.unsubscribe();
      })
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
