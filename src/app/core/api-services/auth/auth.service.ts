import { Injectable } from '@angular/core';
import { BroadcasterService } from '../../services/broadcaster/broadcaster.service';
import { AppStateService } from '../../services/app-state/app.state.service';
import { WebApiService } from '../../services/web-api-service';
import { AppBaseService } from '../base/base-service';
import { AuthResponse, Login, SetPassword, Signup } from '../../api-models/auth-model';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ApiUrl } from '../../constants/api-url-constants';
import { BaseAPIResponseModel } from './base-api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AppBaseService {

    constructor(broadcaster: BroadcasterService, appStateService: AppStateService, private webApiService: WebApiService) {
    super(broadcaster, appStateService);
    }
  
    public signup(details: Signup): Observable<BaseAPIResponseModel<AuthResponse>> {
    this.processing(true);
    return this.webApiService.PostApi<Signup, BaseAPIResponseModel<AuthResponse>>(`${ApiUrl.signup}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('signup', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
    }
  
    public setPassword(details: SetPassword): Observable<BaseAPIResponseModel<String>> {
    this.processing(true);
    return this.webApiService.PutApi<SetPassword, BaseAPIResponseModel<String>>(`${ApiUrl.setPassword}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('setPassword', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
    }
  
    public userSetPassword(details: SetPassword): Observable<BaseAPIResponseModel<String>> {
    this.processing(true);
    return this.webApiService.PutApi<SetPassword, BaseAPIResponseModel<String>>(`${ApiUrl.userSetPassword}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('userSetPassword', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
    }
  
    public login(details: Login): Observable<BaseAPIResponseModel<AuthResponse>> {
    this.processing(true);
    return this.webApiService.PostApi<Login, BaseAPIResponseModel<AuthResponse>>(`${ApiUrl.login}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('login', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
    }
  
  public forgotpassword(email: string): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<string, BaseAPIResponseModel<string>>(`${ApiUrl.forgotpassword}`, email).pipe(
      catchError(err => {
        return throwError(() => this.handleError('forgotpassword', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
    }
  
  
}
