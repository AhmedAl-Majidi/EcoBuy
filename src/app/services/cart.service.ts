import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
cartData={
  products: [] as any[], 
  totalPrice: 0,
  productsCount: 0
}

  cartData$ = new BehaviorSubject(this.cartData);
  constructor() { }

  addProduct(params: any): void{
    const { id, title, price, quantity, images} = params;
    const product = { id, title, price, quantity, images };
    console.log(product.images);
    
    // If the product is not in the cart
    if(!this.isProductInCart(id)){
      //  If  quantity is provided,  adds it with the specified quantity.
      if(quantity) {
        this.cartData.products.push(product);
        alert("Product added to cart")
      }
      //  If no quantity is provided, it defaults to 1. 
      else {this.cartData.products.push({ ...product, quantity: 1 });
      console.log({ ...product, quantity: 1 })};
    }

    // If product is already in the cart 
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

        updatedProducts[productIndex] = {
          ...product,
          quantity: product.quantity + 1,
        };
      }      
    }  
    this.cartData.totalPrice = this.getCartPrice();
    // 
    this.cartData.productsCount = this.getProductsCount();
  }

  // Total price
  getCartPrice(): number {
    let totalSum = 0;
    this.cartData.products.forEach(
      (prod) => (totalSum += prod.price * prod.quantity)
    );
    return totalSum;
  }

  // Total products in cart
  getProductsCount(): number {
    return this.cartData.products.length;
  }
  
  removeProduct(id: number): void {
    let updatedProducts = this.cartData.products.filter(
      (prod) => prod.id !== id
    );
    this.cartData.products = updatedProducts;
    this.cartData.totalPrice = this.getCartPrice();
    // 
    this.cartData.productsCount = this.getProductsCount();
    this.cartData$.next({ ...this.cartData });
    // localStorage.setItem('cart', JSON.stringify(this.cartData));
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
    this.cartData.totalPrice = this.getCartPrice();
    // 
    this.cartData.productsCount = this.getProductsCount();
    // 
    this.cartData$.next({ ...this.cartData });
    // localStorage.setItem('cart', JSON.stringify(this.cartData));
  }
}
