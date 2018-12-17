import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogCategorySlug: string;
  blogSubCategorySlug: string;
  blogSubChildCategorySlug: string;
  blogCategoryId: number;
  categoryName: string;
  isVisible: boolean;
  isCard: boolean;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(val => {
      if (val['sub_child_cat_slug']) {
        this.blogSubChildCategorySlug = val['sub_child_cat_slug'];
      }
      if (val['sub_cat_slug']) {
        this.blogSubCategorySlug = val['sub_cat_slug'];
        //alert(this.blogSubCategorySlug);
      }
      if (val['cat_slug']) {
        this.blogCategorySlug = val['cat_slug'];
        
      }
      this.isCard = false;
      this.isVisible = false;
      this.loadData();
    });
  }

  ngOnInit() {

  }

  loadData() {
    if (this.blogSubChildCategorySlug != undefined && this.blogSubCategorySlug != undefined && this.blogCategorySlug != undefined) {
      this.getCategorySlugInfo(this.blogSubChildCategorySlug)
    }
    else if (this.blogSubCategorySlug != undefined && this.blogCategorySlug != undefined) {
      this.getCategorySlugInfo(this.blogSubCategorySlug)
    }
    else if (this.blogCategorySlug != undefined) {
      this.getCategorySlugInfo(this.blogCategorySlug)
    }

  }

  getCategorySlugInfo(slug) {
    this.blogService.getSlugInfo(slug).subscribe(
      res => {
        
        this.blogCategoryId = res['result']['id']
        this.categoryName = res['result']['title']
        var parent_Slug;
        var grand_parent_slug;
        
        if (res['result']['parent'] != undefined) {
          parent_Slug = res['result']['parent'][0]['slug'];
          if (res['result']['parent'][0]['grand_parent'] != undefined) {
            grand_parent_slug = res['result']['parent'][0]['grand_parent'][0]['slug'];
          }
        }
        
        if (grand_parent_slug != undefined && this.blogCategorySlug != undefined && grand_parent_slug == this.blogCategorySlug) {
          if (parent_Slug != undefined && this.blogSubCategorySlug != undefined && parent_Slug != this.blogSubCategorySlug) {
            this.router.navigateByUrl('/404');
          }
        }
        else if (parent_Slug != undefined && this.blogCategorySlug != undefined && parent_Slug != this.blogCategorySlug) {
          this.router.navigateByUrl('/404');
        }

        if (this.blogCategorySlug == "cards") {
          this.isCard = true;
        }
        this.isVisible = true;
      },
      error => {

        this.router.navigateByUrl('/404');
      }
    )
  }

}
