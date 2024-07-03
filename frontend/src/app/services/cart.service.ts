import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);

  constructor() { }

  getCartItems(): BehaviorSubject<Product[]> {
    return this.cartSubject;
  }

  addToCart(product: Product): void {
    this.cartItems.push(product);
    this.cartSubject.next([...this.cartItems]);
  }

  removeFromCart(product: Product): void {
    const index = this.cartItems.findIndex(item => item._id === product._id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartSubject.next([...this.cartItems]);
    }
  }

  updateCartItemQuantity(productId: string, quantity: number): void {
    const item = this.cartItems.find(item => item._id === productId);
    if (item) {
      item.quantity = quantity;
      this.cartSubject.next([...this.cartItems]);
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next([...this.cartItems]);
  }
}
