import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgFor,CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  cartData: any;
  constructor(
    private cartService: CartService  ){}
    ngOnInit(): void {
      this.cartService.cartData$.subscribe((data) => {
        this.cartData = data;
      })          
    }
}
