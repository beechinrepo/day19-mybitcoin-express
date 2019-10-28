import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BitcoinService } from '../services/bitcoin.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'; // ActivatedRoute, ParamMap
import { Order } from '../models/transact';
import { TransactService } from '../services/transact.service';
import { switchMap } from 'rxjs/operators';  // added
import { resetFakeAsyncZone } from '@angular/core/testing'; // added

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
    rate: 0, // added
    total: 0 // added
  };
  todayDate = new Date(); // Tue Oct 15 2019 15:47:39 GMT+0800 (Singapore Standard Time)
  yearDate = new Date();

  bitcoin = { ask: 0, bid: 0 };
  rate = 0;
  transactionAmount = 0;
  selectedOrderId = ''; // added

  constructor(private transSvc: TransactService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private btcSvc: BitcoinService,
              private router: Router) {
    this.transactForm = this.createFormGroup();

    this.btcSvc.getPrice().then((result) => {
      console.log(result);
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

    this.yearDate.setFullYear(this.todayDate.getFullYear() - 21);
  }

  // convenience getter for easy access to form fields
  get f() { return this.transactForm.controls; }

  createFormGroup() {
     return new FormGroup({
      name: new FormControl(this.model.name, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]), 
      contact: new FormControl(this.model.contact, [Validators.required, Validators.pattern('^[8-9][0-9]{7}$')]),
      gender: new FormControl(this.model.gender, [Validators.required]),
      dob: new FormControl(this.model.dob, [Validators.required]),
      orderDate: new FormControl(this.model.orderDate, [Validators.required]),
      orderType: new FormControl(this.model.orderType, [Validators.required]),
      unit: new FormControl(this.model.unit, [Validators.required]),
      btcAddress: new FormControl(this.model.btcAddress, [Validators.required]),
      // *:multiple occurence of preceding. $:end. ^:bgn. Validators.pattern('^[0-9]*$'
      // email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  calculatePrice($event) {
    this.rate = (this.transactForm.value.orderType === 'Buy') ? this.bitcoin.ask : this.bitcoin.bid;
    this.transactionAmount = $event.target.value * this.rate;
  }

  changeType() {
      this.rate = (this.transactForm.value.orderType === 'Buy') ? this.bitcoin.ask : this.bitcoin.bid;
      this.transactionAmount = this.transactForm.value.unit * this.rate;
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
    this.transSvc.updateOrderDetails(this.selectedOrderId, save).then(response => {
      this.router.navigate(['/confirm/' + this.selectedOrderId]);
    });
    // wrg- this.transSvc.saveCurrentTransaction(save);
    // this.router.navigate(['/confirm']);
  }
}
