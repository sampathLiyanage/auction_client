import {Component, OnInit, ViewChild} from '@angular/core';
import {AuctionItem} from '../app.auction-item';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  itemCount: number;

  items: AuctionItem[];
  listTotalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  sortOptions: any[];
  @ViewChild('paginator') paginator: any;
  private lastSortField: string;
  private lastSortOrder: string;
  private lastSearch: string;

  // MatPaginator Output
  constructor(private apiService: ApiService, private router: Router ) {
    this.itemCount = 10;
    this.items = [];
    this.lastSearch = '';
    this.lastSortField = '';
    this.lastSortOrder = '';
    this.sortOptions = [{name: 'Default', value: ''}, {name: 'Price low to high', value: '1'}, {name: 'Price high to low', value: '2'}];
    this.getAuctionItems();
  }

  ngOnInit(): void {
  }

  changePage = ($event: any) => {
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;
    this.getAuctionItems();
  }

  search(searchString: string): void {
    this.lastSearch = searchString;
    this.paginator.pageIndex = 0;
    this.pageIndex = 0;
    this.getAuctionItems();
  }

  sort(sortValue: string): void {
    this.lastSortField = 'price';
    this.pageIndex = 0;
    this.paginator.pageIndex = 0;
    if (sortValue === '1') {
      this.lastSortOrder = 'asc';
    } else if (sortValue === '2') {
      this.lastSortOrder = 'desc';
    } else {
      this.lastSortField = '';
      this.lastSortOrder = '';
    }
    this.getAuctionItems();
  }

  showDetailedView(event: any): void {
    this.router.navigate(['/items/' + event.item.id]);
  }

  private getAuctionItems(): void {
    this.apiService.getAuctionItems({
        offset: this.pageIndex * this.pageSize,
        limit: this.pageSize,
        sortField: this.lastSortField,
        sortOrder: this.lastSortOrder,
        filter: this.lastSearch
    })
      .subscribe(items => {
        this.items = items.data;
        this.listTotalCount = items.meta.total;
        window.scrollTo(0, 0 );
      });
  }
}
