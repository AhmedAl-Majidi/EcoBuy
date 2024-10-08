import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  
  products: Product[] = [];

  @Output() filteredProductsEmitter:  EventEmitter<Product[]> = new EventEmitter<Product[]>();

    filteredProducts: Product[] = [];
    searchTerm: string = '';
    selectedCategory!: string;
    categories$!: Category[];

    constructor(
      private prodcutService: ProductService,
      private categoryService: CategoryService
    ){}

    ngOnInit() {
      // Initially display all products
      this.prodcutService.getProducts().subscribe((data) => {
        this.products = data.products;
        this.filteredProducts = data.products;
        this.filteredProductsEmitter.emit(this.filteredProducts);            
      });

      // populate this.categories from categoryService
      this.categoryService.getCategories().subscribe((categories) => {
        this.categories$ = categories;
      });
    }

    // **
  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }


  applyFilters(): void {
    this.filteredProducts = this.products.filter(
      (product) =>
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) && 
      (this.selectedCategory ? product.category === this.selectedCategory.toLowerCase() : true)
    );
    this.filteredProductsEmitter.emit(this.filteredProducts);            
  }
}
