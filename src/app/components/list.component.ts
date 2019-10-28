import { Component, OnInit } from '@angular/core';
import { TransactService } from '../services/transact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list = [];
  constructor(private transSvc: TransactService, private router: Router) {}

  ngOnInit() {
    this.transSvc.getList().then(all => {
      this.list = all;
      console.log('list: ', all);
    });
  }

  navigateToEditOrder(orderId) {
    this.router.navigate(['/edit/' + orderId]);
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/same-route']);
  }

  deleteOrder(orderId) {
    this.transSvc.deleteOrder(orderId).then(response => {
      if (response != null) {
        // this.transSvc.getList();
        // window.location.reload();
        this.reloadComponent();
      } else {
        console.log('error');
      }
    });
  }
}
