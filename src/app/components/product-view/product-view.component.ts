import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { map } from 'rxjs';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent implements OnInit{
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
    ) { }

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
      }
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
          if (product.quantity === 0) this.quantity = 0;
          else this.quantity = 1;

          if (product.images) {
          }
        });
      });
  }
 // add to cart
 addToCart(): void {
  this.cartService.addProduct({
    id: this.product.id,
    title: this.product.title,
    price: this.product.price,
    quantity: this.quantity,
    images: this.product.images,
  });



}

}

