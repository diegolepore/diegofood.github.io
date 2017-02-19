import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes }   from '@angular/router';


//Containers
import { FoodListingComponent } from './containers/food-listing/food-listing.component';
import { ProductDetailComponent } from './containers/product-detail/product-detail.component';
//import { ShoopingCartComponent } from './containers/shopping-cart/shopping-cart.component';

//Components
import { FoodDetailComponent } from './components/food-detail/food-detail.component';
import { FoodSidebarFilterComponent } from './components/food-sidebar-filters/food-sidebar-filter.component';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemHeroService }     from '../in-memory-data.service';
import { FoodSearchComponent } from './components/food-search/food-search.component';

//Service
import { FoodListingService } from './food-listing.service';
import { FoodSearchService } from './food-search.service';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        ReactiveFormsModule,
        FormsModule,
        //InMemoryWebApiModule.forRoot(InMemHeroService)
    ],
    declarations: [
        //Containers
        FoodListingComponent,
        ProductDetailComponent,
        //Components
        FoodDetailComponent,
        FoodSidebarFilterComponent,
        FoodSearchComponent,
        //ShoopingCartComponent
    ],
    exports: [
        FoodListingComponent,
        ProductDetailComponent       
    ],
    providers:[
        FoodListingService,
        FoodSearchService
    ]
})

export class FoodListingModule{}