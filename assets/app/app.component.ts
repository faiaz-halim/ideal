import { Component, OnInit} from '@angular/core';
import { Router, NavigationStart, NavigationEnd} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location, PopStateEvent } from "@angular/common";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    makes:string[] = ["-10px -4px", "-126px -4px", "-242px -4px", "-358px -4px", "-474px -4px","-590px -4px",
                   "-10px -79px","-126px -79px","-242px -79px"/*,"-358px -79px"*/,"-474px -79px","-590px -79px",
              "-10px -153px","-126px -153px","-242px -153px","-358px -153px","-474px -153px","-590px -153px",
              "-10px -227px","-126px -227px","-242px -227px",/*"-358px -227px",*/"-474px -227px","-590px -227px",
              "-10px -302px","-126px -302px","-242px -302px","-358px -302px","-474px -302px","-590px -302px",
              "-10px -376px","-126px -376px","-242px -376px","-358px -376px","-474px -376px","-590px -376px",
              "-10px -450px","-126px -450px","-242px -450px","-358px -450px","-474px -450px","-590px -450px"]

   constructor(private router: Router, private location: Location) {}
   ngOnInit() {
        this.location.subscribe((ev:PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this.router.events.subscribe((ev:any) => {
            if (ev instanceof NavigationStart) {
                if (ev.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);
            } else if (ev instanceof NavigationEnd) {
                if (ev.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else
                    window.scrollTo(0, 0);
            }
        });
    }
   servicesPage(){
      this.router.navigate(['/services']);
   }
}
