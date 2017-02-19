import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Product, Category } from '../../models/product.interface';



@Component({
    selector: 'food-detail',
    styleUrls: ['food-detail.component.scss'],
    template: `
   
        <div class="inner-detail">
            <div class="product-image" [ngStyle]="{background: 'url('+ detailProduct.img +') no-repeat center center' }" (click)="onGoToDetail()"></div>
            <h3 class="title-product" (click)="onGoToDetail()"> {{ detailProduct.name }} 
                <span class="available" *ngIf="detailProduct.available">(Available)</span> 
                <span class="best-seller" *ngIf="detailProduct.best_seller"> <i class="glyphicon glyphicon-certificate"></i> </span>
            </h3>
            <p class="price"> {{ detailProduct.price }} </p>
            <p> {{ detailProduct.description }} </p>
            <ul class="tags-list">
                <li class="tag" *ngFor="let categ of catego" [class.hide]="detailProduct.categories.indexOf(categ.categori_id) === -1">
                    <span> {{ categ.name }} </span>
                </li>
            </ul>
            
            <button class="addToCartBtn btn btn-success" *ngIf="detailProduct.available" (click)="addToCart()"><i class="glyphicon glyphicon-shopping-cart"></i></button>
        </div>
    `
})

export class FoodDetailComponent{
    @Input()
    detailProduct: Product;

    @Input()
    catego: Category;

    @Output()
    add: EventEmitter<any> = new EventEmitter(); 

    @Output()
    goDetail: EventEmitter<any> = new EventEmitter();

    addToCart(){
        this.add.emit(this.detailProduct);
    }

    onGoToDetail(){
        this.goDetail.emit(this.detailProduct);
    }
}