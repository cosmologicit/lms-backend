import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/api-services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = '';
  isforgotPasswordFormVisible = true;

  @ViewChild('forgotPasswordForm') forgotPasswordForm?: any;
  constructor(private authService:AuthService,private toastr:ToastrService) { }
  
  onSubmit() {
     if (this.isforgotPasswordFormVisible) {
      this.forgotPasswordForm.control.markAllAsTouched();
    }
    if (!this.forgotPasswordForm.form.valid)
      return;
    const sub = this.authService.forgotpassword(this.email).subscribe(res => {
      if (res.code == 200) {
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    })
  }
}
