import { Injectable } from '@angular/core';
import { AppBaseService } from '../base/base-service';
import { BroadcasterService } from '../../services/broadcaster/broadcaster.service';
import { AppStateService } from '../../services/app-state/app.state.service';
import { WebApiService } from '../../services/web-api-service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { BaseAPIResponseModel } from '../auth/base-api-response';
import { State } from '../../api-models/common-model';
import { ApiUrl } from '../../constants/api-url-constants';
import { AttendanceStatus, AuthResponse, CheckInOutResponse, CheckInTimeStamps } from '../../api-models/auth-model';
import { AssocationDetails } from '../../api-models/dashboard-model';

@Injectable({
  providedIn: 'root'
})
export class GeneralService extends AppBaseService {

    constructor(broadcaster: BroadcasterService, appStateService: AppStateService, private webApiService: WebApiService) {
    super(broadcaster, appStateService);
    }
  
    public getStates(): Observable<BaseAPIResponseModel<Array<State>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<State>>>(`${ApiUrl.getStates}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getStates', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }
  
    public getCurrentUserDetails(): Observable<BaseAPIResponseModel<AuthResponse>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<AuthResponse>>(`${ApiUrl.getCurrentUserDetails}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getCurrentUserDetails', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
    }
  
    public getAttendanceLastStatus(): Observable<BaseAPIResponseModel<Array<CheckInTimeStamps>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<CheckInTimeStamps>>>(`${ApiUrl.getAttendanceLastStatus}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getAttendanceLastStatus', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
    }
  
    public getClassAttendanceInformation(id:number,date:string): Observable<BaseAPIResponseModel<AssocationDetails>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<AssocationDetails>>(`${ApiUrl.getClassAttendanceInformation}${id}&date=${date}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getClassAttendanceInformation', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
    }
  
    public attendanceUpdateStatus(status:string): Observable<BaseAPIResponseModel<CheckInOutResponse>> {
    this.processing(true);
    return this.webApiService.PutApi<number,BaseAPIResponseModel<CheckInOutResponse>>(`${ApiUrl.attendanceUpdateStatus}${status}`,NaN).pipe(
      catchError(err => {
        return throwError(() => this.handleError('attendanceUpdateStatus', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
    }
  
  
  
}
