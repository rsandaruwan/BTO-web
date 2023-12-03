import { DeliveryInfoInterface } from "./delivery_info.model";


export interface UserInterface {
  birth_day : string,
  country_code:string,
  created_at:string,
  email: string,
  expired_roles: Array<any>,
  first_name: string,
  id:string,
  last_name:string,
  mobile :number,
  nic_number :string,
  token:string,
  updated_at:string,
  user_image: string,
  user_status:number,
  delivery_info: Array<DeliveryInfoInterface>| undefined
}