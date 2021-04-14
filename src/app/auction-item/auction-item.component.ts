import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ApiService } from '../api.service';
import { AuctionItem } from '../app.auction-item';

@Component({
  selector: 'app-auction-item',
  templateUrl: './auction-item.component.html',
  styleUrls: ['./auction-item.component.css']
})
export class AuctionItemComponent implements OnInit {

  @Input() item!: AuctionItem;
  @Input() latestBid!: number;
  @Input() showSummaryOnly: boolean;
  @Output() onBid: EventEmitter<any> = new EventEmitter();
  bidAmount!: number;
  constructor(private apiService: ApiService) {
    this.showSummaryOnly = true;
  }

  bidNow(): void {
    this.onBid.emit({item: this.item, bid: this.bidAmount});
  }

  ngOnInit(): void {
  }

}
