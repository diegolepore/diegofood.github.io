import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }   from '@angular/router';

// Custom Modules
import { FoodListingModule } from './food-listing-components/food-listing.module';

//Containers
import { FoodListingComponent } from './food-listing-components/containers/food-listing/food-listing.component';
import { ProductDetailComponent } from './food-listing-components/containers/product-detail/product-detail.component';

import { ShoopingCartComponent } from './food-listing-components/containers/shopping-cart/shopping-cart.component';

import { AppComponent } from './app.component';

const routes: Routes = [
            {
                path: 'product-detail/:id',
                component: ProductDetailComponent
            },
            { 
                path: 'products-list',
                component: FoodListingComponent
            },
            {
                path: '',
                redirectTo: '/products-list',
                pathMatch: 'full'
            }
        ];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    // Custom Modules
    FoodListingModule
  ],
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    ShoopingCartComponent
  ]
})
export class AppModule {}
