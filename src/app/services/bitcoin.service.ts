import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor(private httpSvc: HttpClient) { }
<<<<<<< HEAD
  backendApiURL = environment.api_url;  // 'http://localhost:3000/api': can't work so nt using
=======
  backendApiURL = environment.api_url;  // 'http://localhost:3000/api'
>>>>>>> 300604651fb1f454def9fa1fe7e2d833fd57c6cc
  btcPriceApiURL = `${this.backendApiURL}/price`;

  public getPrice(): Promise<any> { // public: talk w backend
    return (
      // this.httpSvc.get(`${this.btcPriceApiURL}?priCurr=SGD&secCurr=BTC`).toPromise()
<<<<<<< HEAD
      // Checked at ARC tt backend(localhost:3000/api/price?primaryCurry=SGD) works, but can't work for frontend
      this.httpSvc.get(`https://radiant-dawn-95135.herokuapp.com/api/price?primaryCurry=SGD`).toPromise()
=======
      this.httpSvc.get(`https://radiant-dawn-95135.herokuapp.com/api/price?primaryCurry=SGD`).toPromise()
      // 
>>>>>>> 300604651fb1f454def9fa1fe7e2d833fd57c6cc
    );
  }
}
