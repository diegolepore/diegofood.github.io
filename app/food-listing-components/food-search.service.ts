import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Product, Category } from './models/product.interface';

//const PRODUCTS_API: string = '/app/heroes/';
const PRODUCTS_API: string = '/api/products';

@Injectable()
export class FoodSearchService {
  
  constructor(private http: Http) {}

  search(term: string): Observable<Product[]> {

    // console.log("desde el servicio:" + `${PRODUCTS_API}?name=${term}`);

    // console.log(this.http
    //         .get(`${PRODUCTS_API}?name=${term}`)
    //         .map(response => response.json()))

    return this.http
               .get(`${PRODUCTS_API}/?name_like=${term}`)
               .map(response => response.json());
  }
}