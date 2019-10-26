import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mybitcoin';

  constructor(private router: Router) { }

  buyBtc() {
    setTimeout(() => {  // try out!!!
      this.router.navigate(['form/Buy']);
    }, 400);
  }

  sellBtc() {
    setTimeout(() => {
      this.router.navigate(['form/Sell']);
    }, 400);
  }
}
