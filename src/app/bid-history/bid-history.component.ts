import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-bid-history',
  templateUrl: './bid-history.component.html',
  styleUrls: ['./bid-history.component.css']
})
export class BidHistoryComponent implements OnInit {

  @Input() itemId !: number;
  constructor(private apiService: ApiService) { }
  displayedColumns: string[] = ['name', 'amount', 'created_at'];
  bidHistoryList!: any[];

  ngOnInit(): void {
    this.getBidHistory();
  }

  formatDateTime(datetime: string): string {
    const date = new Date(datetime);
    return date.toLocaleString();
  }

  getBidHistory(): void {
    this.apiService.getBidHistory({itemId: this.itemId})
      .subscribe(items => {
        debugger;
        this.bidHistoryList = items.data.map((element: any) => {
          element.name = element.user.name;
          return element;
        });
      });
  }
}
