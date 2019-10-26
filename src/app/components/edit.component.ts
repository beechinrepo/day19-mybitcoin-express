import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BitcoinService } from '../services/bitcoin.service';
import { Router } from '@angular/router';
import { Order } from '../models/transact';
import { TransactService } from '../services/transact.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  transactForm: FormGroup;
  model: Order = {
    name: '',
    contact: '',
    gender: '',
    dob: '',
    orderDate: '',
    orderType: '',
    unit: null,
    btcAddress: ''
  };
  todayDate = new Date(); // Tue Oct 15 2019 15:47:39 GMT+0800 (Singapore Standard Time)
  yearDate = new Date();

  bitcoin = {ask: 0, bid: 0};
  rate = 0;
  transactionAmount = 0;

  constructor(private formBuilder: FormBuilder, private btcSvc: BitcoinService, private transSvc: TransactService, private router: Router) {
    this.transactForm = this.createFormGroup();

    this.btcSvc.getPrice().then((result) => {
      console.log(result); this.bitcoin = result; })
      .catch(
        () => { console.log('API Error'); this.bitcoin = {ask: 1700, bid: 11600}; }
    );
  }

  ngOnInit() {
    this.yearDate.setFullYear(this.todayDate.getFullYear() - 21);
  }

  // convenience getter for easy access to form fields
  get f() { return this.transactForm.controls; }

  createFormGroup() {
     return new FormGroup({
    // transactForm: FormGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
      contact: new FormControl('', [Validators.required, Validators.pattern('^[8-9][0-9]{7}$')]),
      gender: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      orderDate: new FormControl('', [Validators.required]),
      orderType: new FormControl('Buy', [Validators.required]),
      unit: new FormControl('', [Validators.required]),  // *:multiple occurence of preceding. $:end. ^:bgn. Validators.pattern('^[0-9]*$'
      btcAddress: new FormControl('', [Validators.required]),
      // email: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  calculatePrice($event) {
    this.rate = (this.transactForm.value.orderType === 'Buy') ? this.bitcoin.ask : this.bitcoin.bid;
    this.transactionAmount = $event.target.value * this.rate;
  }

  changeType(e) {
    if (this.transactForm.value.orderType === 'Sell') {
      this.transactForm.get('btcAddress').setValidators(null);
      this.transactForm.get('btcAddress').setErrors(null);
      console.log('changed ordertype');
    }
  }

  cancel() {
    this.router.navigate(['']);
  }

  onSubmit() {
    const val = this.transactForm.value;
    const save: Order = {
      name: val.name,
      contact: val.contact,
      gender: val.gender,
      dob: val.dob,
      orderDate: val.orderDate,
      orderType: val.orderType,
      unit: val.unit,
      btcAddress: (val.orderType === 'Buy') ? val.btcAddress : null,
      rate: this.rate,
      total: this.transactionAmount
    };
    console.log(save);
    this.transSvc.saveCurrentTransaction(save);
    this.router.navigate(['/confirm']);
  }
}
