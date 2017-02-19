import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Product, Category} from './models/product.interface';

const CATEGORIES_API: string = '/api/categories';
const PRODUCTS_API: string = '/api/products';
const CART_API: string = '/api/cart';

@Injectable()
export class FoodListingService{
    private headers = new Headers({
        'Content-Type': 'application/json'
    });

    private options = new RequestOptions({
        headers : this.headers
    });

    constructor(private http: Http){ 
        //console.log(this.http);
    }

    getProducts(): Observable<Product[]> {
        return this.http
            .get(PRODUCTS_API)
            .map((response: Response) => response.json());
    }

    getProduct(id): Observable<Product> {
        return this.http
            .get(`${PRODUCTS_API}/${id}`)
            .map((response: Response) => response.json());
    }

    getCategories(): Observable<Category[]> {
        return this.http
            .get(CATEGORIES_API)
            .map((response: Response) => response.json());
    }


    getCart(): Observable<Product[]> {
        return this.http
            .get(CART_API)
            .map((response: Response) => response.json());
    }

   addToCart(product: Product): Observable<Product>{
        let json = JSON.stringify(product);
        let params = json;
        console.log(json);
        return this.http.post(CART_API, json, this.options)
            .map(res => res.json())
            .catch(this.handleError);
    }

     
    removeFromCart(cartItem: Product): Observable<Product> {
        return this.http
            .delete(`${CART_API}/${cartItem.id}`)
            //.toPromise()
            .map((response: Response) => response.json());
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


}