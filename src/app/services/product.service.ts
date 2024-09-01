import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  apiUrl = 'https://dummyjson.com/products';

  getProductById(id: number): Observable<Product> {    
    return this.http.get<Product>(`https://dummyjson.com/products/${id}`);    
  }
  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl) ;
  }

  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<Product>(`${this.apiUrl}/add`, product, { headers });
  }

  // Cart
  getSingleProduct(id: Number): Observable<any> {
    // return this._api.getTypeRequest('products/' + id);
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
