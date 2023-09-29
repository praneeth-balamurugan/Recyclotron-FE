import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Waste } from 'src/app/waste.model';
import { ScrapService } from '../scrap.service';

@Component({
  selector: 'app-scrap-view',
  templateUrl: './scrap-view.component.html',
  styleUrls: ['./scrap-view.component.scss'],
})
export class ScrapViewComponent implements OnInit {
  wasteProduct: Waste;
  wasteProductId: string;

  constructor(
    private route: ActivatedRoute,
    private scrapService: ScrapService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['sid']) {
        this.wasteProductId = params['sid'];
        this.scrapService.getWasteById(params['sid']).subscribe((res) => {
          this.wasteProduct = res.waste
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
}
