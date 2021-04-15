import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ApiService} from '../api.service';
import {AuctionItem} from '../app.auction-item';
import {LoginComponent} from '../login/login.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BidHistoryComponent} from '../bid-history/bid-history.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css']
})
export class BiddingComponent implements OnInit {

  itemId: string | null;
  item: AuctionItem | null;
  itemName: string;
  autoBidEnabled!: boolean | null;
  @ViewChild(BidHistoryComponent) bidHistoryList!: BidHistoryComponent;
  constructor(private route: ActivatedRoute, private apiService: ApiService, private snackbar: MatSnackBar) {
    this.itemId = null;
    this.item = null;
    this.itemName = '';
    this.autoBidEnabled = false;
  }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) {
      this.getAuctionItem(this.itemId);
      this.getAutoBidStatus(this.itemId);
    }
  }

  private getAuctionItem(id: string): void {
    this.apiService.getAuctionItem(id)
      .subscribe(item => {
        this.item = item.data;
        this.itemName = this.item ? this.item.name : '';
      });
  }


  private getAutoBidStatus(itemId: any): void {
    this.apiService.getAutoBidStatus({item_id: itemId})
      .subscribe(status => {
        this.autoBidEnabled = status.data.auto_bid_enabled ? true : false;
      });
  }

  bidNow(event: any): void {
    this.apiService.placeBid({item_id: event.item.id, amount: event.bid, is_auto_bid: event.is_auto_bid}).subscribe(() => {
      this.snackbar.open('Bid Placed Successfully', undefined, {duration: 5000});
      this.bidHistoryList.getBidHistory();
    });
  }

  updateAutoBidStatus(event: any): void {
    this.apiService.updateAutoBidStatus({item_id: event.item.id, auto_bid_enabled: event.auto_bid_enabled}).subscribe(() => {
      let message = 'Bid Placed Successfully';
      message = event.auto_bid_enabled ? 'Auto Bid Enabled' : 'Auto Bid Disabled';
      this.snackbar.open(message, undefined, {duration: 5000});
      this.bidHistoryList.getBidHistory();
    });
  }
}
