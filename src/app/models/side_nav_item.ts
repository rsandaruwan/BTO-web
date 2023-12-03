export interface SideNaveItemInterface {
  name: string,
  id: number,
  active: boolean,
  tag: string ,
  children: Array<SideNaveItemInterface>
}