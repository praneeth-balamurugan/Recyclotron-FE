import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-my-detail',
  templateUrl: './edit-my-detail.component.html',
  styleUrls: ['./edit-my-detail.component.scss'],
})
export class EditMyDetailComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  userDetail: any;

  constructor(
    private dialogRef: MatDialogRef<EditMyDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this._initForm();
    this.userService.getUserDetailById(this.data.id).subscribe((res) => {
      if (res.user) {
        this.userDetail = res.user;
        this._setFormValue();
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit() {}

  private _initForm() {
    if (this.data.isAdmin === true) {
      this.form = this.formBuilder.group({
        userName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        industryName: [''],
        industryLocation: [''],
        phoneNo: [''],
      });
    } else {
      this.form = this.formBuilder.group({
        userName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        industryName: ['', [Validators.required]],
        industryLocation: ['', [Validators.required]],
        phoneNo: ['', [Validators.required]],
      });
    }
  }

  private _setFormValue() {
    this.form.get('userName').setValue(this.userDetail.userName);
    this.form.get('email').setValue(this.userDetail.email);
    this.form.get('phoneNo').setValue(this.userDetail.phoneNo);
    this.form.get('industryName').setValue(this.userDetail.industryName);
    this.form
      .get('industryLocation')
      .setValue(this.userDetail.industryLocation);
  }
}
