import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
constructor(private productService :ProductServiceService, private router: Router,private fb: FormBuilder,private route: ActivatedRoute,
){}
    productForm!: FormGroup;

 categories: any;

  productId: number | null = null;
  isEditMode = false;
  loading = false;

  ngOnInit(): void {
    this.initializeForm();
    this.productService.getAllCategories().subscribe({
      next: (res) => this.categories = res?.data,
      error: (err) => {
        console.error('Failed to load categories:', err);
        alert('Failed to load categories');
      }
    });
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.productId = Number(id);
        this.isEditMode = true;
        this.loadProduct(this.productId);
      }
    });
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (product: any) => {
        console.log('Product loaded:', product);
        this.productForm.patchValue({
          productName: product.productName,
          categoryId: product.categoryId,
          price: product.price,
          discount: product.discount,
          description: product.description,
          quantity: product.quantity,
          productImage: product.productImage
        });
        console.log("new string");
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load product:', err);
        alert(err.error?.message || 'Failed to load product');
        this.loading = false;
        this.router.navigate(['/products']);
      },
    });
  }

  saveProduct(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const product = this.productForm.value;
    if (this.isEditMode && this.productId) {
      this.updateProduct(product);
    } else {
      this.createProduct(product);
    }
  }
  updateProduct(product: any): void {
    this.productService.updateProduct(this.productId, product).subscribe({
      next: () => {
        alert('Product updated successfully');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Update product error:', err);
        const msg = err.error?.message || 'Failed to update product';
        alert(msg);
      },
    });
  }

  initializeForm(){
    this.productForm = this.fb.group({
      productName: ['', Validators.required],

      categoryId: ['', Validators.required],


      price: [
        '',
        [
          Validators.required,
          Validators.min(0)
        ]
      ],
    quantity: [
      '',
      [
        Validators.required,
        Validators.min(1)
      ]
    ],
      discount: [
        '',
        [
          Validators.min(0),
          Validators.max(100)
        ]
      ],

      description: [''],

      productImage: ['']
    });
  }
createProduct(product): void {

/*  if (this.productForm.invalid) {
    this.productForm.markAllAsTouched();
    return;
  }*/

//  const product = this.productForm.value;

  this.productService
    .createProduct( product)
    .subscribe({

      next: () => {
        alert('✅ Product created!');
        this.router.navigate(['/products']);
      },

      error: (err) => {
        const msg = err.error?.message || 'Unknown error';
        alert('❌ Failed: ' + msg);
      }

    });
}
}


