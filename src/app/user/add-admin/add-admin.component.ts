import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { AccountService } from 'src/app/account/account.service';
import { User } from 'src/app/account/user.model';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {
  form: FormGroup;
  isLoading = false;

  constructor(
    private dialogRef: MatDialogRef<AddAdminComponent>,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.invalid) return;

    const f = this.form.value;
    const addAdminForm: User = {
      userName: f.adminName,
      email: f.email,
      password: f.password,
      isAdmin: true,
    };

    this.accountService.userSignup(addAdminForm).subscribe(
      (res) => {
        if (res.user === null) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
          this.dialogRef.close();
        } else {
          this.form.reset();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
        }
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
        });
      }
    );
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      adminName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
