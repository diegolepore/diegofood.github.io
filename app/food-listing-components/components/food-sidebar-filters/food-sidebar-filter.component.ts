import { Component, Input, Output, EventEmitter} from '@angular/core';

import { Product, Category } from '../../models/product.interface';

@Component({
    selector: 'food-sidebar-filter',
    styleUrls: ['food-sidebar-filter.component.scss'],
    template: `
            <button class="category-btn" (click)="onFilterByCategory()">{{ category.name }}</button>
    `
})

export class FoodSidebarFilterComponent{

@Input()
category: Category; 

@Output()
filterCategory: EventEmitter<any> = new EventEmitter();

onFilterByCategory(){
    this.filterCategory.emit(this.category);
}


}