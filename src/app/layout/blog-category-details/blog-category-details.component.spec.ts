import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCategoryDetailsComponent } from './blog-category-details.component';

describe('BlogCategoryDetailsComponent', () => {
  let component: BlogCategoryDetailsComponent;
  let fixture: ComponentFixture<BlogCategoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogCategoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
