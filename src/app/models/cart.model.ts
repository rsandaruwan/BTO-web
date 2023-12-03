import { CartItemInterface } from "./cart-item.model";
import { DeliveryInfoInterface } from "./delivery_info.model";

export interface CartInterface {
  cart_items: Array<CartItemInterface>,
  sub_total: number,
  delivery_info: DeliveryInfoInterface| undefined
 
}