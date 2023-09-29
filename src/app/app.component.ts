import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { LocalStorageService } from './account/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  token: string = '';
  isTokenAvailable: boolean;

  constructor(
    private accountService: AccountService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.token = this.localStorageService.getToken();
    if (this.token != '') {
      this.accountService.loginStatus.next(true);
    } else {
      this.accountService.logout();
    }
  }
}
