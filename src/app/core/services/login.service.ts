import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  userLogin(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'userlogin/', data)
  }

  userSignup(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'userregister/', data)
  }

}
