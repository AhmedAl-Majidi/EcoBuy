import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { map } from 'rxjs';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css',
})
export class ProductViewComponent implements OnInit {
  product!: Product;

  // cart service
  id!: number;
  CartProduct: any;
  quantity!: number;
  //

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private _route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
      },
    });

    // Cart Observable
    this._route.paramMap
      .pipe(
        map((param: any) => {
          return param.params.id;
        })
      )
      .subscribe((id) => {
        // returns string so convert it to number

        this.id = parseInt(id);
        this.productService.getSingleProduct(id).subscribe((product) => {
          this.CartProduct = product;
          // if (product.quantity === 0) this.quantity = 0;
          // else this.quantity = 1;
        });
      });
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

  //
  closeProduct(): void {
    this.router.navigate(['/product-list']);
  }
}
