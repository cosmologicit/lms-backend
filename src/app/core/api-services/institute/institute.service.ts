import { Injectable } from '@angular/core';
import { BroadcasterService } from '../../services/broadcaster/broadcaster.service';
import { AppStateService } from '../../services/app-state/app.state.service';
import { WebApiService } from '../../services/web-api-service';
import { AppBaseService } from '../base/base-service';
import { Announcement, Books, Branch, Course, Department, Fees, Grading, Holiday, InstituteBranchCourseDepartmentMapping, InstituteDetails, Workingdays } from '../../api-models/institute-model';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { BaseAPIResponseModel } from '../auth/base-api-response';
import { ApiUrl } from '../../constants/api-url-constants';
import { InstituteSaveResponse, TeacherStudentTimeTable, TimeTable } from '../../api-models/auth-model';
import { DefaultMappingResponse } from '../../api-models/common-model';
import { Student } from '../../api-models/user-model';
import { Time } from '@angular/common';
import { Quotes } from '../../api-models/dashboard-model';
import { GetTimetable } from '../../api-models/class-model';

@Injectable({
  providedIn: 'root'
})
export class InstituteService extends AppBaseService {

  constructor(broadcaster: BroadcasterService, appStateService: AppStateService, private webApiService: WebApiService) {
    super(broadcaster, appStateService);
  }

