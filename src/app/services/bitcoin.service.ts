import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  URL:string='https://13ce05b8.eu.ngrok.io/https://apiv2.bitcoinaverage.com/indices/global/ticker/short?crypto=BTC&fiat=SGD';

  constructor(private httpSvc: HttpClient) { }

  getPrice(): Promise<any>{
    const headers = new HttpHeaders().set('X-testing','testing');
    return this.httpSvc.get(this.URL,{headers: headers}).toPromise();
  }

}
