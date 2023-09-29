import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/account/user.model';
import { DeleteDialogComponent } from 'src/app/helper/delete-dialog/delete-dialog.component';
import { Scrap } from 'src/app/scrap.model';
import { Waste } from 'src/app/waste.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-view-scrap',
  templateUrl: './admin-view-scrap.component.html',
  styleUrls: ['./admin-view-scrap.component.scss'],
})
export class AdminViewScrapComponent implements OnInit {
  scrapId: string;
  adminId: string;
  scrapDetail: Scrap;
  adminDetail: User;
  form: FormGroup;
  isLoading: boolean;
  currentDateTime: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datepipe: DatePipe,
    private messageService: MessageService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._initForm();
    this.route.params.subscribe(
      (params) => {
        if (params['sid'] && params['id']) {
          this.scrapId = params['sid'];
          this.adminId = params['id'];
          this.userService
            .getScrapDetailById(params['sid'])
            .subscribe((res) => {
              if (res.scrap._id) {
                this.scrapDetail = res.scrap;
              }
            });
          this.userService.getUserDetailById(this.adminId).subscribe(
            (res) => {
              if (res.user._id) {
                this.adminDetail = res.user;
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

  openDeleteDialog() {
    let dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res === 'yes') {
          this.userService.deleteScrap(this.scrapId).subscribe(
            (res) => {
              if (res.scrap._id) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: res.message,
                });
                window.setTimeout(() => {
                  this.router.navigate(['u/' + this.adminId]);
                }, 2500);
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

  onSubmit() {
    this.isLoading = true;
    if (this.form.invalid) return;

    this.currentDateTime = this.datepipe.transform(
      new Date(),
      'dd/MM/yyyy h:mm a'
    );

    const f = this.form.value;

    const form: Waste = {
      edibility: f.edibility,
      origin: f.origin,
      complexity: f.complexity,
      treatment: f.treatment,
      packagingDegradability: f.packagingDegradability,
      stageOfSupplyChain: f.stageOfSupplyChain,
      bioDegradability: f.bioDegradability,
      packaging: f.packaging,
      detail: f.detail,
      scrapId: this.scrapId,
      ApprovedAdminId: this.adminId,
      createdAt: this.currentDateTime,
    };

    this.userService.addNewWaste(form).subscribe(
      (res) => {
        if (res.waste != null) {
          this.userService
            .updateLockConformation(this.scrapId)
            .subscribe((res) => {
              if (res.scrap._id) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: res.message,
                });
                window.setTimeout(() => {
                  this.isLoading = false;
                  this.router.navigate(['u/' + this.adminId]);
                }, 2500);
              } else {
                this.isLoading = false;
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Waste uploaded, lock status not updated!',
                });
              }
            });
        } else {
          this.isLoading = false;
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

  private _initForm() {
    this.form = this.formBuilder.group({
      edibility: ['', [Validators.required]],
      origin: ['', [Validators.required]],
      complexity: ['', [Validators.required]],
      treatment: ['', [Validators.required]],
      packagingDegradability: ['', [Validators.required]],
      bioDegradability: ['', [Validators.required]],
      stageOfSupplyChain: ['', [Validators.required]],
      packaging: ['', [Validators.required]],
      detail: ['', [Validators.required]],
    });
  }
}
