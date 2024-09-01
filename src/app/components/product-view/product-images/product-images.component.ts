import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-product-images',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product-images.component.html',
  styleUrl: './product-images.component.css'
})
export class ProductImagesComponent {
  product!: Product;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

    ngOnInit(): void {
      const productId = +this.route.snapshot.paramMap.get('id')!;  

      this.productService.getProductById(productId).subscribe({
        next: (product) => {
          this.product = product;
        }
    });
   
  }
}