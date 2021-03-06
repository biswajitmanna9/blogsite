import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProfileService {
  @Output() getProfileUpdateStatus: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) { }

  updatePassword(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'userupdatepassword/', data)
  }
  getProfile(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'userUpdate/' + id + '/')
  }

  updatemyProfile(id,profileImage,data): Observable<any> {
   // return this.http.post(environment.apiEndpoint + 'userUpdate/'+id, data)
   const formData: FormData = new FormData();
   if (data) {
     for (let key in data) {
         formData.append(key, data[key])
     }
     if(profileImage) { 
       formData.append('profile_image', profileImage, profileImage.name);
     }
     
     console.log(formData);
   }
   return this.http.post(environment.apiEndpoint + 'userUpdate/'+id, formData)
  }

  updateProfileStatus(data): Observable<any> {
    if (data = true) {
      this.getProfileUpdateStatus.emit(true);
      return
    }
  }
}
