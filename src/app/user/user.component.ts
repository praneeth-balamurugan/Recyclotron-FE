import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from '../account/user.model';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { EditMyDetailComponent } from './edit-my-detail/edit-my-detail.component';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userDetail: User;
  userId: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.userId = params['id'];
        this.userService.getUserDetailById(params['id']).subscribe(
          (res) => {
            if (res.user != null) {
              this.userDetail = res.user;
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
    });
  }

  openEditDetails() {
    let dialogRef = this.dialog.open(EditMyDetailComponent, {
      data: {
        id: this.userId,
        isAdmin: this.userDetail?.isAdmin,
      },
      width: '550px',
      hasBackdrop: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openScrapAvailability() {
    this.router.navigate(['u/' + this.userId + '/add-s']);
  }

  openAddAdminDialog() {
    let dialogRef = this.dialog.open(AddAdminComponent, {
      width: '550px',
      hasBackdrop: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
