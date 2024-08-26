import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
} from '@angular/forms';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgFor],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent  {
  productForm!: FormGroup;
  // 
  selectedCategory!: string;
  categories$!: Category[];

 

  constructor(private fb: FormBuilder,
     private productService: ProductService,
     private categoryService: CategoryService) {
   
  }
  createNewProduct() {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      this.productService.createProduct(newProduct).subscribe({
        next: (response) => {
          alert('Product added successfully:');
        },
      });
    } else {
      alert('Form is invalid!');
    }
  }
  ngOnInit() {
    // 
    this.productForm = this.fb.group({
      id: [0, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: [this.categories$, Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      discountPercentage: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      stock: [0, [Validators.required, Validators.min(0)]],
      brand: ['', Validators.required],
    });

  // populate this.categories from categoryService
 this.categoryService.getCategories().subscribe((categories) => {
   this.categories$ = categories;
 });
}
 
}
