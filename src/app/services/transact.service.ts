import { Injectable } from '@angular/core';
import { Itransaction } from '../models/transact';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactService {
  currentTransaction: Itransaction;
  allTransactions: Itransaction;

  constructor(private httpSvc: HttpClient) { }

  saveCurrentTransaction(tran: Itransaction) {
    this.currentTransaction = tran;
    console.log(this.currentTransaction);

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    this.httpSvc.post('http://localhost:3000/api/btc', JSON.stringify(this.currentTransaction), {
      headers: httpHeaders
    })
    .subscribe(data => {
      console.log(data);
    });
  }

  getCurrentTransaction(): Itransaction {
    return this.currentTransaction;
  }

  getAllTransactions() {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpSvc.get('http://localhost:3000/api/btc',{headers: httpHeaders})
    .subscribe(data => {
      console.log(data);
    });
  }
}
