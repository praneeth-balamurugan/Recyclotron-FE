import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private messageService: MessageService,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {}

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    if (!form.value.email) {
      this.isLoading = false;
      return this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Enter a Valid Email',
      });
    } else if (!form.value.password || form.invalid) {
      this.isLoading = false;
      return this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Enter Valid Password',
      });
    }

    const loginForm = {
      email: form.value.email,
      password: form.value.password,
    };

    this.accountService.userLogin(loginForm).subscribe((res) => {
      if (res.user === null) {
        this.isLoading = false;
        this.dialogRef.close();
        return this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: res.message,
        });
      } else {
        window.setTimeout(() => {
          this.isLoading = false;
          this.dialogRef.close();
          this.accountService.userId = res.user[0]._id;
          this.accountService.login(res.token);
          this.router.navigate([`u/${res.user[0]?._id}`]);
        }, 1500);
      }
    });
  }

  onSignup() {
    this.dialogRef.close();
    this.router.navigate(['u/signup']);
  }
}
