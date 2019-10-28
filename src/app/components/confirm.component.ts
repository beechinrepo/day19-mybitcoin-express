import { Component, OnInit } from '@angular/core';
import { TransactService } from '../services/transact.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../models/transact';
// import { Order } from '../models/transact';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})

export class ConfirmComponent implements OnInit {
  confirmData: Order = { // initial values-if not, TypeError: Cannot read property 'orderType' of undefined
    name: '',
    contact: '',
    gender: '',
    dob: '',
    orderDate: '',
    orderType: '',
    unit: null,
    btcAddress: '',
    rate: 0, // added
    total: 0 // added
  };
  orderId: any;
  constructor(private transSvc: TransactService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.params.orderId;
    this.transSvc.getOrderDetails(this.orderId).then(response => {
      if (response != null) {
        this.confirmData = response;
        // console.log(typeof(this.orderType));-the issue
        // console.log(typeof(this.confirmData.orderType));
      } else {
        console.log('error');
      }
    });
    // this.confirmData = this.transSvc.getOrderDetails(this.orderId);
  }
}

