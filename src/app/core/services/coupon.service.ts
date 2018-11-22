import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class CouponService {

  constructor(
    private http: HttpClient
  ) { }
  maxDiscountCouponList(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'maxDiscountCouponsList/')
  }

  couponListByStore(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'couponsbystoreid/'+id)
  }

}
