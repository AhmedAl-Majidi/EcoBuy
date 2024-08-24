import { Routes } from '@angular/router';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const routes: Routes = [
    // {path: '**', redirectTo: ''},
    { path: '', component: ProductListComponent },
    {path: 'products/:id', component: ProductViewComponent},
    {path: 'cart', component: CartComponent},
    { path: 'product-create', component: ProductCreateComponent },
    {path: 'checkout', component: CheckoutComponent}
];
