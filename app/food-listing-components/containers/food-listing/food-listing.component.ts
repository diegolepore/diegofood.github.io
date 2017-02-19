import { Component, OnInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router }   from '@angular/router';
import { Product, Category } from '../../models/product.interface';
import { FoodListingService } from '../../food-listing.service';

@Component({
    selector: 'food-listing',
    styleUrls: ['food-listing.component.scss'],
    template: `

        <div class="products-fiters-container container">

            <div class="filtertitle-search-container clearfix">
                <button class="btn btn-primary filter-btn"
                 (click)="toggleFilters()"><i class="glyphicon glyphicon-filter"></i> Filters</button>
                <food-search class="food-search"></food-search>
            </div>

           <!-- Filters -->
           <div class="food-filters clearfix" *ngIf="filtersOpen">
                <div class="category-btn filter-buttons" (click)="toggleCategs()">
                        Category 
                        <i class="glyphicon glyphicon-menu-down"></i>

                    <div class="categories-dropdown" *ngIf="categsOpen" (mouseleave)="toggleCategs()">
                        <food-sidebar-filter class="food-sidebar" *ngFor="let category of categories"
                            [category]="category"
                            (filterCategory)="handleFilterCategory($event)"
                        ></food-sidebar-filter>
                    </div>
                </div>

                <div class="other-filters-btn filter-buttons" (click)="toggleOthers()">
                        Other
                        <i class="glyphicon glyphicon-menu-down"></i>

                    <div class="filterButtons" *ngIf="othersOpen" (mouseleave)="toggleOthers()">
                        <button (click)="showAvailable()">Available</button>
                        <button (click)="showNotAvailable()">Not Available</button>
                        <button (click)="showBestSeller()">Best Seller</button>
                        <button (click)="upperThanThirtyThousand(30000)">Price upper than 30.000</button>
                        <button (click)="lowerThanTenThousand(10000)">Price lower than 10.000</button>
                        <button (click)="byNameOrder()">Order by name</button>
                        <button (click)="orderByPrice('mayor')">Order by price (higher to lower)</button>
                        <button (click)="orderByPrice('menor')">Order by price (Lower to higher)</button>
                    </div>
                </div>

                <div class="reset-btn filter-buttons" (click)="fetchProducts()">Reset</div>

            </div>

            <div class="products-list clearfix">
                <food-detail class="food-detail col-md-3" *ngFor="let product of products" 
                    [detailProduct]="product"
                    [catego]="categories"
                    (goDetail)="gotoDetail($event)"
                    (add)="handleAddToCart($event)"
                >
                </food-detail>
            </div>
        </div>
    `,
})

export class FoodListingComponent implements OnInit{

    public product: Product;
    public category: Category
    public cart: Product;
    
    public products: Product[];
    public categories: Category[];
    public cartList: Product[];

    public filtersOpen = false;
    public categsOpen = false;
    public othersOpen = false;

    constructor( 
        private foodService: FoodListingService,
        private router: Router       
        ){}

    ngOnInit():void{
        this.fetchProducts();
        this.fetchCategories();
    }

    toggleFilters(){ 
        this.filtersOpen = !this.filtersOpen; 
        this.othersOpen = false; 
        this.categsOpen = false; 
    }

    toggleCategs(){ 
        this.categsOpen = !this.categsOpen; 
        this.othersOpen = false; 
    }

    toggleOthers(){ 
        this.othersOpen = !this.othersOpen; 
        this.categsOpen = false; 
    }
    
    onGetCartList(){
        this.foodService
            .getCart()
            .subscribe((data: Product[]) => this.cartList = data );
    }

    fetchProducts(){
        this.foodService
        .getProducts()
        .subscribe((data: Product[]) => this.products = data );
    }

    fetchCategories(){
        this.foodService
        .getCategories()
        .subscribe((data: Category[]) => this.categories = data );
    }

    handleFilterCategory(event: Category){
        this.foodService
        .getProducts()
        .subscribe((data: Product[]) => { 
            this.products = data
            this.products = this.products.filter((product: Product) => {
                return product.categories.indexOf(event.categori_id) !== -1;
            });
        });
    }

    showAvailable(){
        this.foodService
        .getProducts()
        .subscribe((data: Product[]) => { 
            this.products = data
            this.products = this.products.filter((product: Product) => {
                return product.available;
            });
        });
    }

    showNotAvailable(){
        this.foodService
        .getProducts()
        .subscribe((data: Product[]) => { 
            this.products = data
            this.products = this.products.filter((product: Product) => {
                return !product.available;
            });
        });
    }

    showBestSeller(){
        this.foodService
        .getProducts()
        .subscribe((data: Product[]) => { 
            this.products = data
            this.products = this.products.filter((product: Product) => {
                return product.best_seller;
            });
        });
    }

    upperThanThirtyThousand(value: number){
        this.foodService
        .getProducts()
        .subscribe((data: Product[]) => { 
            this.products = data
            this.products = this.products.filter((product: Product) => {
                return parseInt(product.price.replace(".","")) > value;
            });
        });
    }

    lowerThanTenThousand(value: number){
        this.foodService
        .getProducts()
        .subscribe((data: Product[]) => { 
            this.products = data
            this.products = this.products.filter((product: Product) => {
                return parseInt(product.price.replace(".","")) < value;
            });
        });
    }

    byNameOrder(property){
        this.foodService
        .getProducts()
        .subscribe((data: Product[]) => { 
            this.products = data.sort(function(a, b){
                if(a.name.toLowerCase() < b.name.toLowerCase()){ 
                    return -1;
                }
                else if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                return 0;
            });
            return this.products
        })
    }

    orderByPrice(optionPrice){
        if(optionPrice === "mayor"){
            this.foodService
            .getProducts()
            .subscribe((data: Product[]) => { 
                this.products = data.sort(function(a, b){
                    return parseInt(b.price.replace(".","")) - parseInt(a.price.replace(".",""));
                })
            });
        }else if(optionPrice === "menor"){
            this.foodService
            .getProducts()
            .subscribe((data: Product[]) => { 
                this.products = data.sort(function(a, b){
                    return parseInt(a.price.replace(".","")) - parseInt(b.price.replace(".",""));
                })
            });
        }
    }

    gotoDetail(product: Product): void {
        let link = ['/product-detail', product.id];
        this.router.navigate(link);
    }

    handleAddToCart(event: Product){
        console.log(event);

        this.foodService.addToCart(event).subscribe(
            response => {
                //this.cartList.push(event);
                this.onGetCartList();
            },
            error => {
                alert("Error en la petición.");
            }
        );
    }
}