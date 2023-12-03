import { Injectable } from '@angular/core';

const TOKEN_KEY = 'back_to_originUserToken';
const USER_KEY = 'authUser';
const REMEMBER_KEY = 'rememberMe';
const ROLE_KEY = 'userRole';


@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    constructor() { }

    signOut(): void {
        localStorage.clear();
        window.localStorage.clear();
    }

    public saveToken(token: string): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }

    public saveRefreshToken(token: string): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token);
    }

    public saveUser(user: any): void {
        localStorage.removeItem(USER_KEY);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUser(): any {
        const user = localStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }

        //RememberMe
  public saveRememberMe(data: any): void {
    window.sessionStorage.removeItem(REMEMBER_KEY);
    window.sessionStorage.setItem(REMEMBER_KEY, JSON.stringify(data));
  }

  public getRememberMe(): any {
    const section = window.sessionStorage.getItem(REMEMBER_KEY);
    if (section) {
      return JSON.parse(section);
    }else{
      return undefined;
    }
  }

  public removeRememberMe(): void {
    window.sessionStorage.removeItem(REMEMBER_KEY);
  }

}