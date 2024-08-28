import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product, ProductResponse } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { NgxStarsModule } from 'ngx-stars';
import { ParoductCardComponent } from "../paroduct-card/paroduct-card.component";
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgForOf,
    CommonModule,
    RouterLink,
    RouterModule,
    FormsModule,
    NgxStarsModule,
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
