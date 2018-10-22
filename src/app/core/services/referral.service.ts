import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class ReferralService {

  constructor(
    private http: HttpClient
  ) { }

  getCompanylist(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'companylist/')
  }

  addReferral(data) {
    return this.http.post(environment.apiEndpoint + 'addReferral/', data)
  }

}
