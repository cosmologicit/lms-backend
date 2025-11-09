import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocsRoutingModule } from './docs-routing.module';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    DeleteAccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DocsRoutingModule
  ]
})
export class DocsModule { }
