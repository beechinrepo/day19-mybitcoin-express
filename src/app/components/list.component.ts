import { Component, OnInit } from '@angular/core';
import { BitcoinService } from '../services/bitcoin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  btcOrders = [];
  constructor(private bitcoinSvc: BitcoinService) { 
  }

  ngOnInit() {
    this.bitcoinSvc.getOrderList().then(result=>{
      console.log(result);
      this.btcOrders= result;
    })
  }

  navigateToEditOrder(orderId) {
    this.Router.navigate(['/edit/'+ orderId]);
  }
}
