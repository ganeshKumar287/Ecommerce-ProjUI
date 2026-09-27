import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

        url=environment.apiUrl;
    constructor(private http:HttpClient ) { 
      
    }
      createProduct(data: any): Observable<any> {
    return this.http.post(`${this.url}/products`, data);
  }
  getAllCategories(): Observable<any> {
    return this.http.get(`${this.url}/category`);
  }
  getProductById(id: number) {
    return this.http.get(`${this.url}/products/${id}`);
  }
  updateProduct(id: number, product: any) {
    return this.http.put(`${this.url}/products/${id}`, product);
  }
  getAll(params: any) {
    return this.http.get(`${this.url}/products`, { params });
}
getProductsByCategory(categoryId: number, params: any): Observable<any> {
    return this.http.get<any>(
      `${this.url}/products/categories/${categoryId}`,
      { params },
    );
  }
  deleteProduct(productId: number) {
    return this.http.delete(`${this.url}/products/${productId}`);
  }
}
