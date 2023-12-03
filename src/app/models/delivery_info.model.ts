import { CartItemInterface } from "./cart-item.model";

export interface DeliveryInfoInterface {
  name:string,
  default:boolean,
  type:'Home' | 'Work' | 'Other';
  shipping_method:number,
  billing_name:string,
  billing_email:string,
  billing_phone:string,
  recipient_name:string,
  recipient_phone:string,
  shipping_address_no:string,
  shipping_address_street:string,
  shipping_address_city:string,
  shipping_address_state: string,
  shipping_method_id:string,
  notes:string
}