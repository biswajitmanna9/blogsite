import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class NewsletterService {

  constructor(private http: HttpClient) { }

  subscribe(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'userregister/', data)
  }

}
