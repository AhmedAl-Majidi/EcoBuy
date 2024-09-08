import { Routes } from '@angular/router';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductImagesComponent } from './components/product-view/product-images/product-images.component';

export const routes: Routes = [
    // {path: '**', redirectTo: ''},
    { path: '', loadComponent: () => import('./components/product-list/product-list.component').then(m => m.ProductListComponent)},
    {path: 'products/:id', loadComponent: () => import('./components/product-view/product-view.component').then(m => m.ProductViewComponent)},
    {path: 'cart', loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent)},
    { path: 'product-create', loadComponent: () => import('./components/product-create/product-create.component').then(m => m.ProductCreateComponent)},
    {path: 'checkout', loadComponent: () => import('./components/checkout/checkout.component').then(m => m.CheckoutComponent)},
    {path: 'product-images/:id', loadComponent: () => import('./components/product-view/product-images/product-images.component').then(m => m.ProductImagesComponent)},
];
