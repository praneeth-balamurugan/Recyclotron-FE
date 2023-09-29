import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  onSubmit() {
    this.isLoading = true;
    if (this.form.invalid) return;

    const form = {
      userName: this.form.value.userName,
      email: this.form.value.email,
      password: this.form.value.password,
      industryName: this.form.value.industryName,
      industryLocation: this.form.value.industryLocation,
      phoneNo: this.form.value.phoneNo,
      isAdmin: false,
    };

    this.accountService.userSignup(form).subscribe((res) => {
      if (res.user === null) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: res.message,
        });
        this.isLoading = false;
      } else {
        this.form.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message,
        });
        this.accountService.login(res.token);
        this.isLoading = false;
        this.accountService.userId = res.user._id;
        this.router.navigate(['u/' + res.user._id]);
      }
    });
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      industryName: ['', [Validators.required]],
      industryLocation: ['', [Validators.required]],
      phoneNo: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }
}
