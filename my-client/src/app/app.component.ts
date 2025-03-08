import { Component } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-client';
  constructor(public router: Router) {}
}
