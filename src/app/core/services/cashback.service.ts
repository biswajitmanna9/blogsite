import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class CashbackService {

  constructor(
    private http: HttpClient
  ) { }

  maxDiscountCashBackList(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'maxdiscountcashbacklist/')
  }

}
