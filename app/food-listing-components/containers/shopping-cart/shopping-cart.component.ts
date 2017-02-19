import { Component, OnInit, Input, Output, ChangeDetectorRef} from '@angular/core';
import { Product, Category } from '../../models/product.interface';
import { FoodListingService } from '../../food-listing.service';

@Component({
    selector: 'shopping-cart',
    styleUrls: ['shopping-cart.component.scss'],
    template: `
        <ul class="cart-ul">
            <li *ngFor="let cartItem of cart">
                <img [src]="cartItem.img" class="item-img">
                <div class="info-container">
                    <h3 class="item-name">{{ cartItem.name }}</h3>
                    <p> {{ cartItem.price }} </p>
                </div>
                <button class="remove" (click)="handleRemove(cartItem)"> <i class="glyphicon glyphicon-remove"></i> </button>
            </li>

            <li class="empty-msg text-center" *ngIf="cart < 1">
                <p>It is quite lonely here.</p>
                <p>Start adding some cool stuff! :-) </p>
            </li>

        </ul>

    `
})
export class ShoopingCartComponent implements OnInit{
    @Input()
    cart: Product[];

    constructor(
        private foodService: FoodListingService,
        private ref: ChangeDetectorRef,
    ){
        // ref.detach();
        // setInterval(() => {
        //     this.ref.detectChanges();
        //     //this.onGetCartList();
        // }, 600);
    }

    ngOnInit(){
        this.onGetCartList()
    }

    onGetCartList(){
        this.foodService
            .getCart()
            .subscribe((data: Product[]) => this.cart = data );
    }

    handleRemove(event: Product){
        console.log(event);
        this.foodService
            .removeFromCart(event)
            .subscribe((data: Product) => {
                this.cart = this.cart.filter((cartItem: Product)=>{
                    return cartItem.id !== event.id;
                });
            });
    }
}