  public saveInstituteDetails(details: InstituteDetails): Observable<BaseAPIResponseModel<InstituteSaveResponse>> {
    this.processing(true);
    return this.webApiService.PostApi<InstituteDetails, BaseAPIResponseModel<InstituteSaveResponse>>(`${ApiUrl.saveInstituteDetails}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveInstituteDetails', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public saveFeesDeatils(details: Fees): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<Fees, BaseAPIResponseModel<string>>(`${ApiUrl.saveFeesDeatils}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveFeesDeatils', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public updateFeesDeatils(details: Fees): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PutApi<Fees, BaseAPIResponseModel<string>>(`${ApiUrl.updateFeesDeatils}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('updateFeesDeatils', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public saveAnnoucement(details: Announcement): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<Announcement, BaseAPIResponseModel<string>>(`${ApiUrl.saveAnnoucement}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveAnnoucement', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public saveBook(details: Books): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<Books, BaseAPIResponseModel<string>>(`${ApiUrl.saveBook}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveBook', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public upadteBook(details: Books): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PutApi<Books, BaseAPIResponseModel<string>>(`${ApiUrl.upadteBook}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('upadteBook', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public saveHoliday(details: Holiday): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<Holiday, BaseAPIResponseModel<string>>(`${ApiUrl.saveHoliday}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveHoliday', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public updateHoliday(details: Holiday): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PutApi<Holiday, BaseAPIResponseModel<string>>(`${ApiUrl.updateHoliday}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('updateHoliday', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public updateAnnouncement(details: Announcement): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PutApi<Announcement, BaseAPIResponseModel<string>>(`${ApiUrl.updateAnnouncement}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('updateAnnouncement', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public updateInstituteDetails(details: InstituteDetails): Observable<BaseAPIResponseModel<InstituteSaveResponse>> {
    this.processing(true);
    return this.webApiService.PutApi<InstituteDetails, BaseAPIResponseModel<InstituteSaveResponse>>(`${ApiUrl.updateInstituteDetails}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('updateInstituteDetails', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public saveWorkingDays(details: Array<Workingdays>): Observable<BaseAPIResponseModel<any>> {
    this.processing(true);
    return this.webApiService.PostApi<Array<Workingdays>, BaseAPIResponseModel<any>>(`${ApiUrl.saveWorkingDays}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveWorkingDays', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public saveBranch(details: Branch): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<Branch, BaseAPIResponseModel<string>>(`${ApiUrl.saveBranch}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveBranch', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public updateBranch(details: Branch): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PutApi<Branch, BaseAPIResponseModel<string>>(`${ApiUrl.updateBranch}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveBranch', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public saveDepartment(details: Department): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<Department, BaseAPIResponseModel<string>>(`${ApiUrl.saveDepartment}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveDepartment', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public updateDepartment(details: Department): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PutApi<Department, BaseAPIResponseModel<string>>(`${ApiUrl.updateDepartment}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('updateDepartment', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public saveCourse(details: Course): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<Course, BaseAPIResponseModel<string>>(`${ApiUrl.saveCourse}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveCourse', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public saveTimeTable(details: TimeTable): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<TimeTable, BaseAPIResponseModel<string>>(`${ApiUrl.saveTimeTable}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveTimeTable', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public updateTimeTable(details: TimeTable): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PutApi<TimeTable, BaseAPIResponseModel<string>>(`${ApiUrl.updateTimeTable}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('updateTimeTable', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public saveGrade(details: Grading): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<TimeTable, BaseAPIResponseModel<string>>(`${ApiUrl.saveGrade}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveGrade', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public updateGrade(details: Grading): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PutApi<TimeTable, BaseAPIResponseModel<string>>(`${ApiUrl.updateGrade}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('updateGrade', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getTimeTableById(id: number): Observable<BaseAPIResponseModel<TimeTable>> {
    this.processing(true);
    return this.webApiService.GetApi< BaseAPIResponseModel<TimeTable>>(`${ApiUrl.getTimeTableById}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getTimeTableById', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getFeesById(id: number): Observable<BaseAPIResponseModel<Fees>> {
    this.processing(true);
    return this.webApiService.GetApi< BaseAPIResponseModel<Fees>>(`${ApiUrl.getFeesById}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getFeesById', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getAnnouncemnets(): Observable<BaseAPIResponseModel<Array<Announcement>>> {
    this.processing(true);
    return this.webApiService.GetApi< BaseAPIResponseModel<Array<Announcement>>>(`${ApiUrl.getAnnouncemnets}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getAnnouncemnets', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getAnnouncemnetsByDate(startDate:any,endDate:any): Observable<BaseAPIResponseModel<Array<Announcement>>> {
    this.processing(true);
    return this.webApiService.GetApi< BaseAPIResponseModel<Array<Announcement>>>(`${ApiUrl.getAnnouncemnetsByDate}${startDate}&endDate=${endDate}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getAnnouncemnetsByDate', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getAnnouncementById(id: number): Observable<BaseAPIResponseModel<Announcement>> {
    this.processing(true);
    return this.webApiService.GetApi< BaseAPIResponseModel<Announcement>>(`${ApiUrl.getAnnouncementById}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getAnnouncementById', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getGrades(): Observable<BaseAPIResponseModel<Array<Grading>>> {
    this.processing(true);
    return this.webApiService.GetApi< BaseAPIResponseModel<Array<Grading>>>(`${ApiUrl.getGrades}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getGrades', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getGradeById(id:number): Observable<BaseAPIResponseModel<Grading>> {
    this.processing(true);
    return this.webApiService.GetApi< BaseAPIResponseModel<Grading>>(`${ApiUrl.getGradeById}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getGradeById', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getFeeDetails(associationId?: number): Observable<BaseAPIResponseModel<Array<Fees>>> {
    this.processing(true);
    let url = ApiUrl.getFeeDetails;
    if (associationId) {
      url = `${ApiUrl.getFeeDetails}?associationId=${associationId}`;
    }
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<Fees>>>(url).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getFeeDetails', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getBookDetailById(id: number): Observable<BaseAPIResponseModel<TimeTable>> {
    this.processing(true);
    return this.webApiService.GetApi< BaseAPIResponseModel<TimeTable>>(`${ApiUrl.getBookDetailById}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getBookDetailById', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getBooksDetails(): Observable<BaseAPIResponseModel<TimeTable>> {
    this.processing(true);
    return this.webApiService.GetApi< BaseAPIResponseModel<TimeTable>>(`${ApiUrl.getBooksDetails}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getBooksDetails', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getHolidayById(id: number): Observable<BaseAPIResponseModel<TimeTable>> {
    this.processing(true);
    return this.webApiService.GetApi< BaseAPIResponseModel<TimeTable>>(`${ApiUrl.getHolidayById}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getHolidayById', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getHolidays(): Observable<BaseAPIResponseModel<Array<Holiday>>> {
    this.processing(true);
    return this.webApiService.GetApi< BaseAPIResponseModel<Array<Holiday>>>(`${ApiUrl.getHolidays}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getHolidays', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getHolidaysByDate(startDate:any,endDate:any): Observable<BaseAPIResponseModel<Array<Holiday>>> {
    this.processing(true);
    return this.webApiService.GetApi< BaseAPIResponseModel<Array<Holiday>>>(`${ApiUrl.getHolidaysByDate}${startDate}&endDate=${endDate}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getHolidaysByDate', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getQuotes(): Observable<BaseAPIResponseModel<Quotes>> {
    this.processing(true);
    return this.webApiService.GetApi< BaseAPIResponseModel<Quotes>>(`${ApiUrl.getQuotes}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getHolidaysByDate', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public upadteCourse(details: Course): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PutApi<Course, BaseAPIResponseModel<string>>(`${ApiUrl.upadteCourse}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('upadteCourse', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getBranches(): Observable<BaseAPIResponseModel<Array<Branch>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<Branch>>>(`${ApiUrl.getBranches}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getBranches', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getTimeTables(): Observable<BaseAPIResponseModel<Array<TimeTable>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<TimeTable>>>(`${ApiUrl.getTimeTables}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('geTimeTables', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getTimeTableByUserId(id:number): Observable<BaseAPIResponseModel<Array<GetTimetable>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<GetTimetable>>>(`${ApiUrl.getTimeTableByUserId}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getTimeTableByUserId', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getTodayTimeTable(): Observable<BaseAPIResponseModel<Array<TimeTable>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<TimeTable>>>(`${ApiUrl.getTodayTimeTable}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getTodayTimeTable', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public geTimeTableForStudentAndTeacher(): Observable<BaseAPIResponseModel<Array<TeacherStudentTimeTable>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<TeacherStudentTimeTable>>>(`${ApiUrl.geTimeTableForStudentAndTeacher}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('geTimeTableForStudentAndTeacher', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getLinkedInstituteBranchCourseDepartment(getDefault: boolean): Observable<BaseAPIResponseModel<InstituteBranchCourseDepartmentMapping[]>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<InstituteBranchCourseDepartmentMapping[]>>(`${ApiUrl.getLinkedInstituteBranchCourseDepartment}?getDefault=${getDefault}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getLinkedInstituteBranchCourseDepartment', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public checkDefaultMapping(): Observable<BaseAPIResponseModel<DefaultMappingResponse>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<DefaultMappingResponse>>(`${ApiUrl.checkDefaultMapping}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('checkDefaultMapping', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getInstituteDetails(): Observable<BaseAPIResponseModel<InstituteDetails>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<InstituteDetails>>(`${ApiUrl.getInstituteDetails}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getInstituteDetails', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getWorkingDays(): Observable<BaseAPIResponseModel<Array<Workingdays>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<Workingdays>>>(`${ApiUrl.getWorkingDays}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getWorkingDays', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getBranchById(id: number): Observable<BaseAPIResponseModel<Branch>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Branch>>(`${ApiUrl.getBranchById}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getBranchById', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getCourseById(id: number): Observable<BaseAPIResponseModel<Course>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Course>>(`${ApiUrl.getCourseById}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getCourseById', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getDepartments(): Observable<BaseAPIResponseModel<Array<Department>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<Department>>>(`${ApiUrl.getDepartments}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getDepartments', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getCourses(): Observable<BaseAPIResponseModel<Array<Course>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<Course>>>(`${ApiUrl.getCourses}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getCourses', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getStudents(): Observable<BaseAPIResponseModel<Array<Student>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<Student>>>(`${ApiUrl.getStudents}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getStudents', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getDepartmentById(id: number): Observable<BaseAPIResponseModel<Department>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Department>>(`${ApiUrl.getDepartmentById}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getDepartmentById', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public deleteBranch(id: number): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.DeleteApi<number, BaseAPIResponseModel<string>>(`${ApiUrl.deleteBranch}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('deleteBranch', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public deleteGrade(id: number): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.DeleteApi<number, BaseAPIResponseModel<string>>(`${ApiUrl.deleteGrade}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('deleteGrade', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public deleteHoliday(id: number): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.DeleteApi<number, BaseAPIResponseModel<string>>(`${ApiUrl.deleteHoliday}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('deleteHoliday', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public deleteFees(id: number): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.DeleteApi<number, BaseAPIResponseModel<string>>(`${ApiUrl.deleteFees}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('deleteFees', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public deleteAnnouncemnet(id: number): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.DeleteApi<number, BaseAPIResponseModel<string>>(`${ApiUrl.deleteAnnouncemnet}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('deleteAnnouncemnet', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public deleteDepartment(id: number): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.DeleteApi<number, BaseAPIResponseModel<string>>(`${ApiUrl.deleteDepartment}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('deleteDepartment', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public deleteCourse(id: number): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.DeleteApi<number, BaseAPIResponseModel<string>>(`${ApiUrl.deleteCourse}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('deleteCourse', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

}
