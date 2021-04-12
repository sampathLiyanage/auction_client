import {Component, Input, OnInit} from '@angular/core';
import { ApiService } from '../api.service';
import { AuctionItem } from '../app.auction-item';

@Component({
  selector: 'app-auction-item',
  templateUrl: './auction-item.component.html',
  styleUrls: ['./auction-item.component.css']
})
export class AuctionItemComponent implements OnInit {

  @Input() item!: AuctionItem;
  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
  }

}
