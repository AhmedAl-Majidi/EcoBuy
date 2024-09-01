import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://dummyjson.com/products/categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> { 
    console.log(this.http.get<Category[]>(this.apiUrl));    
    return this.http.get<Category[]>(this.apiUrl);
  }
}