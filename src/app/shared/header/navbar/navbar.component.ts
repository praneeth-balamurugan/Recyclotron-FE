import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { LoginComponent } from 'src/app/account/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  loginStatus: boolean;

  constructor(
    private dialog: MatDialog,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountService.getLoginStatusUpdated().subscribe((res) => {
      this.loginStatus = res;
    });
  }

  logoutUser() {
    this.accountService.logout();
    this.router.navigate(['/']);
  }

  openUserAccount() {
    this.router.navigate(['u/' + this.accountService.userId]);
  }

  openLoginDialog() {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      hasBackdrop: true,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
