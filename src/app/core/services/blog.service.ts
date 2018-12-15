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

  getBlogListByCategory(id,user_id,params): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'bloglistbycatid/' + id + '/'+ user_id + '/?'+params)
  }

  getBlogDetails(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'blogdetailsbyid/' + id + '/')
  }

  addcomment(data) {
    return this.http.post(environment.apiEndpoint + 'addcomment/', data)
  }

  getTagListByCategory(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'taglistbycatid/' + id + '/')
  }

  getSubCategoryByCategory(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'subcategorylistbycatid/' + id + '/')
  }

  getMostRecentBlogList(data): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'bloglistmostrecent/'+data)
  }

  getHomeBannerContentList() {
    return this.http.get(environment.apiEndpoint + 'homepagebannerdetails/')
  }

  getApplyLink(blsug, lat, long) {
    return this.http.get(environment.apiEndpoint + 'reflinkbybsluglatlong/' + blsug + '/' + lat + '/' + long + '/')
  }

  userAddLike(data) {
    console.log(data);
    return this.http.post(environment.apiEndpoint + 'bloglikeordislike/', data)
  }

  getAllBlogList(user_id,params): Observable<any> {
    //return this.http.get(environment.apiEndpoint + 'bloglistwithoutcardcat/' + user_id +'/?'+params )
    return this.http.get(environment.apiEndpoint + 'bloglistwithoutcardcatuser/' + user_id +'/?'+params )
  }

  getAllSearchBlogList(search_key,user_id): Observable<any> {
    if(user_id) {
      return this.http.get(environment.apiEndpoint + 'bloglistwithoutcardcatsearch/' + search_key)
    }
    else {
      return this.http.get(environment.apiEndpoint + 'bloglistwithoutcardcat/' + search_key+'/'+user_id)
    }
   // return this.http.get(environment.apiEndpoint + 'bloglistwithoutcardcat/' + search_key+'/'+user_id)
  }

  getPopularSearch(user_id): Observable<any> {
    console.log(environment.apiEndpoint + 'bloglistwithoutcardbylikecount/'+user_id);
    return this.http.get(environment.apiEndpoint + 'bloglistwithoutcardbylikecount/'+user_id)
  }
  
  getBlogListByTag(cat_id,tag_name): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'postListByTagName/' + cat_id + '/'+ tag_name)
  }

  
  getTopCategory(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'topcategorylistbypostcount/')
  }


}