import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class ReferralService {

  constructor(
    private http: HttpClient
  ) { }

  getCompanyLst(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'companylist/')
  }

  getProductListByCompany(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productlistbycomid/' + id)
  }

  getProgramListByCompany(id): Observable<any> {
    //return this.http.get(environment.apiEndpoint + 'programlistbycomid/' + id)
    return this.http.get(environment.apiEndpoint + 'programlistbypid/' + id)
    
  }

  addReferral(data) {
    return this.http.post(environment.apiEndpoint + 'userreferral/', data)
  }

  updateReferral(data) {
    //return this.http.post(environment.apiEndpoint + 'reflinkcountupdate/', data)
    return this.http.post(environment.apiEndpoint + 'reflinkcountupdate/', data)
    
  }

  getUserReferralList(id) {
    return this.http.get(environment.apiEndpoint + 'userreferrallist/' + id)
  }

  getZipCode(data) {
    return this.http.post(environment.apiEndpoint + 'zipcodegetorupdate/', data)
  }

  getProfile(data) {
    return this.http.post(environment.apiEndpoint + 'zipcodegetorupdate/', data)
  }
 
}
