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

  addcomment(data) {
    return this.http.post(environment.apiEndpoint + 'addcomment/', data)
  }

}

// {
//   "title": "this is a test comment",
//   "post_id": 1, "user_id": 1, comment_parent: 2
// }
