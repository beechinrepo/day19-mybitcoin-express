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
  tr: any;
  orderId: string;

  constructor(private transSvc: TransactService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.params.orderId;
    this.tr = this.transSvc.getOrderDetails(this.orderId);
  }
}

