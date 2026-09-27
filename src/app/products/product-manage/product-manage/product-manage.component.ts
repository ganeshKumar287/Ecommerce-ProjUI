import { Component, inject } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.css']
})
export class ProductManageComponent {
private productService = inject(ProductServiceService);

  products: any[] = [];
  loading = true;
  error: string = '';
  
  page = 0;
  size = 4;
  totalPages = 1;
  pageSizeOptions = [2, 4, 6, 12]; // You can adjust these

  ngOnInit(): void {
    this.loading = false;
    this.fetchMyProducts();
  }

  fetchMyProducts() {
    const params = {
      pageNumber: this.page,
      pageSize: this.size,
      sortBy: 'productName',
      sortOrder: 'asc'
    };

    this.productService.getAll(params).subscribe({
      next: (res: any) => {
        this.products = res.data.content || res;
        this.totalPages = res.data.totalPages || 1;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
  }

  deleteProduct(productId: number) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    console.log("product id, "+productId);
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        alert('Product deleted');
        this.products = this.products.filter(p => p.productId !== productId);
      },
      error: () => {
        alert('Failed to delete product');
      }
    });
  }
}
