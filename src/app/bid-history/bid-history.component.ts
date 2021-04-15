import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-bid-history',
  templateUrl: './bid-history.component.html',
  styleUrls: ['./bid-history.component.css']
})
export class BidHistoryComponent implements OnInit {

  displayedColumns: string[] = ['name', 'amount', 'created_at', 'is_auto_bid'];
  bidHistoryList!: any[];
  public latestBid: any;
  private subscription!: Subscription;

  @Input() itemId !: number;
  constructor(private apiService: ApiService) {
    this.latestBid = null;
  }

  ngOnInit(): void {
    this.getBidHistory();
    this.subscription = interval(10000).subscribe(x => {
      this.getBidHistory();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  formatDateTime(datetime: string): string {
    const date = new Date(datetime);
    return date.toLocaleString('en-US', {hour12: true });
  }

  getBidHistory(): void {
    this.apiService.getBidHistory({itemId: this.itemId})
      .subscribe(items => {
        this.bidHistoryList = items.data.map((element: any) => {
          element.name = element.user.name;
          return element;
        });
        this.setLatestBid();
      });
  }

  setLatestBid(): void {
    if (Array.isArray(this.bidHistoryList) && this.bidHistoryList.length > 0) {
      this.latestBid = this.bidHistoryList[0];
    } else {
      this.latestBid = null;
    }
  }
}
