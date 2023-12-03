import { LocationInterface } from "./location.model";

export interface ShippingOptionInterface  {
  provider_name: string,
  cost: number,
  method_type: number,
  method_name: string,
  locations: Array<LocationInterface>,
  shipping_method_id: string
}