import { Injectable } from '@angular/core';
import { AppBaseService } from '../base/base-service';
import { BroadcasterService } from '../../services/broadcaster/broadcaster.service';
import { AppStateService } from '../../services/app-state/app.state.service';
import { WebApiService } from '../../services/web-api-service';
import { Student, Teacher, UserRolePermission } from '../../api-models/user-model';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { BaseAPIResponseModel } from '../auth/base-api-response';
import { ApiUrl } from '../../constants/api-url-constants';
import { TeacherAttendence, TimeTable } from '../../api-models/auth-model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AppBaseService {

  constructor(broadcaster: BroadcasterService, appStateService: AppStateService, private webApiService: WebApiService) {
    super(broadcaster, appStateService);
  }


  public saveTeacher(details: Teacher): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<Teacher, BaseAPIResponseModel<string>>(`${ApiUrl.saveTeacher}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveTeacher', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public updateTeacher(details: Teacher): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PutApi<Teacher, BaseAPIResponseModel<string>>(`${ApiUrl.updateTeacher}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('updateTeacher', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public updateStudent(details: Student): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PutApi<Teacher, BaseAPIResponseModel<string>>(`${ApiUrl.updateStudent}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('updateStudent', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public saveStudent(details: Student): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<Student, BaseAPIResponseModel<string>>(`${ApiUrl.saveStudent}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveStudent', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getUserPermission(): Observable<BaseAPIResponseModel<UserRolePermission>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<UserRolePermission>>(`${ApiUrl.userPermission}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getUserPermission', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getTeachers(): Observable<BaseAPIResponseModel<Teacher[]>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Teacher[]>>(`${ApiUrl.getTeachers}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getTeachers', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getTeacherAttendenceById(userId:number,startdate:string,endDate:string): Observable<BaseAPIResponseModel<Array<TeacherAttendence>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<TeacherAttendence>>>(`${ApiUrl.getTeacherAttendenceById}${userId}&startDate=${startdate}&endDate=${endDate}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getTeacherAttendenceById', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getStudentAttendenceById(userId:number,startdate:string,endDate:string): Observable<BaseAPIResponseModel<Array<TeacherAttendence>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<TeacherAttendence>>>(`${ApiUrl.getStudentAttendenceById}${userId}&startDate=${startdate}&endDate=${endDate}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getStudentAttendenceById', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getStudents(instituteBranchId?:number): Observable<BaseAPIResponseModel<Student[]>> {
    this.processing(true);
    let url = ApiUrl.getStudents;
    if (instituteBranchId) {
      url = url + `?instituteBranchId=${instituteBranchId}`
    }
    return this.webApiService.GetApi<BaseAPIResponseModel<Student[]>>(url).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getStudents', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }
  public getStudentsByAssociationId(associationId:number): Observable<BaseAPIResponseModel<Student[]>> {
    this.processing(true);

    return this.webApiService.GetApi<BaseAPIResponseModel<Student[]>>(`${ApiUrl.getStudentsByAssociationId}${associationId}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getStudentsByAssociationId', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }


  public deleteUser(id: number): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.DeleteApi<number, BaseAPIResponseModel<string>>(`${ApiUrl.deleteUser}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('deleteUser', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getStudentById(id: number): Observable<BaseAPIResponseModel<Student>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Student>>(`${ApiUrl.getStudentById}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getStudentById', err))
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        })
      )
  }

  public getTeacherById(id: number): Observable<BaseAPIResponseModel<Teacher>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Teacher>>(`${ApiUrl.getTeacherById}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getTeacherById', err))
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        })
      )
  }
}
