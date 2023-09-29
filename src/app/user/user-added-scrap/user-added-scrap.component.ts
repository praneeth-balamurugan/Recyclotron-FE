import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DeleteDialogComponent } from 'src/app/helper/delete-dialog/delete-dialog.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-added-scrap',
  templateUrl: './user-added-scrap.component.html',
  styleUrls: ['./user-added-scrap.component.scss'],
})
export class UserAddedScrapComponent implements OnInit {
  id: string;
  userAddedScraps = [];
  isScrapAvailable = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
      }
    });
    this.userService.getScrapsByCreatorId(this.id).subscribe(
      (res) => {
        if (res.scraps.length > 0) {
          this.isScrapAvailable = true;
          this.userAddedScraps = res.scraps;
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

  userAddedScrap(id: string) {
    this.router.navigate(['u/' + id + '/add-s'], {
      queryParams: { edit: true },
    });
  }

  openDeleteDialog(id: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'yes') {
        this.userService.deleteScrap(id).subscribe(
          (res) => {
            if (res.scrap._id) {
              if (res.scrap.isLocked === true) {
                this.userService.deleteWaste(id).subscribe(
                  (res) => {
                    if (res.success) {
                      this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: res.message,
                      });
                    } else {
                      this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
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
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: res.message,
              });
            }
            this.userService.getScrapsByCreatorId(this.id).subscribe(
              (res) => {
                if (res.scraps.length > 0) {
                  this.isScrapAvailable = true;
                  this.userAddedScraps = res.scraps;
                } else {
                  this.isScrapAvailable = false;
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
}
