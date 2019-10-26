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
  constructor(private transactSvc: TransactService, private router: Router) {}

  ngOnInit() {
    this.transactSvc.getList().then(all => {
      this.list = all;
      console.log('list: ', all);
    });
  }

  navigateToEditOrder(orderId) {
    this.router.navigate(['/edit/' + orderId]);
  }
}
