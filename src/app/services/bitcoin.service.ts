import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor(private httpSvc: HttpClient) { }
  backendApiURL = environment.api_url;  // 'http://localhost:3000/api'
  btcPriceApiURL = `${this.backendApiURL}/price`;

  public getPrice(): Promise<any> { // public: talk w backend
    return (
      // this.httpSvc.get(`${this.btcPriceApiURL}?priCurr=SGD&secCurr=BTC`).toPromise()
      this.httpSvc.get(`https://radiant-dawn-95135.herokuapp.com/api/price?primaryCurry=SGD`).toPromise()
      // 
    );
  }
}
