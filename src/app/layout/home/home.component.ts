import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit() {
  }

}
