import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-category-details',
  templateUrl: './blog-category-details.component.html',
  styleUrls: ['./blog-category-details.component.scss']
})
export class BlogCategoryDetailsComponent implements OnInit {
  blog_category_id: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.blog_category_id = this.route.snapshot.params['id']
  }

}
