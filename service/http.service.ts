import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../env';

const API_URL = environment.apiUrl
//export const AUTH_API_URL = API_URL + environment.apiVersionPath
const httpOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient
  ) { }

  getALL(): Observable<any> {
    return this.http.get(API_URL + "getAll");

  }

  getOrderId(sExternOrderno:string): Observable<any> {
    let params = new HttpParams()
    .set('sExternOrderno',sExternOrderno.toString())
    return this.http.get(API_URL + "getOrderId",{params:params});

  }

  // newOrderId(): Observable<any> {
  //   let param = HttpParams()
  //   return this.http.post(API_URL + "getOrderId");

  // }
}