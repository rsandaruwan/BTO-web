import { Injectable,Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { environment } from 'src/environments/environment.prod';
import { DOCUMENT } from '@angular/common';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  baseURL='';
  constructor(
    @Inject(DOCUMENT) private document: any,
    private http: HttpClient,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {
   this.baseURL=AppConfig.settings.baseURL

   
   // this.baseURL=environment.baseURL;
  }

  /**
   * Method: POST
   * Params: data, token, endpoint, options
  */
  async post(data: any, token: string, endpoint: string, options: any) {
    const customOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json charset=utf-8',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return await new Promise((resolve, rejects) => {
      this.http.post(this.baseURL + endpoint, data, customOptions).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        if (error.status == 401) {
          this.tokenRefresh().then(() => {
            this.post(data, token, endpoint, options);
          })
        } else if (error.status == 403) {
          this.tokenStorage.signOut();
          this.router.navigate(['/login']);
          rejects(error);
        } else if (error.status == 0) {
          this.router.navigate(['unknown-error'])
        } else {
          rejects(error);
        }
      })
    });
  }

  /**
   * Method: GET
   * Params: token, endpoint, options
  */
  async get(token: string, endpoint: string, options: any) {
    const customOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return await new Promise((resolve, rejects) => {
      this.http.get(this.baseURL + endpoint, customOptions).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        if (error.status == 401) {
          this.tokenRefresh().then(() => {
            this.get(token, endpoint, options)
          })
        } else if (error.status == 403) {
          this.tokenStorage.signOut();
          this.router.navigate(['/login']);
          rejects(error);
        } else if (error.status == 0) {
          this.router.navigate(['unknown-error'])
        } else {
          rejects(error);
        }
      })
    });
  }

  /**
  * Method: PUT
  * Params: data,token, endpoint, options
  */
  async put(data: any, token: string, endpoint: string, options: any) {
    const customOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return await new Promise((resolve, rejects) => {
      this.http.put(this.baseURL + endpoint, data, customOptions).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        if (error.status == 401) {
          this.tokenRefresh().then(() => {
            this.put(data, token, endpoint, options);
          })
        } else if (error.status == 403) {
          this.tokenStorage.signOut();
          this.router.navigate(['/login'])
          rejects(error);
        } else if (error.status == 0) {
          this.router.navigate(['unknown-error'])
        } else {
          rejects(error);
        }
      })
    });
  }

  /**
* Method: DELETE
* Params: data,token, endpoint, options
*/
  async delete(token: string, endpoint: string, options: any) {
    const customOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return await new Promise((resolve, rejects) => {
      this.http.delete(this.baseURL + endpoint, customOptions).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        if (error.status == 401) {
          this.tokenRefresh().then(() => {
            this.delete(token, endpoint, options);
          })
        } else if (error.status == 403) {
          this.tokenStorage.signOut();
          this.router.navigate([''])
          rejects(error);
        } else if (error.status == 0) {
          this.router.navigate(['unknown-error'])
        } else {
          rejects(error);
        }
      })
    });
  }

  /**
  * Method: GET - TOKEN REFRESH
  * Params: 
  */
  async tokenRefresh() {
    const customOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(this.tokenStorage.getToken())
      })
    }
    return await new Promise((resolve, rejects) => {
      this.http.get(this.baseURL + "user/refresh-token", customOptions).subscribe((data: any) => {
        this.tokenStorage.saveToken(data.token);
        resolve(data);

      }, (error: any): any => {
        if (error.status == 401) {
          this.tokenStorage.signOut();
          this.router.navigate(['/login']);
          return 0
        } else if (error.status == 403) {
          this.tokenStorage.signOut();
          this.router.navigate(['/login']);
          rejects(error);
        } else {
          rejects(error);
        }
      })
    });
  }

}
