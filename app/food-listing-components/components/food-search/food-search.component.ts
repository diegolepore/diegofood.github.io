import { Component, OnInit } from '@angular/core';

import { Router }   from '@angular/router';

import { Product, Category } from '../../models/product.interface';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Statics
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';   

import { FoodSearchService } from '../../food-search.service';

@Component({
    selector: 'food-search',
    styleUrls: ['food-search.component.scss'],
    template: `

            <div id="search-component">
                <input #searchBox id="search-box" class="form-control" (keyup)="onSearch(searchBox.value)" placeholder="Product Search..." />
                <div class="results-list">
                    <div *ngFor="let product of productsSearch | async"
                        (click)="gotoDetail(product)" class="search-result" >
                    {{product.name}}
                    </div>
                </div>
            </div>

    `,
    providers: [FoodSearchService]
})
export class FoodSearchComponent implements OnInit{

    productsSearch: Observable<Product[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private foodSearchService: FoodSearchService,
        private router: Router
        ){}

    // Push a search term into the observable stream.
    onSearch(term: string): void {
        console.log(term);
        this.searchTerms.next(term);
    }

    ngOnInit(){

        this.productsSearch = this.searchTerms
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time the term changes
                // return the http search observable
                ? this.foodSearchService.search(term)
                // or the observable of empty heroes if there was no search term
                : Observable.of<Product[]>([]))
            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<Product[]>([]);
        });
    }

    gotoDetail(product: Product): void {
        //product-detail/:id
        let link = ['/product-detail', product.id];
        this.router.navigate(link);
    }


}