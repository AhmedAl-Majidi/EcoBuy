import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxStarsModule } from 'ngx-stars';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

//
@Component({
  selector: 'app-paroduct-card',
  standalone: true,
  imports: [NgxStarsModule, CommonModule],
  templateUrl: './paroduct-card.component.html',
  styleUrl: './paroduct-card.component.css',
})
export class ParoductCardComponent {
  product!: Product;
  //
  @Input() InProduct!: Product;

  oldPrice: number = 0;

  constructor(
    private router: Router,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.getProductById(this.InProduct.id).subscribe({
      next: (product) => {
        this.product = product;
      },
    });

    this.oldPrice =
      this.InProduct.price / (1 - this.InProduct.discountPercentage / 100);
  }
  // Routing to product details pag
  viewDetails(id: number): void {
    this.router.navigate(['/products', id]);
  }

  //
  toggleReadMore(product: any) {
    product.showMore = !product.showMore;
  }

  // add to cart
  addToCart(): void {
    this.cartService.addProduct({
      id: this.product.id,
      title: this.product.title,
      price: this.product.price,
      quantity: this.product.quantity,
      images: this.product.images,
    });
  }
}
