import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxStarsModule } from 'ngx-stars';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';

// 
@Component({
  selector: 'app-paroduct-card',
  standalone: true,
  imports: [NgxStarsModule, CommonModule],
  templateUrl: './paroduct-card.component.html',
  styleUrl: './paroduct-card.component.css'
})
export class ParoductCardComponent {

  // 
  @Input () InProduct!: Product;

  constructor(
    private router: Router
  ){}

  // Routing to product details pag
  viewDetails(id: number): void {
    this.router.navigate(['/products', id]);
  }

  // 
  toggleReadMore(product: any) {
    product.showMore = !product.showMore;
  }
}
