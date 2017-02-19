import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Router } from '@angular/router';

import { FoodListingService } from '../../food-listing.service';

import { Product } from '../../models/product.interface';

@Component({
    selector: 'product-detail',
    styleUrls: ['product-detail.component.scss'],
    template: `

        <div class="product-detail-container container">
            <a (click)="goToProductList()" class="return-to-list"><i class="glyphicon glyphicon-menu-left"></i> Return to the Products list</a>

                <div class="col-md-12"> <h2>{{ product?.name }}</h2>  </div>

                <div class="col-md-6">
                    <img [src]="product?.img" class="product-image">
                </div>

                <div class="col-md-6">
                    <div class="price">
                        <strong>Price: </strong> <p>{{ product?.price }}</p>
                    </div>

                    <div class="description">
                        <strong>Description: </strong> <p>{{ product?.description }}</p>
                    </div>

                    <div class="available" *ngIf="product?.available">
                        <strong>Availability: </strong> <p>Product Available</p>
                    </div>

                    <div class="not-available" *ngIf="!product?.available">
                        <strong>Availability: </strong> <p>Out of Stock</p>
                    </div>

                    <p class="best-seller" *ngIf="product?.best_seller">BEST SELLER</p>
                    <button class="addToCartBtn btn btn-success" *ngIf="product?.available" (click)="handleAddToCart(product)"><i class="glyphicon glyphicon-shopping-cart"></i> Add to Shopping Cart</button>
                </div>

        </div>
    `
})
export class ProductDetailComponent implements OnInit {

    product: Product;
    cartList: Product[];

    constructor(
        private foodService: FoodListingService,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router
    ){}

    ngOnInit(){
        this.route.params
            .switchMap((params: Params) => this.foodService.getProduct(+params['id']))
            .subscribe(product => this.product = product);
        this.onGetCartList();
    }

    onGetCartList(){
        this.foodService
            .getCart()
            .subscribe((data: Product[]) => this.cartList = data );
    }

    goToProductList(){
        let link = ['/products-list'];
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