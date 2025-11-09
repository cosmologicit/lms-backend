import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  static tokenStorageKey = 'token';
  static userIdStorageKey = 'userId';
  static role = 'role';
  static associationIdStorageId = 'associationId';
  static startTimeStorageKey = 'startTime';
  static endTimeStorageKey = 'endTime';

  constructor() { }

  public get authenticated() {
    const token = this.token;

    if (token == null || token == '')
      return false;

    return true;
  }

  public set token(value: string) {
    localStorage.setItem(AuthenticationService.tokenStorageKey, value);
  }

  public set userId(value: string | null) {
    localStorage.setItem(AuthenticationService.userIdStorageKey, value ?? '');
  }
  
  public set role(value: string) {
    localStorage.setItem(AuthenticationService.role, value);
  }
  
  public set setStartTime(value: string) {
    localStorage.setItem(AuthenticationService.startTimeStorageKey, value);
  }
  
  public set setEndTime(value: string) {
    localStorage.setItem(AuthenticationService.endTimeStorageKey, value);
  }
  
  public set associationId(value: string) {
    localStorage.setItem(AuthenticationService.associationIdStorageId, value);
  }

  public get token(): string {
    let value = localStorage.getItem(AuthenticationService.tokenStorageKey);
    if (value == null)
      return '';

    return value;
  }

  public get userId(): string {
    let value = localStorage.getItem(AuthenticationService.userIdStorageKey);
    if (value == null)
      return '';

    return value;
  }

  public get role(): string {
    let value = localStorage.getItem(AuthenticationService.role);
    if (value == null)
      return '';

    return value;
  }

  public get startTime(): string {
    let value = localStorage.getItem(AuthenticationService.startTimeStorageKey);
    if (value == null)
      return '';

    return value;
  }

  public get endTime(): string {
    let value = localStorage.getItem(AuthenticationService.endTimeStorageKey);
    if (value == null)
      return '';

    return value;
  }

  public get associationId(): string {
    let value = localStorage.getItem(AuthenticationService.associationIdStorageId);
    if (value == null)
      return '';

    return value;
  }


  public logoff = () => {
    localStorage.clear();
  }
}
