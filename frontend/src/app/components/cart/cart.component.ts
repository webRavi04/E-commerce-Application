import { Component } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartItems: Product[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  updateQuantity(item: Product, newQuantity: number): void {
    if (newQuantity > 0) {
      item.quantity = newQuantity;
      this.cartService.updateCartItemQuantity(item._id, newQuantity);
    }
  }

  removeItem(item: Product): void {
    this.cartService.removeFromCart(item);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 0)), 0);
  }
}
