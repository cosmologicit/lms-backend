import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth-guard';
import { ApplicationComponent } from './application.component';
import { LoggedInGuard } from '../core/guards/looged-in-guard';
import { PrivacyPolicyComponent } from './views/docs/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './views/docs/terms-and-conditions/terms-and-conditions.component';
import { DeleteAccountComponent } from './views/docs/delete-account/delete-account.component';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [LoggedInGuard],
    loadChildren: () => import('./views/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent
  },
  {
    path: 'delete-account',
    component: DeleteAccountComponent
  },
  {
    path: 'docs',
    // canActivate: [LoggedInGuard],
    loadChildren: () => import('./views/docs/docs.module').then((m) => m.DocsModule),
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    component: ApplicationComponent,
    children: [
      {
        path: 'user',
        loadChildren: () => import('./views/user/user.module').then((m) => m.UserModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'institute',
        loadChildren: () => import('./views/institute/institute.module').then((m) => m.InstituteModule)
      },
      {
        path: 'class',
        loadChildren: () => import('./views/class/class.module').then((m) => m.ClassModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
