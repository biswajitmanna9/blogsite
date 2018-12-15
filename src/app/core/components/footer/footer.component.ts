import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  mostRecentBlogListFooter: any = [];
  userId:string
  constructor(
    private blogService: BlogService,
    private router: Router,
  ) { }

  ngOnInit() {
    if(localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId');
    }
    else {
      this.userId ="";
    }
    this.getMostRecentBlogList(this.userId);
  }
  getMostRecentBlogList(data) {
    this.blogService.getMostRecentBlogList(data).subscribe(
      res => {
        this.mostRecentBlogListFooter = res['result'];
        console.log("Footer Most Recent Deals==>",this.mostRecentBlogListFooter);
      },
      error => {
      }
    )
  }
  goToDetails(blog) {
    console.log('/' + blog.parent_category_slug + '/details/' + blog.blog_url);
    this.router.navigateByUrl('/' + blog.parent_category_slug + '/details/' + blog.blog_url);
  }


}
