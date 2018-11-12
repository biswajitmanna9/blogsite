import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'app';
  currentLat: string;
  currentLong: string;
  isTracking: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {

  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((event: NavigationEnd) => {
        window.scroll(0, 0);
      });
    }
    this.trackMe();
  }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      },
        (error) => {

        });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showTrackingPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;
    localStorage.setItem('currentLat', this.currentLat);
    localStorage.setItem('currentLong', this.currentLong);
  }

}