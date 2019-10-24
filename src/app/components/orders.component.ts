import { Component, OnInit } from '@angular/core';
import { TransactService } from '../services/transact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  ord: any;

  constructor(private transSvc: TransactService, private router: Router) { }

  ngOnInit() {
    this.ord = this.transSvc.getAllTransactions();
    console.log('start to view')
  }

}
