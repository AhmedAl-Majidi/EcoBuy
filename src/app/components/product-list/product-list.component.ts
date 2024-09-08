import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { NgFor } from '@angular/common';
import { ParoductCardComponent } from '../paroduct-card/paroduct-card.component';
import { SearchComponent } from '../search/search.component';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, ParoductCardComponent, SearchComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  filteredProducts: Product[] = [];

  // The PLATFORM_ID token is used to determine whether the code is running in a browser or server environment.
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  handleFilteredProductsEmitter(data: Product[]) {
    this.filteredProducts = data;
  }

  // Check for Browser Context: Ensure that the code that accesses the document object is only executed in the browser
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
  }
}
