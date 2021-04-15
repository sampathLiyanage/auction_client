import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { ApiService } from '../api.service';
import { AuctionItem } from '../app.auction-item';
import {BidHistoryComponent} from '../bid-history/bid-history.component';
import {MatInput} from '@angular/material/input';
import {AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, NgModel, Validators} from '@angular/forms';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-auction-item',
  templateUrl: './auction-item.component.html',
  styleUrls: ['./auction-item.component.css']
})
export class AuctionItemComponent implements OnInit {

  @Input() item!: AuctionItem;
  @Input() latestBid!: number | null | undefined;
  @Input() autoBidEnabled!: boolean | null | undefined;
  @Input() showSummaryOnly: boolean;
  @Output() onBid: EventEmitter<any> = new EventEmitter();
  @Output() onToggleAutoBid: EventEmitter<any> = new EventEmitter();
  bidAmount!: number;
  bidForm!: FormGroup;
  constructor(public apiService: ApiService, private formBuilder: FormBuilder) {
    this.showSummaryOnly = true;
  }

  bidNow(form: any): void {
    if (this.showSummaryOnly || form.valid) {
      this.onBid.emit({item: this.item, bid: this.bidAmount});
      this.bidForm.get('bidInput')?.updateValueAndValidity();
    }
  }

  toggleAutoBid(): void {
    this.onToggleAutoBid.emit({item: this.item, auto_bid_enabled: this.autoBidEnabled});
  }

  isBiddingOngoing(): boolean {
    if (typeof this.item === 'undefined' || this.item.auction_end_time === null) {
      return false;
    }
    const currentDateTimeUtc = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (Date.parse(this.item.auction_end_time) <= Date.parse(currentDateTimeUtc)) {
      return false;
    }
    return true;
  }

  getBidNowButtonLabel(): string {
    if (typeof this.item === 'undefined' || this.item.auction_end_time === null) {
      return this.showSummaryOnly ? 'More Details' : 'Bidding Not Started';
    }
    const currentDateTimeUtc = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (Date.parse(this.item.auction_end_time) <= Date.parse(currentDateTimeUtc)) {
      return this.showSummaryOnly ? 'More Details' : 'Bidding Closed';
    }
    return 'Bid Now';
  }

  ngOnInit(): void {
    this.bidForm = this.formBuilder.group({
      bidInput: new FormControl('', [
        Validators.required,
        (control: AbstractControl) => Validators.min((this.latestBid ? this.latestBid : 0) + 1)(control)
      ])
    });
  }

}
