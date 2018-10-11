import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  // @Input() fburl = location.href;
  // @Input() googleurl = location.href;
  // @Input() twitterurl = location.href;
  // @Input() twittertext = '';
  // constructor(
  //   private router: Router
  // ) {
  //   if (!window['fbAsyncInit']) {
  //     window['fbAsyncInit'] = function () {
  //       window['FB'].init({
  //         appId: '413420495745137d',
  //         autoLogAppEvents: true,
  //         xfbml: true,
  //         version: 'v3.0'
  //       });
  //     };
  //   }

  //   // load facebook sdk if required
  //   const fburl = 'https://connect.facebook.net/en_US/sdk.js';
  //   if (!document.querySelector(`script[src='${fburl}']`)) {
  //     let script = document.createElement('script');
  //     script.src = fburl;
  //     document.body.appendChild(script);
  //   }

  //   // load google plus sdk if required
  //   const googleurl = 'https://apis.google.com/js/platform.js';
  //   if (!document.querySelector(`script[src='${googleurl}']`)) {
  //     let script = document.createElement('script');
  //     script.src = googleurl;
  //     document.body.appendChild(script);
  //   }

  //   // load twitter sdk if required
  //   const twitterurl = 'https://platform.twitter.com/widgets.js';
  //   if (!document.querySelector(`script[src='${twitterurl}']`)) {
  //     let script = document.createElement('script');
  //     script.src = twitterurl;
  //     document.body.appendChild(script);
  //   }
  // }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    // // render facebook button
    // window['FB'] && window['FB'].XFBML.parse();
    // // render google plus button
    // window['gapi'] && window['gapi'].plusone.go();
    // // render tweet button
    // window['twttr'] && window['twttr'].widgets.load();
  } 

}
