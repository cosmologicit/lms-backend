import { Injectable } from '@angular/core';
import { AppBaseService } from '../base/base-service';
import { BroadcasterService } from '../../services/broadcaster/broadcaster.service';
import { AppStateService } from '../../services/app-state/app.state.service';
import { WebApiService } from '../../services/web-api-service';
import { Assignment, Association, Chapter, Exam, ExamineAssignment, ExamNumbers, GetAttendance, GetAttendanceByClassAndDate, MapStudentClass, Notes, SaveChapter, Subject, SubmitAssignment, SubmitExamNumbers, Syllabus } from '../../api-models/class-model';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { BaseAPIResponseModel } from '../auth/base-api-response';
import { ApiUrl } from '../../constants/api-url-constants';
import { Attendance, LinkStudentWithClass } from '../../api-models/user-model';
import { AssignmentRemainingStudent, SubmittedAssignmentStudentList } from '../../api-models/auth-model';
import { AssocationDetails } from '../../api-models/dashboard-model';


@Injectable({
  providedIn: 'root'
})
export class ClassService extends AppBaseService {

   constructor(broadcaster: BroadcasterService, appStateService: AppStateService, private webApiService: WebApiService) {
    super(broadcaster, appStateService);
   }
  
  public saveAssignment(details: Assignment): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<Assignment, BaseAPIResponseModel<string>>(`${ApiUrl.saveAssignment}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveAssignment', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }
  
  public saveExam(details: Exam): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<Exam, BaseAPIResponseModel<string>>(`${ApiUrl.saveExam}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveExam', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }
  
  public updateExam(details: Exam): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PutApi<Exam, BaseAPIResponseModel<string>>(`${ApiUrl.updateExam}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('updateExam', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }
  
  public submitAssignment(details: SubmitAssignment): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<SubmitAssignment, BaseAPIResponseModel<string>>(`${ApiUrl.submitAssignment}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('submitAssignment', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }
  
  public saveSyllabus(details: Syllabus): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<Syllabus, BaseAPIResponseModel<string>>(`${ApiUrl.saveSyllabus}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveSyllabus', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }
  
  public updateSyllabus(details: Syllabus): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PutApi<Syllabus, BaseAPIResponseModel<string>>(`${ApiUrl.updateSyllabus}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('updateSyllabus', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }
  
  public updateAttendance(data: Attendance): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PutApi<Syllabus, BaseAPIResponseModel<string>>(`${ApiUrl.updateAttendance}`, data).pipe(
      catchError(err => {
        return throwError(() => this.handleError('updateSyllabus', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }
  
  public saveAssociation(details: Association): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<Association, BaseAPIResponseModel<string>>(`${ApiUrl.saveAssociation}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveAssociation', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }
  
  public linkUnlinkStudentWithAssociation(details: LinkStudentWithClass): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<LinkStudentWithClass, BaseAPIResponseModel<string>>(`${ApiUrl.linkUnlinkStudentWithAssociation}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('linkUnlinkStudentWithAssociation', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }
  
  public saveAttendence(data:Attendance): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<Attendance, BaseAPIResponseModel<string>>(`${ApiUrl.saveAttendence}`, data).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveAttendence', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }
  
  public updateAttendence(data:Attendance): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PutApi<Attendance, BaseAPIResponseModel<string>>(`${ApiUrl.updateAttendence}`, data).pipe(
      catchError(err => {
        return throwError(() => this.handleError('updateAttendence', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  
  public saveSubject(details:Subject): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<Subject, BaseAPIResponseModel<string>>(`${ApiUrl.saveSubject}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveSubject', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public saveChapter(details:SaveChapter): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<SaveChapter, BaseAPIResponseModel<string>>(`${ApiUrl.saveChapter}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveChapter', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public updateChapter(details:Subject): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PutApi<Subject, BaseAPIResponseModel<string>>(`${ApiUrl.updateChapter}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('updateChapter', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public saveNotes(data:any): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<any, BaseAPIResponseModel<string>>(`${ApiUrl.saveNotes}`, data).pipe(
      catchError(err => {
        return throwError(() => this.handleError('saveChapter', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public updateAssociation(details: Association): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PutApi<Association, BaseAPIResponseModel<string>>(`${ApiUrl.updateAssociation}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('updateAssociation', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }
  
  public updateSubject(details: Association): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PutApi<Association, BaseAPIResponseModel<string>>(`${ApiUrl.updateSubject}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('updateSubject', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }
  
  public submitExamNumbers(details: SubmitExamNumbers): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<SubmitExamNumbers, BaseAPIResponseModel<string>>(`${ApiUrl.submitExamNumbers}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('submitExamNumbers', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }
  
  public updateAssignment(details: Assignment): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PutApi<Assignment, BaseAPIResponseModel<string>>(`${ApiUrl.updateAssignment}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('updateAssignment', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }
  
  public examineAssignment(details: ExamineAssignment): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.PostApi<ExamineAssignment, BaseAPIResponseModel<string>>(`${ApiUrl.examineAssignment}`, details).pipe(
      catchError(err => {
        return throwError(() => this.handleError('examineAssignment', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }
  
  public getAllAssignment(): Observable<BaseAPIResponseModel<Array<Assignment>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<Assignment>>>(`${ApiUrl.getAllAssignment}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getAllAssignment', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public getAllExam(): Observable<BaseAPIResponseModel<Array<Exam>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<Exam>>>(`${ApiUrl.getAllExam}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getAllExam', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public getSubmittedExams(id:number): Observable<BaseAPIResponseModel<Array<ExamNumbers>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<ExamNumbers>>>(`${ApiUrl.getSubmittedExams}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getSubmittedExams', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public getExamById(id:number): Observable<BaseAPIResponseModel<Exam>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Exam>>(`${ApiUrl.getExamById}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getExamById', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public getAssignmentByDate(startDate:any,endDate:any): Observable<BaseAPIResponseModel<Array<Assignment>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<Assignment>>>(`${ApiUrl.getAssignmentByDate}${startDate}&endDate=${endDate}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getAssignmentByDate', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public getTodayAttendance(id:number): Observable<BaseAPIResponseModel<Array<GetAttendance>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<GetAttendance>>>(`${ApiUrl.getTodayAttendance}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getTodayAttendance', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public getAttendanceByClassAndDate(id:number,date:string): Observable<BaseAPIResponseModel<GetAttendanceByClassAndDate>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<GetAttendanceByClassAndDate>>(`${ApiUrl.getAttendanceByClassAndDate}${id}&date=${date}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getAttendanceByClassAndDate', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public getSubmitAssignmentStudents(id:number): Observable<BaseAPIResponseModel<Array<SubmittedAssignmentStudentList>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<SubmittedAssignmentStudentList>>>(`${ApiUrl.getSubmitAssignmentStudents}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getSubmitAssignmentStudents', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public getAssignmnetRemainingStudents(id:number): Observable<BaseAPIResponseModel<AssignmentRemainingStudent>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<AssignmentRemainingStudent>>(`${ApiUrl.getAssignmnetRemainingStudents}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getAssignmnetRemainingStudents', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public getSyllabusById(id:number): Observable<BaseAPIResponseModel<Syllabus>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Syllabus>>(`${ApiUrl.getSyllabusById}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getSyllabusById', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }

  public getMapStudentAssoction(id:number): Observable<BaseAPIResponseModel<Array<MapStudentClass>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<MapStudentClass>>>(`${ApiUrl.getMapStudentAssoction}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getMapStudentAssoction', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public getAllNotes(): Observable<BaseAPIResponseModel<Array<Notes>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<Notes>>>(`${ApiUrl.getAllNotes}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getAllNotes', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public getNotesById(id:number): Observable<BaseAPIResponseModel<Notes>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Notes>>(`${ApiUrl.getNotesById}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getNotesById', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public deleteClass(id: number): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.DeleteApi<number, BaseAPIResponseModel<string>>(`${ApiUrl.deleteClass}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('deleteClass', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public deleteExam(id: number): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.DeleteApi<number, BaseAPIResponseModel<string>>(`${ApiUrl.deleteExam}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('deleteExam', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public deleteAssignment(id: number): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.DeleteApi<number, BaseAPIResponseModel<string>>(`${ApiUrl.deleteAssignment}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('deleteAssignment', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public deleteChapter(id: number): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.DeleteApi<number, BaseAPIResponseModel<string>>(`${ApiUrl.deleteChapter}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('deleteChapter', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public deleteSyllabus(id: number): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.DeleteApi<number, BaseAPIResponseModel<string>>(`${ApiUrl.deleteSyllabus}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('deleteSyllabus', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public deleteSubject(id: number): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.DeleteApi<number, BaseAPIResponseModel<string>>(`${ApiUrl.deleteSubject}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('deleteSubject', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public deleteNotes(id: number): Observable<BaseAPIResponseModel<string>> {
    this.processing(true);
    return this.webApiService.DeleteApi<number, BaseAPIResponseModel<string>>(`${ApiUrl.deleteNotes}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('deleteNotes', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public getAllClasses(): Observable<BaseAPIResponseModel<Array<Association>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<Association>>>(`${ApiUrl.getAllClasses}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getAllClasses', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
   

  
  public getAllSubject(): Observable<BaseAPIResponseModel<Array<Subject>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<Subject>>>(`${ApiUrl.getAllSubject}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getAllSubject', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }

  public getAllChapters(): Observable<BaseAPIResponseModel<Array<Chapter>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<Chapter>>>(`${ApiUrl.getAllChapters}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getAllChapters', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }

  public getAllSyllabus(): Observable<BaseAPIResponseModel<Array<Syllabus>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<Syllabus>>>(`${ApiUrl.getAllSyllabus}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getAllSyllabus', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }

  public getChapterById(id:number): Observable<BaseAPIResponseModel<Chapter>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Chapter>>(`${ApiUrl.getChapterById}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getChapterById', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public getClasseById(id:number): Observable<BaseAPIResponseModel<Association>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Association>>(`${ApiUrl.getClasseById}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getClasseById', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public getAssociationDetailsById(id:number): Observable<BaseAPIResponseModel<AssocationDetails>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<AssocationDetails>>(`${ApiUrl.getAssociationDetailsById}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getAssociationDetailsById', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public getSubjectById(id:number): Observable<BaseAPIResponseModel<Subject>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Subject>>(`${ApiUrl.getSubjectById}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getSubjectById', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public getSubjectByAssociationId(id:number): Observable<BaseAPIResponseModel<Array<Subject>>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Array<Subject>>>(`${ApiUrl.getSubjectByAssociationId}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getSubjectByAssociationId', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
    );
  }
  
  public getAssignmentById(id:number): Observable<BaseAPIResponseModel<Assignment>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Assignment>>(`${ApiUrl.getAssignmentById}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getAssignmentById', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }
  
  public getAssignmentByStudentAndAssignmentId(studentId:number,assignemntId:number): Observable<BaseAPIResponseModel<Assignment>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Assignment>>(`${ApiUrl.getAssignmentByStudentAndAssignmentId}${studentId}/assignment/${assignemntId}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getAssignmentByStudentAndAssignmentId', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }

  public getSubmittedAssignmentById(id:number): Observable<BaseAPIResponseModel<Assignment>> {
    this.processing(true);
    return this.webApiService.GetApi<BaseAPIResponseModel<Assignment>>(`${ApiUrl.getSubmittedAssignmentById}${id}`).pipe(
      catchError(err => {
        return throwError(() => this.handleError('getSubmittedAssignmentById', err));
      }))
      .pipe(
        tap((response) => {
          this.processing(false);
        }),
      );
  }
  
}
