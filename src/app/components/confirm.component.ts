import { Component, OnInit } from '@angular/core';
import { TransactService } from '../services/transact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  tr: any;

  constructor(private transSvc: TransactService, private router: Router) { }

  ngOnInit() {
    this.tr = this.transSvc.getCurrentTransaction();
  }

}
