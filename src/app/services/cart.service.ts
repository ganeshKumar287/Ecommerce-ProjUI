import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url=environment.apiUrl;
  constructor(private http:HttpClient ) { }
  getCart() {
    return this.http.get(`${this.url}/users/cart`);
  }
  addToCart(productId: number, quantity: number = 1) {
    return this.http.post(`${this.url}/carts/products/${productId}/quantity/${quantity}`, {});
  }
}
