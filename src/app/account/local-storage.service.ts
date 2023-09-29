import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setToken(token: string) {
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  getToken() {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  removeToken() {
    window.localStorage.removeItem(TOKEN_KEY);
  }
}
