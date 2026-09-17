import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
constructor(private productService :ProductServiceService, private router: Router,private fb: FormBuilder){}
    productForm!: FormGroup;

 categories: any;

  ngOnInit(): void {
    this.initializeForm();
    this.productService.getAllCategories().subscribe({
      next: (res) => this.categories = res?.data,
      error: (err) => {
        console.error('Failed to load categories:', err);
        alert('Failed to load categories');
      }
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
      quantity:['',Validators.required,Validators.min(1)],
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
createProduct(): void {

  if (this.productForm.invalid) {
    this.productForm.markAllAsTouched();
    return;
  }

  const product = this.productForm.value;

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


