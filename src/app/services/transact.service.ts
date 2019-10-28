import { Injectable } from '@angular/core';
import { Order } from '../models/transact';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactService {
  currentTransaction: Order;

  constructor(private httpSvc: HttpClient) { }
  backendApiURL = environment.api_url;  // 'http://localhost:3000/api'
  btcApiURL = `${this.backendApiURL}/btc`;

  public saveCurrentTransaction(tran: Order) {

    this.currentTransaction = tran;
    return this.httpSvc.post<any>(this.btcApiURL, this.currentTransaction).toPromise();
    // can't put here - .then (() => {
    //   console.log('frontend service sending current transaction: ', this.currentTransaction);
    // });
  }

  public getList(): Promise<any> {
    return this.httpSvc.get<any>(this.btcApiURL).toPromise();
  }

  public getOrderDetails(orderId): Promise<Order> {
    return this.httpSvc.get<Order>(this.btcApiURL + '/' + orderId).toPromise();
  }
  // getCurrentTransaction(): Order {
  //   return this.currentTransaction;
  // }

  public updateOrderDetails(orderId, order): Promise<any> {
    return this.httpSvc.put<any>(this.btcApiURL + '?orderId=' + orderId, order).toPromise();
  }

  public deleteOrder(orderId): Promise<any> {
    return this.httpSvc.delete<any>(this.btcApiURL + '/' + orderId).toPromise();
  }
}
