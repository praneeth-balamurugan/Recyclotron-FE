import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Waste } from 'src/app/waste.model';
import { ScrapService } from '../scrap.service';
import { Scrap } from 'src/app/scrap.model';
import { User } from 'src/app/account/user.model';

@Component({
  selector: 'app-scrap-view',
  templateUrl: './scrap-view.component.html',
  styleUrls: ['./scrap-view.component.scss'],
})
export class ScrapViewComponent implements OnInit {
  wasteProduct: Waste;
  wasteScrap: Scrap;
  wasteUser: User;
  wasteProductId: string;

  constructor(
    private route: ActivatedRoute,
    private scrapService: ScrapService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        if (params['sid']) {
          this.wasteProductId = params['sid'];
          this.scrapService.getWasteById(params['sid']).subscribe((res) => {
            this.wasteProduct = res['scrap'];
            console.log('WASTE', res);

            this.scrapService
              .getWasteScrapById(res['scrap'].scrapId)
              .subscribe((res) => {
                this.wasteScrap = res['scrap'][0];
                console.log('SCRAP', res);
                this.scrapService
                  .getWasteUserScrapById(res['scrap'][0].creator)
                  .subscribe((res) => {
                    this.wasteUser = res['user'];
                    console.log(res);
                  });
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
      }
    );
  }

  deleteScrap() {
    this.route.params.subscribe((params) => {
      if (params['sid']) {
        this.scrapService.deleteScrapById(params['sid']).subscribe((res) => {
          console.log('WASTE', res);
        });
      }
    });
  }
}
