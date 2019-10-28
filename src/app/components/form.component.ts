import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, RequiredValidator } from '@angular/forms';
import { Order } from '../models/transact';
import { BitcoinService } from '../services/bitcoin.service';
import { TransactService } from '../services/transact.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  transactForm: FormGroup;
  model: Order = { // initial values
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

  rate = 0;
  transactionAmount = 0;
  bitcoin = { ask: 0, bid: 0 };
<<<<<<< HEAD
  selectedOrderId = ''; // added
=======

>>>>>>> 300604651fb1f454def9fa1fe7e2d833fd57c6cc
  todayDate = new Date(); // Tue Oct 15 2019 15:47:39 GMT+0800 (Singapore Standard Time)
  yearDate = new Date();
  selectedOrderId = "";
  constructor(private btcSvc: BitcoinService,
    private transSvc: TransactService,
    private router: Router,
    private route: ActivatedRoute) {
    this.transactForm = this.createFormGroup();
  }
<<<<<<< HEAD
=======

>>>>>>> 300604651fb1f454def9fa1fe7e2d833fd57c6cc
  ngOnInit() {
    this.model.orderType = this.route.snapshot.paramMap.get('orderType');  // i edited
    console.log(this.model.orderType);
    if (this.model.orderType === 'Sell') {
      this.transactForm.get('btcAddress').setValidators(null);
      this.transactForm.get('btcAddress').setErrors(null);
    } else {
      this.transactForm.get('btcAddress').setValidators(Validators.required);
    }

    this.yearDate.setFullYear(this.todayDate.getFullYear() - 21);

    this.btcSvc.getPrice()
<<<<<<< HEAD
    .then((result) => {
      console.log(result, 'result');
      this.bitcoin = result.BTCSGD; // added .BTCSGD
    })
    .catch(error => {
      console.log(error);
=======
      .then((result) => {
        console.log(result, "result");
        this.bitcoin = result.BTCSGD;
      })
      .catch(error => {
        console.log(error);
>>>>>>> 300604651fb1f454def9fa1fe7e2d833fd57c6cc
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.transactForm.controls; }

  createFormGroup() {
<<<<<<< HEAD
     return new FormGroup({
    // transactForm: FormGroup = new FormGroup({
    //  changed all from '' to e.g. model.name
    name: new FormControl(this.model.name, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]), 
    contact: new FormControl(this.model.contact, [Validators.required, Validators.pattern('^[8-9][0-9]{7}$')]),
    gender: new FormControl(this.model.gender, [Validators.required]),
    dob: new FormControl(this.model.dob, [Validators.required]),
    orderDate: new FormControl(this.model.orderDate, [Validators.required]),
    // orderType: new FormControl(this.model.orderType, [Validators.required]),
    unit: new FormControl(this.model.unit, [Validators.required]),
    btcAddress: new FormControl(this.model.btcAddress, [Validators.required])
    });
    // *:multiple occurence of preceding. $:end. ^:bgn. Validators.pattern('^[0-9]*$'
    // email: new FormControl('', [Validators.required, Validators.email]),
  }

  calculatePrice($event) {
    console.log(this.bitcoin.ask, 'this.bitcoin.ask'); // added
    console.log(this.bitcoin.ask, 'this.bitcoin.bid'); // added
    this.rate = (this.model.orderType === 'Buy') ? this.bitcoin.ask : this.bitcoin.bid;
    console.log(this.rate, 'rate');
    this.transactionAmount = $event.target.value * this.rate;
    console.log(this.transactionAmount, 'amt'); // added
=======
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
    console.log(this.bitcoin.ask, "this.bitcoin.ask")
    this.rate = (this.transactForm.value.orderType === 'Buy') ? this.bitcoin.ask : this.bitcoin.bid;
    console.log(this.rate, "rate");
    this.transactionAmount = $event.target.value * this.rate;
    console.log(this.transactionAmount, "am")
  }

  changeType(e) {
    if (this.transactForm.value.orderType === 'Sell') {
      this.transactForm.get('btcAddress').setValidators(null);
      this.transactForm.get('btcAddress').setErrors(null);
      console.log('changed ordertype');
    }
>>>>>>> 300604651fb1f454def9fa1fe7e2d833fd57c6cc
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
      orderType: this.model.orderType,
      unit: val.unit,
      btcAddress: (this.model.orderType === 'Buy') ? val.btcAddress : null,
      rate: this.rate,
      total: this.transactionAmount
    };
<<<<<<< HEAD
    // added- .then: for void type must acct for null
    // response.id: can't put .then at srvs, nd to wait for promise to return from srvs then handle response from here
    this.transSvc.saveCurrentTransaction(save).then(response => {
      if (response != null) {
        this.router.navigate(['/confirm/' + response.id]);
        console.log(typeof(save.orderType));
        console.log(save.orderType);
      } else {
        console.log('error');
      }
    });
    // this.transSvc.saveCurrentTransaction(save);
    // // .toPromise()
    // // .then(result => {
    // //   console.log(result);
    // this.router.navigate(['/confirm']);
=======
    this.transSvc.saveCurrentTransaction(save).then(response => {
      if (response != null) {
        this.router.navigate(['/confirm/' + response.id]);
      } else {
        console.log("errror");
      }

    });

>>>>>>> 300604651fb1f454def9fa1fe7e2d833fd57c6cc
  }
}
