import { Component, OnInit } from '@angular/core';
import { TransactService } from '../services/transact.service';
import { ActivatedRoute } from '@angular/router';
// import { Order } from '../models/transact';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})

export class ConfirmComponent implements OnInit {
  confirmData: any;
  orderId: string;

  constructor(private transSvc: TransactService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.params.orderId;
    this.transSvc.getOrderDetails(this.orderId).then(response => {
      this.confirmData = response;
    });
  }
}

