import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { CartComponent } from '../../components/cart/cart.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  totalCartCount: number = 0
  constructor(
     private router: Router
    ,private cartService: CartService
  ) {}
  openCart(): void {
    this.router.navigate(['/cart']);
  }

  ngDoCheck(): void {
    this.totalCartCount = this.cartService.cartData.productsCount;
    }
}
