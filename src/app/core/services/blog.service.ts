import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class BlogService {

  constructor(
    private http: HttpClient
  ) { }

  getCategoryList(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'categorylist/')
  }

  getSlugInfo(slug) {
    return this.http.get(environment.apiEndpoint + 'checkslug/' + slug + '/')
  }

  getBlogListByCategory(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'bloglistbycatid/' + id + '/')
  }

  getBlogDetails(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'blogdetailsbyid/' + id + '/')
  }
  
}
