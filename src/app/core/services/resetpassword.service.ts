import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class ResetpasswordService {

  constructor(
    private http: HttpClient
  ) { }

  userResetPassword(data): Observable<any> {
    console.log(data);
    return this.http.post(environment.apiEndpoint + 'userupdatepassword/', data)
  }

}
