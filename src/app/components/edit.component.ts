import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BitcoinService } from '../services/bitcoin.service';
<<<<<<< HEAD
import { Router, ActivatedRoute, ParamMap } from '@angular/router'; // ActivatedRoute, ParamMap
import { Order } from '../models/transact';
import { TransactService } from '../services/transact.service';
import { switchMap } from 'rxjs/operators';  // added
import { resetFakeAsyncZone } from '@angular/core/testing'; // added
=======
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Order } from '../models/transact';
import { TransactService } from '../services/transact.service';
import { switchMap } from 'rxjs/operators';
import { resetFakeAsyncZone } from '@angular/core/testing';
>>>>>>> 300604651fb1f454def9fa1fe7e2d833fd57c6cc

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
    btcAddress: '',
<<<<<<< HEAD
    rate: 0, // added
    total: 0 // added
=======
    rate: 0,
    total: 0
>>>>>>> 300604651fb1f454def9fa1fe7e2d833fd57c6cc
  };
  todayDate = new Date(); // Tue Oct 15 2019 15:47:39 GMT+0800 (Singapore Standard Time)
  yearDate = new Date();

  bitcoin = { ask: 0, bid: 0 };
  rate = 0;
  transactionAmount = 0;
<<<<<<< HEAD
  selectedOrderId = ''; // added

  constructor(private transSvc: TransactService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private btcSvc: BitcoinService,
              private router: Router) {
=======
  selectedOrderId = "";

  constructor(private transactSvc: TransactService, private route: ActivatedRoute, private formBuilder: FormBuilder, private btcSvc: BitcoinService, private transSvc: TransactService, private router: Router) {
>>>>>>> 300604651fb1f454def9fa1fe7e2d833fd57c6cc
    this.transactForm = this.createFormGroup();

    this.btcSvc.getPrice().then((result) => {
      console.log(result);
<<<<<<< HEAD
      this.bitcoin = result.BTCSGD; // added .BTCSGD
    })
      .catch(
        () => {
          console.log('API Error');
          this.bitcoin = { ask: 1700, bid: 11600 };
        }
    );
  }

  ngOnInit() {
    const selectedId = this.route.snapshot.paramMap.get('orderId');  // all added
    this.selectedOrderId = this.route.snapshot.paramMap.get('orderId');
    this.transSvc.getOrderDetails(selectedId).then(response => {
      this.transactForm.setValue({ name: response.name, contact: response.contact,
        gender: response.gender, dob: response.dob, orderDate: response.orderDate,
        orderType: response.orderType, unit: response.unit, btcAddress: response.btcAddress });
      this.transactionAmount = response.total;
      // console.log(this.transactForm.value.orderType);
      if (this.transactForm.value.orderType === 'Sell') { // i edited
        this.transactForm.get('btcAddress').setValidators(null);
        this.transactForm.get('btcAddress').setErrors(null);
        // console.log('no nd btcAdd for Sell');
      } else {
        this.transactForm.get('btcAddress').setValidators(Validators.required);
      }
    });

=======
      this.bitcoin = result.BTCSGD;
    })
      .catch(
      () => {
        console.log('API Error');
        this.bitcoin = { ask: 1700, bid: 11600 };
      }
      );
  }

  ngOnInit() {
    const selectedId = this.route.snapshot.paramMap.get('orderId');
    this.selectedOrderId = this.route.snapshot.paramMap.get("orderId");
    this.transactSvc.getOrderDetails(selectedId).then(response => {
      this.transactForm.setValue({ name: response.name, contact: response.contact, gender: response.gender, dob: response.dob, orderDate: response.orderDate, orderType: response.orderType, unit: response.unit, btcAddress: response.btcAddress });
      this.transactionAmount = response.total;
    });
>>>>>>> 300604651fb1f454def9fa1fe7e2d833fd57c6cc
    this.yearDate.setFullYear(this.todayDate.getFullYear() - 21);
  }

  // convenience getter for easy access to form fields
  get f() { return this.transactForm.controls; }

  createFormGroup() {
<<<<<<< HEAD
     return new FormGroup({
      name: new FormControl(this.model.name, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]), 
=======
    return new FormGroup({
      // transactForm: FormGroup = new FormGroup({
      name: new FormControl(this.model.name, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
>>>>>>> 300604651fb1f454def9fa1fe7e2d833fd57c6cc
      contact: new FormControl(this.model.contact, [Validators.required, Validators.pattern('^[8-9][0-9]{7}$')]),
      gender: new FormControl(this.model.gender, [Validators.required]),
      dob: new FormControl(this.model.dob, [Validators.required]),
      orderDate: new FormControl(this.model.orderDate, [Validators.required]),
      orderType: new FormControl(this.model.orderType, [Validators.required]),
<<<<<<< HEAD
      unit: new FormControl(this.model.unit, [Validators.required]),
      btcAddress: new FormControl(this.model.btcAddress, [Validators.required]),
      // *:multiple occurence of preceding. $:end. ^:bgn. Validators.pattern('^[0-9]*$'
=======
      unit: new FormControl(this.model.unit, [Validators.required]),  // *:multiple occurence of preceding. $:end. ^:bgn. Validators.pattern('^[0-9]*$'
      btcAddress: new FormControl(this.model.btcAddress, [Validators.required]),
>>>>>>> 300604651fb1f454def9fa1fe7e2d833fd57c6cc
      // email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  calculatePrice($event) {
    this.rate = (this.transactForm.value.orderType === 'Buy') ? this.bitcoin.ask : this.bitcoin.bid;
    this.transactionAmount = $event.target.value * this.rate;
  }

  // changeType() {
  //   if (this.transactForm.value.orderType === 'Sell') {
  //     this.transactForm.get('btcAddress').setValidators(null);
  //     this.transactForm.get('btcAddress').setErrors(null);
  //     console.log('changed ordertype');
  //   }
  // }

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
    this.transSvc.updateOrderDetails(this.selectedOrderId, save).then(response => {
      this.router.navigate(['/confirm/' + this.selectedOrderId]);
    });
<<<<<<< HEAD
    // wrg- this.transSvc.saveCurrentTransaction(save);
    // this.router.navigate(['/confirm']);
=======

>>>>>>> 300604651fb1f454def9fa1fe7e2d833fd57c6cc
  }
}
