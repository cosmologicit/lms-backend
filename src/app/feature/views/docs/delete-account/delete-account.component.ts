import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent {
  user = {
    name: '',
    email: '',
    reason: ''
  }
  @ViewChild('deleteAccountForm') deleteAccountForm?: any;

  constructor(private toastr: ToastrService, private router: Router) { }

  onSubmit() {
    this.deleteAccountForm.control.markAllAsTouched();
    if (!this.deleteAccountForm.form.valid)
      return;

    this.toastr.success('Your account has been deleted successfully.');
    this.router.navigateByUrl('auth/login');
  }
}
