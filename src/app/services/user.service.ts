import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {


    url=environment.apiUrl;
constructor(private http:HttpClient ) { }
signup(data: any) {
    return this.http.post(`${this.url}/user/signup`, data);
  }
login(data: any) {
    return this.http.post(`${this.url}/user/login`, data);
  }

  }
