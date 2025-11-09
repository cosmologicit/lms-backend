import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable as __Observable, throwError } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { StrictHttpResponse as __StrictHttpResponse } from './strict-http-response';
import { BaseService } from './base-service';
import { AppBaseService } from '../api-services/base/base-service';
import { environment } from 'src/enviroments/enviroment';
@Injectable({
  providedIn: 'root'
})
export class WebApiService extends BaseService {

  constructor(http: HttpClient,private appBaseService:AppBaseService) {
    super(http);
  }

  private GetApiResponse<T>(endpoint: string): __Observable<__StrictHttpResponse<T>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      environment.lmsEndPoint + endpoint,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<T>;
      })
    );
  }

  GetApi<T>(endpoint: string): __Observable<T> {
    return this.GetApiResponse(endpoint).pipe(
      __map(_r => _r.body as T)
    );
  }

  private GetApiWithRequestDataResponse<TRequest, TResponse>(endpoint: string, requestData: TRequest): __Observable<__StrictHttpResponse<TResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = requestData;
    let req = new HttpRequest<any>(
      'GETWITHREQUEST',
      environment.lmsEndPoint + endpoint,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TResponse>;
      })
    );
  }

  GetApiWithRequestData<TRequest, TResponse>(endpoint: string, requestData: TRequest): __Observable<TResponse> {
    return this.GetApiWithRequestDataResponse(endpoint, requestData).pipe(
      __map(_r => _r.body as TResponse)
    ); 
  }

  private PostApiResponse<TRequest, TResponse>(endpoint: string, requestData: TRequest): __Observable<__StrictHttpResponse<TResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = requestData;
    let req = new HttpRequest<any>(
      'POST',
      environment.lmsEndPoint + endpoint,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TResponse>;
      })
    );
  }

  PostApi<TRequest, TResponse>(endpoint: string, requestData: TRequest): __Observable<TResponse> {
    return this.PostApiResponse(endpoint, requestData).pipe(
      __map(_r => _r.body as TResponse)
    ); 
  }

  private PutApiResponse<TRequest, TResponse>(endpoint: string, requestData: TRequest): __Observable<__StrictHttpResponse<TResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = requestData;
    let req = new HttpRequest<any>(
      'PUT',
      environment.lmsEndPoint + endpoint,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TResponse>;
      })
    );
  }

  PutApi<TRequest, TResponse>(endpoint: string, requestData: TRequest): __Observable<TResponse> {
     return this.PutApiResponse(endpoint, requestData).pipe(
      __map(_r => _r.body as TResponse)
    );
  }

  private DeleteApiResponse<TRequest, TResponse>(endpoint: string, requestData: TRequest | null = null): __Observable<__StrictHttpResponse<TResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = requestData;
    let req = new HttpRequest<any>(
      'DELETE',
      environment.lmsEndPoint + endpoint,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TResponse>;
      })
    );
  }

  DeleteApi<TRequest, TResponse>(endpoint: string, requestData: TRequest | null = null): __Observable<TResponse> {
    return this.DeleteApiResponse(endpoint, requestData).pipe(
      __map(_r => _r.body as TResponse)
    );
  }

  private GetLocalJsonResponse<T>(endpoint: string): __Observable<__StrictHttpResponse<T>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      endpoint,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<T>;
      })
    );
  }

  GetLocalJson<T>(endpoint: string): __Observable<T> {
    return this.GetLocalJsonResponse(endpoint).pipe(
      __map(_r => _r.body as T)
    );
  }
}
