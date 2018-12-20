import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) { }

  updatePassword(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'userupdatepassword/', data)
  }
  getProfile(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'userUpdate/' + id + '/')
  }

  updatemyProfile(id,data): Observable<any> {
    console.log(id);
    console.log(data);
    return this.http.post(environment.apiEndpoint + 'userUpdate/'+id, data)
  }
}
