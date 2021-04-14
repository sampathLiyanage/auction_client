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
  @ViewChild(BidHistoryComponent) bidHistoryList!: BidHistoryComponent;
  constructor(private route: ActivatedRoute, private apiService: ApiService, private snackbar: MatSnackBar) {
    this.itemId = null;
    this.item = null;
    this.itemName = '';
  }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) {
      this.getAuctionItem(this.itemId);
    }
  }

  private getAuctionItem(id: string): void {
    this.apiService.getAuctionItem(id)
      .subscribe(item => {
        this.item = item.data;
        this.itemName = this.item ? this.item.name : '';
      });
  }

  bidNow(event: any): void {
    debugger;
    this.apiService.placeBid({item_id: event.item.id, amount: event.bid, is_auto_bid: event.is_auto_bid}).subscribe(() => {
      this.snackbar.open('Bid Placed Successfully', undefined, {duration: 5000});
      this.bidHistoryList.getBidHistory();
    });
  }
}
