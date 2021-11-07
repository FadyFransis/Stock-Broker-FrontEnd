import { Router, NavigationEnd } from '@angular/router';

export class SharedService {

    constructor(
        private router: Router,
    ) { }
    forceReloadPage = () => { 
        //#region to force reload page in route navigation for search 
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
    
        this.router.events.subscribe((evt) => {
          if (evt instanceof NavigationEnd) {
            this.router.navigated = false;
            window.scrollTo(0, 0);
          }
        });
        //#endregion 


    }
}