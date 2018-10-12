import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class SideNavComponent implements OnInit {

  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: any;
  @Input() depth: number;
  constructor(
    public router: Router,
    private blogService: BlogService,
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {

  }

  itemToggle(item: any) {
    if (item.sub_category_details && item.sub_category_details.length) {
      this.expanded = !this.expanded;
    }
  }

  goToCategoryPage(slug: string) {
    this.goToPageByCategorySlugChecking(slug)
  }

  goToPageByCategorySlugChecking(slug) {
    this.blogService.getSlugInfo(slug).subscribe(
      res => {
        // console.log(res)
        var parent_Slug;
        var grand_parent_slug;
        if (res['result']['parent'] != undefined) {
          parent_Slug = res['result']['parent'][0]['slug'];
          if (res['result']['parent'][0]['grand_parent'] != undefined) {
            grand_parent_slug = res['result']['parent'][0]['grand_parent'][0]['slug'];
          }
        }
        
        if (grand_parent_slug != undefined && parent_Slug != undefined) {
          this.router.navigateByUrl('/' + grand_parent_slug + '/' + parent_Slug + '/' + slug);
        }
        else if (parent_Slug != undefined) {
          this.router.navigateByUrl('/' + parent_Slug + '/' + slug);
        }

      },
      error => {
        // console.log(error)
      }
    )
  }



}
