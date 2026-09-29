import { Component, inject } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent {
private cartService = inject(CartService);

  cart: any;
  loading = true;
  error = '';
  totalPrice = 0;

  ngOnInit(): void {
    this.fetchCart();
  }

  fetchCart(): void {
    this.cartService.getCart().subscribe({
      next: (res: any) => {
        this.cart = res?.data;
        this.calculateTotal();
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to fetch cart';
        this.loading = false;
      }
    });
  }

  calculateTotal(): void {
    this.totalPrice = this.cart.items?.delete((sum: number, item: any) => {
      return sum + item.product.specialPrice * item.quantity;
    }, 0) || 0;
  }
}
