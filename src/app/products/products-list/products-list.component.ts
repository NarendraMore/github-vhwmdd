import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: any[] = [];
  productDialog: boolean = false;
  productForm!: FormGroup;
  isEdit: boolean = false;
  selectedProduct: any;

  totalRecords: number = 0;  
  page: number = 0;   

  chartData: any[] = [];
  view: [number, number] = [600, 300]; 
  
  colorScheme = ['#d5a326']; 

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required]
    });
  }
  loadProductsLazy(event: any) {
    const page = event.first / event.rows; // Calculate the page index
    const limit = event.rows; // Number of rows per page
    
    // You can modify this URL to support pagination from your backend
    this.http.get<any[]>(`http://localhost:3000/products?_page=${page}&_limit=${limit}`).subscribe(data => {
      this.products = data;
      this.totalRecords = 100; // You need to know the total records count from your backend
    });
  }
  loadProducts() {
    this.http.get<any[]>('http://localhost:3000/products').subscribe(data => {
      this.products = data;
      this.updateChartData();
      this.totalRecords = data.length;
    });
  }

  updateChartData() {
    this.chartData = this.products.map(product => ({
      name: product.name,
      value: product.price
    }));
  }

  // Open dialog for creating a new product
  openNew() {
    this.isEdit = false;
    this.productForm.reset();
    this.productDialog = true;
  }

  // Open dialog for editing an existing product
  editProduct(product: any) {
    this.isEdit = true;
    this.selectedProduct = product;
    this.productForm.patchValue(product);
    this.productDialog = true;
  }

  // Save new product or update existing product
  saveProduct() {
    const productData = this.productForm.value;
    if (this.isEdit) {
     
      this.http.put(`http://localhost:3000/products/${this.selectedProduct.id}`, productData).subscribe(() => {
       
        const index = this.products.findIndex(p => p.id === this.selectedProduct.id);
        if (index > -1) {
          this.products[index] = productData;
        }
        this.productDialog = false;
      });
    } else {
      
      this.http.post<Product>('http://localhost:3000/products', productData).subscribe((newProduct) => {
        // Prepend the new product to the array (show it at the top)
        this.products.unshift(newProduct);
        this.productDialog = false;
      });
      
    }
  }
  

  // Cancel the form
  onclickCancel() {
    this.productDialog = false;
    this.productForm.reset();
  }

  // Delete a product
  deleteProduct(id: number) {
    this.http.delete(`http://localhost:3000/products/${id}`).subscribe(() => {
      this.loadProducts();
    });
  }
}
