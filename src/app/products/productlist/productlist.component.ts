import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent {
constructor(private productService:ProductServiceService,
  private route :ActivatedRoute,private cartService:CartService
  // private wishlistService = WishlistService
  ){}
 

  products: any[] = [];
  loading = true;
  error: string = '';
  
  page = 0;
  size = 2;
  totalPages = 1;
  pageSizeOptions = [2, 4, 6, 12]; // You can adjust these

  categories: any[] = [];
  selectedCategoryId: number | null = null;


  ngOnInit(): void {
    this.loadCategories();

    const savedSize = localStorage.getItem('pageSize');
    if (savedSize) {
      this.size = +savedSize;
    }
  
    this.route.queryParams.subscribe(params => {
      const search = params['search'];
      if (search) {
        this.searchProducts(search);
      } else {
        this.fetchProducts();
      }
    });
  }

  loadCategories() {
    this.productService.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories = res?.data;
      },
      error: () => {
        console.warn('Failed to load categories');
      }
    });
  }

  filterByCategory(categoryId: number | null) {
    console.log('Selected category ID:', categoryId);
    this.selectedCategoryId = categoryId;
    this.page = 0;
    this.fetchProducts();
  }
  
  fetchProducts(): void {
    this.loading = true;
  
    const params = {
      pageNumber: this.page,
      pageSize: this.size,
      sortBy: 'productName',
      sortOrder: 'asc'
    };
  
    if (this.selectedCategoryId) {
     //  Category-specific endpoint
      this.productService.getProductsByCategory(this.selectedCategoryId, params).subscribe({
        next: (res: any) => {
          this.products = res.data.content || res;
          this.totalPages = res.data.totalPages || 1;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load products by category';
          this.loading = false;
        }
      });
    } else {
      // Default: All products
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
  }

  nextPage(): void {
    this.page++;
    this.fetchProducts();
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.fetchProducts();
    }
  }

  goToPage(index: number) {
    if (index >= 0 && index < this.totalPages) {
      this.page = index;
      this.fetchProducts();
    }
  }

  onPageSizeChange() {
    localStorage.setItem('pageSize', this.size.toString());
    this.page = 0;
    this.fetchProducts();
  }
  
buyNow(productId: number) {
  }

  addToWishlist(productId: number) {
  }
addToCart(productId: number) {
    this.cartService.addToCart(productId, 1).subscribe({
      next: (res) => {
        // console.log('Add to cart response:', res);
        if (res) {
          this.cartService.getCart().subscribe({
            next: (cart) => {
              alert('Product added to cart!');
              // this.cartService.notifyCartChange(); // Notify other component
            },
            error: (err) => {
              alert('Failed to fetch cart.');
            } 
          });
        }
      },
      error: (err) => {
        // console.error('Error adding to cart:', err);
        const backendMessage = err.error?.message || 'Something went wrong.';
        alert('Failed to add to cart: ' + backendMessage);
      }
    });
  }  

  searchProducts(term: string): void {
   /* this.loading = true;
    this.productService.search(term, {
      pageNumber: this.page,
      pageSize: this.size
    }).subscribe({
      next: (res: any) => {
        this.products = res.content || res;
        this.loading = false;
      },
      error: (err) => {
        const backendMessage = err.error?.message || 'Search failed.';
        this.loading = false;
        alert('Search failed: ' + backendMessage);
      }
    });
  }*/
}
}