import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DeleteDialogComponent } from 'src/app/helper/delete-dialog/delete-dialog.component';
import { LockConformationDialogComponent } from 'src/app/helper/lock-conformation-dialog/lock-conformation-dialog.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-scrap-table',
  templateUrl: './admin-scrap-table.component.html',
  styleUrls: ['./admin-scrap-table.component.scss'],
})
export class AdminScrapTableComponent implements OnInit {
  enteredScraps = [];
  uId: string;
  isScrapAvailable = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userService.getAllScraps().subscribe((res) => {
      if (res.scraps.length > 0) {
        for (let scraps of res.scraps) {
          if (scraps.isLocked === false) {
            this.enteredScraps.push(scraps);
          }
        }
      }
      if (this.enteredScraps.length > 0) {
        this.isScrapAvailable = true;
      }
    },
    (err) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: err.error.message,
      });
    });
    this.route.params.subscribe((params: any) => {
      if (params['id']) {
        this.uId = params['id'];
      }
    });
  }

  viewScrap(id: string) {
    this.router.navigate([`u/a/${this.uId}/sc/${id}`]);
  }

  openLockScrapConformationDialog(id: string) {
    let dialogRef = this.dialog.open(LockConformationDialogComponent);

    dialogRef.afterClosed().subscribe((res) => {
      if (res == 'lock') {
        this.userService.updateLockConformation(id).subscribe((res) => {
          if (res.scrap._id) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
            this.enteredScraps = [];
            this.isScrapAvailable = false;
            this.userService.getAllScraps().subscribe((res) => {
              if (res.scraps.length) {
                for (let scraps of res.scraps) {
                  if (scraps.isLocked === false) {
                    this.enteredScraps.push(scraps);
                  }
                }
                if (this.enteredScraps.length > 0) {
                  this.isScrapAvailable = true;
                }
              }
            },
            (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: err.error.message,
              });
            });
          }
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
          });
        });
      }
    });
  }

  openDeleteDialog(id: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res === 'yes') {
          this.userService.deleteScrap(id).subscribe(
            (res) => {
              if (res.scrap._id) {
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
              this.userService.getAllScraps().subscribe(
                (res) => {
                  this.enteredScraps = [];
                  this.isScrapAvailable = false;
                  if (res.scraps.length > 0) {
                    for (let scraps of res.scraps) {
                      if (scraps.isLocked === false) {
                        this.enteredScraps.push(scraps);
                      }
                    }
                    if (this.enteredScraps.length > 0) {
                      this.isScrapAvailable = true;
                    }
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
}
