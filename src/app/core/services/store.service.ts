import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
@Injectable()
export class StoreService {

  constructor(
    private http: HttpClient
  ) { }
  store(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'storelist/')
  }
  storeCashBack(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'storelistbycashback/')
  }

  
}
