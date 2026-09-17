import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor( private router: Router) {}
getUsername(){
    return localStorage.getItem('username') || '';
  }
logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  hasAdminOrSellerRole(): boolean {
    const stored = localStorage.getItem('roles');
    const roles: string[] = stored ? JSON.parse(stored) : [];
  
    return roles.includes('ROLE_admin') || roles.includes('ROLE_seller');
  }
}
