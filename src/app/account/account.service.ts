import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  BACKEND_URL = environment.BACKEND_URL;
  userId: string = '';
  loginStatus: Subject<boolean> = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  userLogin(form: { email: string; password: string }) {
    return this.http.post<{
      user: User | null;
      token: string | null;
      message: string;
    }>(`${this.BACKEND_URL}user/login`, form);
  }

  userSignup(form: User) {
    return this.http.post<{
      user: User | null;
      token: string | null;
      message: string;
    }>(`${this.BACKEND_URL}user/signup`, form);
  }

  getLoginStatusUpdated() {
    return this.loginStatus.asObservable();
  }

  login(token: string) {
    this.localStorageService.setToken(token);
    this.loginStatus.next(true);
  }

  logout() {
    this.localStorageService.removeToken();
    this.loginStatus.next(false);
  }
}
