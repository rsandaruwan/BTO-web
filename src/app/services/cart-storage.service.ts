import { Injectable } from '@angular/core';

const TOKEN_KEY = 'back_to_originCart';
@Injectable({
  providedIn: 'root'
})
export class CartStorageService {

  constructor() { }

  public saveCart(data: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, data);
  }

  public getCart(): any  {
    const cart = localStorage.getItem(TOKEN_KEY);
        if (cart) {
            return JSON.parse(cart);
        }
        return null;
  }
  public clearCart() {
    localStorage.removeItem(TOKEN_KEY);
  }
}
