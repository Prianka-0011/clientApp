import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientApp';
  constructor(private router : Router ) {

  }
  onClickJob() {
  this.router.navigate(["/jobs"]);
  }
}
