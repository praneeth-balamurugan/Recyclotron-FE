import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { LoginComponent } from 'src/app/account/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  visibleSidebar: boolean = false;
  loginStatus: boolean;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.getLoginStatusUpdated().subscribe((res) => {
      this.loginStatus = res;
    });
  }

  onRoute(path: string) {
    this.onNavButtonClick();
    this.router.navigate([path]);
  }

  onNavButtonClick() {
    this.visibleSidebar = false;
  }

  logoutUser() {
    this.accountService.logout();
    this.router.navigate(['/']);
  }

  openLoginDialog() {
    this.onNavButtonClick();
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      hasBackdrop: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openUserAccount() {
    this.router.navigate(['u/' + this.accountService.userId]);
  }
}
