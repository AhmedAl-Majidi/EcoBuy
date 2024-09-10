import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, FormsModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartData: any;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cartData$.subscribe((data) => {
      this.cartData = data;
    });
  }

  // Updating cart price when cart changes
  ngDoCheck() {
    this.cartService.cartData$.subscribe((data) => {
      this.cartData.products[this.cartData.products[0]] = data.totalPrice;
    });
  }

  removeCartItem(id: number): void {
    this.cartService.removeProduct(id);
  }

  closeCart() {
    this.router.navigate(['product-list']);
  }

  handleCheckout() {
    this.router.navigate(['checkout']);
  }

  updateCart(id: number, quantity: number): void {
    this.cartService.updateCart(id, quantity);
  }
}
