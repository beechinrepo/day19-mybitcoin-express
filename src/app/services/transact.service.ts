import { Injectable } from '@angular/core';
import { Itransaction } from '../models/transact';

@Injectable({
  providedIn: 'root'
})
export class TransactService {
  currentTransaction: Itransaction; 

  constructor() { }

  saveCurrentTransaction(tran: Itransaction) {
    this.currentTransaction = tran;
  }

  getCurrentTransaction(): Itransaction {
    return this.currentTransaction;
  }

}
