import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Scrap } from 'src/app/scrap.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-scrap',
  templateUrl: './add-scrap.component.html',
  styleUrls: ['./add-scrap.component.scss'],
})
export class AddScrapComponent implements OnInit {
  transportationOptions = ['Yes', 'No'];
  form: FormGroup;
  imageDisplay: any;
  id!: string;
  currentDateTime!: string;
  isLoading: boolean = false;
  editMode: boolean = false;
  scrapDetail: Scrap;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
        this.route.queryParams.subscribe(
          (res) => {
            if (res.edit === 'true') {
              this._initForm(true);
              this.editMode = true;
              this.userService.getScrapDetailById(this.id).subscribe(
                (res) => {
                  if (res.scrap._id) {
                    this.scrapDetail = res.scrap;
                    this._setFormValues();
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
            } else {
              this._initForm(false);
              this.editMode = false;
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

  onUpload(event: any) {
    const file = event.files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.isLoading = true;

    if (this.form.invalid) return;

    this.currentDateTime = this.datepipe.transform(
      new Date(),
      'dd/MM/yyyy h:mm a'
    );

    if (this.editMode) {
      this._updateForm();
    } else {
      this._submitForm();
    }
  }

  private _submitForm() {
    const f = this.form.value;
    // const scrapForm = new FormData();
    // scrapForm.append('product', f.product),
    //   scrapForm.append('quantity', f.quantity),
    //   scrapForm.append('scrapProducedTime', f.scrapProducedTime),
    //   scrapForm.append('utilizableTime', f.utilizableTime),
    //   scrapForm.append('transportationAvailable', f.transportationOptions),
    //   scrapForm.append('location', f.location),
    //   scrapForm.append('image', f.image),
    //   scrapForm.append('createdAt', this.currentDateTime),
    //   scrapForm.append('creator', this.id),
    const scrapForm = {
      product: f.product,
      quantity: f.quantity,
      scrapProductTime: f.scrapProductTime,
      utilizable: f.utilizable,
      transportationOptions: f.transportationOptions,
      location: f.location,
      createdAt: this.currentDateTime,
      creator: this.id
    }


      this.userService.addNewScrap(scrapForm).subscribe(
        (res) => {
          if (res.scrap != null) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
            window.setTimeout(() => {
              this.isLoading = false;
              this.router.navigate([`u/${res.scrap.creator}`]);
            }, 3000);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message,
            });
            this.isLoading = false;
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

  private _updateForm() {
    const f = this.form.value;
    const scrapForm = {
      product: f.product,
      quantity: f.quantity,
      scrapProducedTime: f.scrapProducedTime,
      utilizableTime: f.utilizableTime,
      transportationAvailable: f.transportationOptions,
      location: f.location,
      scrapProcessingDescription: f.processParameter,
      createdAt: this.currentDateTime,
    };
    this.userService.updateScrapFromUser(scrapForm, this.id).subscribe(
      (res) => {
        if (res.scrap != null) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          window.setTimeout(() => {
            this.isLoading = false;
            this.router.navigate([`u/${res.scrap.creator}`]);
          }, 3000);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
          this.isLoading = false;
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

  private _initForm(edit: boolean) {
    if (edit) {
      this.form = this.formBuilder.group({
        product: [''],
        quantity: [''],
        scrapProducedTime: [''],
        utilizableTime: [''],
        transportationOptions: [''],
        location: [''],
        processParameter: [''],
      });
    } else {
      this.form = this.formBuilder.group({
        product: [''],
        quantity: [''],
        scrapProducedTime: [''],
        utilizableTime: [''],
        transportationOptions: [''],
        location: [''],
        processParameter: ['']
      });
    }
  }

  private _setFormValues() {
    this.form.get('product').setValue(this.scrapDetail.product);
    this.form.get('quantity').setValue(this.scrapDetail.quantity);
    this.form
      .get('scrapProducedTime')
      .setValue(new Date(this.scrapDetail.scrapProducedTime));
    this.form
      .get('utilizableTime')
      .setValue(new Date(this.scrapDetail.utilizableTime));
    this.form
      .get('transportationOptions')
      .setValue(this.scrapDetail.transportationAvailable);
    this.form.get('location').setValue(this.scrapDetail.location);
    this.form
      .get('processParameter')
      .setValue(this.scrapDetail.scrapProcessingDescription);
    this.imageDisplay = this.scrapDetail.image;
  }
}
