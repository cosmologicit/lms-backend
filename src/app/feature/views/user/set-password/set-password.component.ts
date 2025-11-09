import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SetPassword } from 'src/app/core/api-models/auth-model';
import { AuthService } from 'src/app/core/api-services/auth/auth.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  data:SetPassword= {}
  isPasswordVisible = false;
  isConfirmPasswordVisible = false;
  password: string = '';
  isSetPasswordFormVisible = true;

  @ViewChild('setPasswordForm') setPasswordForm?: any;
  constructor(public dialogRef: MatDialogRef<SetPasswordComponent>, @Inject(MAT_DIALOG_DATA) public details: { id: number },
  private authService: AuthService,private toastr:ToastrService) { }

  ngOnInit() {
    this.data.userId = this.details.id;
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.isSetPasswordFormVisible) {
      this.setPasswordForm.control.markAllAsTouched();      
    }
    if (!this.setPasswordForm.form.valid)
      return;

    const sub = this.authService.userSetPassword(this.data).subscribe(res => {
      if (res.code == 200) {
        this.close();
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
      sub.unsubscribe();
    });
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
