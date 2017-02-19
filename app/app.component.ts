import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product, Category } from './food-listing-components/models/product.interface';
import { FoodListingService } from './food-listing-components/food-listing.service';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div class="app">
      <header>
        <div class="container clearfix">
          <div class="logo"></div>
          <div class="header-right pull-right cart-main">
            <button class="btn btn-success" (click)="toggleShopping()"><i class="glyphicon glyphicon-shopping-cart"></i> Shopping cart</button>
            <shopping-cart *ngIf="toggleShoppingDropdown" (mouseleave)="toggleShoppingDropdown = false" class="cart-elem" [cart]="cartList"></shopping-cart>
          </div>
        </div>
      </header>
      
       <router-outlet></router-outlet>

       <footer></footer>
    </div>
  `
})
export class AppComponent implements OnInit{

  public cart: Product;
  cartList: Product[];

  public toggleShoppingDropdown = false;

  constructor(
    private foodService: FoodListingService,
    private ref: ChangeDetectorRef
  ){
        // ref.detach();
        // setInterval(() => {
        //     this.ref.detectChanges();
        // }, 1000);
  }

  ngOnInit(){
    this.onGetCartList();
  }

    onGetCartList(){
        this.foodService
            .getCart()
            .subscribe((data: Product[]) => this.cartList = data );
    }

    toggleShopping(){
      this.toggleShoppingDropdown = !this.toggleShoppingDropdown;
      // this.ref.detach();
      // this.ref.detectChanges();
      if(this.toggleShopping){
        this.onGetCartList();
      }
    }

}



