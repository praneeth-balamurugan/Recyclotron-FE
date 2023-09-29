import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Waste } from '../waste.model';
import { ScrapService } from './scrap.service';

@Component({
  selector: 'app-scrap',
  templateUrl: './scrap.component.html',
  styleUrls: ['./scrap.component.scss'],
})
export class ScrapComponent implements OnInit {
  wastes: Waste[];
  wastesBeforeQuering;
  wasteAvailable: number = 0;
  searchString: FormGroup;
  searchQuery = '';
  availableFilters = [];
  wasteBased = ['Animal Based', 'Plant Based'];

  constructor(
    private scrapService: ScrapService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._searchQuery();
    this.scrapService.getAllScraps().subscribe((res) => {
      this.wasteAvailable = res.wastes.length;
      if (res.wastes.length > 0) {
        this.wastesBeforeQuering = res.wastes;
        this.wastes = this.wastesBeforeQuering;
        res.wastes.forEach((w) => {
          this.availableFilters.push(w.scrapId);
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

  onProductClicked(id: string) {
    this.router.navigate(['sc/' + id]);
  }

  onLocationChange(event: any) {
    if (event.value == null) {
      return (this.wastes = this.wastesBeforeQuering);
    }
    this.wastes = [];
    this.wastesBeforeQuering.forEach((w) => {
      if (w.scrapId.location === event.value) {
        this.wastes.push(w);
      }
    });
  }

  onQuantityChange(event: any) {
    if (event.value == null) {
      return (this.wastes = this.wastesBeforeQuering);
    }
    this.wastes = [];
    this.wastesBeforeQuering.forEach((w) => {
      if (w.scrapId.quantity === event.value) {
        this.wastes.push(w);
      }
    });
  }

  onWasteBasedChange(event: any) {
    if (event.value == null) {
      return (this.wastes = this.wastesBeforeQuering);
    }
    this.wastes = [];
    this.wastesBeforeQuering.forEach(
      (w) => {
        let filter = event.value.split(' ').join('').toLowerCase();
        let wFilter = w.origin.split(' ').join('').toLowerCase();
        if (wFilter === filter) {
          this.wastes.push(w);
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

  private _searchQuery() {
    this.searchString = this.formBuilder.group({
      search: [''],
    });

    this.searchString.controls['search'].valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((res) => {
        this.searchQuery = res;
        this.wastes = [];
        this.wastesBeforeQuering.forEach((w) => {
          if (w.scrapId.product.toLowerCase().startsWith(res.toLowerCase())) {
            this.wastes.push(w);
          }
        });
      });
  }
}
