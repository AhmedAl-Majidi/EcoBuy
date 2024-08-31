import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
cartData={
  products: [] as any[], 
  total: 0,
  totalCount: 0
}

  cartData$ = new BehaviorSubject(this.cartData);
  constructor() { }

  addProduct(params: any): void{
    const { id, title, price, quantity, images,  /*maxQuantity*/ } = params;
    const product = { id, title, price, quantity, images,  /*maxQuantity*/ };
    console.log(product.images);
    
    if(!this.isProductInCart(id)){

      if(quantity) {
        this.cartData.products.push(product);
        alert("Product added to cart")
      }
        
      else {this.cartData.products.push({ ...product, quantity: 1 });
      console.log({ ...product, quantity: 1 })};
    }
    else{

      // Finding the updated product
      let updatedProducts = [...this.cartData.products];
      let productIndex = updatedProducts.findIndex((prod) => prod.id == id);
      let product = updatedProducts[productIndex];

      if (quantity) {
        updatedProducts[productIndex] = {
          ...product,
          quantity: quantity,
        };
      } else {
        console.log('else');

        updatedProducts[productIndex] = {
          ...product,
          quantity: product.quantity + 1,
        };
      }      
    }  
    this.cartData.total = this.getCartTotal();
    // 
    this.cartData.totalCount = this.getCartTotalCount();
  }

  // Total price
  getCartTotal(): number {
    let totalSum = 0;
    this.cartData.products.forEach(
      (prod) => (totalSum += prod.price * prod.quantity)
    );

    return totalSum;
  }

  // Total count
  getCartTotalCount(): number {
    let totalSum = 0;
    this.cartData.products.forEach(
      (prod) => (totalSum += prod.quantity)
    );
    return totalSum;
  }
  
  removeProduct(id: number): void {
    let updatedProducts = this.cartData.products.filter(
      (prod) => prod.id !== id
    );
    this.cartData.products = updatedProducts;
    this.cartData.total = this.getCartTotal();
    // 
    this.cartData.totalCount = this.getCartTotalCount();
    this.cartData$.next({ ...this.cartData });
    localStorage.setItem('cart', JSON.stringify(this.cartData));
    alert("Product removed from cart")
  }
  // Checks if a product is already in the cart
  isProductInCart(id: number): boolean {
    return this.cartData.products.findIndex((prod) => prod.id === id) !== -1;
  }
  updateCart(id: number, quantity: number): void {
    // copy array, find item index and update
    let updatedProducts = [...this.cartData.products];
    let productIndex = updatedProducts.findIndex((prod) => prod.id == id);

    updatedProducts[productIndex] = {
      ...updatedProducts[productIndex],
      quantity: quantity,
    };

    this.cartData.products = updatedProducts;
    this.cartData.total = this.getCartTotal();
    // 
    this.cartData.totalCount = this.getCartTotalCount();
    // 
    this.cartData$.next({ ...this.cartData });
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  }
}
