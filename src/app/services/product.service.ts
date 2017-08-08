import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


import { Product } from '../model/Product';

@Injectable()
export class ProductService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private productUrl  = '../assets/products.json';

  constructor(private http: Http) { }

  getAllProducts(): Promise<Product[]> {
    return this.http.get(this.productUrl)
      .toPromise()
      .then(response => { console.log(response);
        return Promise.resolve(<Product[]>response.json().products);
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
