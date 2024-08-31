import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ParoductCardComponent } from "../paroduct-card/paroduct-card.component";
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgFor,
    ParoductCardComponent,
    SearchComponent
],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  filteredProducts: Product[] = [];
  
  handleFilteredProductsEmitter(data: Product[]){
    this.filteredProducts = data;
  }

  
}
