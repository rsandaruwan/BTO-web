export interface InstagramInterface {
 
  username : string,
  media_count :  string,
  media: InstagramMediaInterface,
  id: string,
}
export interface InstagramMediaInterface {
 
  data : Array<InstagramMediaDataInterface>,
}
export interface InstagramMediaDataInterface {
 
  media_type : string,
  media_url : string,
  permalink : string,
  id : string,
}