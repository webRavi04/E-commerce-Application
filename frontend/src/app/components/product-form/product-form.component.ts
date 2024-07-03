import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  productForm: FormGroup;
  productId: string | null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required]
    });
    this.productId = null;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      if (this.productId) {
        this.productService.getProductById(this.productId).subscribe(
          product => {
            this.productForm.patchValue({
              name: product.name,
              description: product.description,
              price: product.price,
              imageUrl: product.imageUrl
            });
          },
          error => {
            console.error('Error fetching product for edit', error);
          }
        );
      }
    });
  }

  onSubmit(): void {
    const productData = this.productForm.value;
    if (this.productId) {
      this.productService.updateProduct(this.productId, productData).subscribe(
        () => {
          alert('Product updated successfully!');
          this.router.navigate(['/products']);
        },
        error => {
          console.error('Error updating product', error);
        }
      );
    } else {
      this.productService.addProduct(productData).subscribe(
        () => {
          alert('Product added successfully!');
          this.router.navigate(['/products']);
        },
        error => {
          console.error('Error adding product', error);
        }
      );
    }
  }
}
