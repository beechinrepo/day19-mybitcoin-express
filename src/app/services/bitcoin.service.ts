import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor(private httpSvc: HttpClient) { }
  backendApiURL = environment.api_url;  // 'http://localhost:3000/api': can't work so nt using
  btcPriceApiURL = `${this.backendApiURL}/price`;

  public getPrice(): Promise<any> { // public: talk w backend
    return (
      // this.httpSvc.get<any>(this.btcPriceApiURL).toPromise()
      // this.httpSvc.get(`${this.btcPriceApiURL}?priCurr=SGD&secCurr=BTC`).toPromise()
      // Checked at ARC tt backend(localhost:3000/api/price?primaryCurry=SGD) works, but can't work for frontend
      this.httpSvc.get(`https://radiant-dawn-95135.herokuapp.com/api/price?primaryCurry=SGD`).toPromise()
      // this.httpSvc.get(`${this.btcPriceApiURL}?primaryCurry=SGD`).toPromise()
      // this.httpSvc.get<any>(`${this.btcPriceApiURL}?primaryCurry=SGD`).toPromise()
    );
  }
}
