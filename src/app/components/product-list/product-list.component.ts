import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product, ProductResponse } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from "@angular/router";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgForOf, CommonModule,RouterLink,RouterModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})

export class ProductListComponent implements OnInit {
  // cart service
  id!: number;
  product: any;
  quantity!: number;
  // 

  products: Product[] = [];
  total!: number;
  skip!: number;
  limit!: number;
  // **
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedCategory!: string ;
   categories$!: Category[];


  constructor(
    private prodcutService: ProductService,
    private router: Router,
    private cartService: CartService,
    private _route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    // Initially display all products
    this.prodcutService.getProducts().subscribe((data:ProductResponse) => {
      this.products = data.products;
      this.filteredProducts = this.products; 
    });

    // populate this.categories from categoryService
    this.categoryService.getCategories().subscribe(categories => {
      this.categories$ = categories;
    })
  }

  // **
  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
  

    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedCategory ? product.category === this.selectedCategory.toLowerCase() : true)
    );
  }
  // Routing to product details pag
  viewDetails(id: number): void {   
    this.router.navigate(['/products', id])
  }

}
