import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare const jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      document.body.scrollTop = 0;
      //jQuery('#navbarSupportedContent').collapse('hide');
    });


  }

}
