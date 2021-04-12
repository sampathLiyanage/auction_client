import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuctionItem } from './app.auction-item';
import {ConfigService} from './config.service';
import {Router, UrlSerializer} from '@angular/router';

export interface ParamsForGetAuctionItem {
  offset: number;
  limit: number;
  sortField: string;
  sortOrder: string;
  filter: string;
}

export interface ResponseForAuctionItems {
  data: AuctionItem[];
  meta: any;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private serializer: UrlSerializer) {
  }

  getAuctionItems(params: ParamsForGetAuctionItem): Observable<ResponseForAuctionItems> {
    return this.http.get<ResponseForAuctionItems>(ConfigService.API_BASE_URL + 'items' + this.getUrlParams(params));
  }

  private getUrlParams(queryParams: any): any {
    if (typeof queryParams !== 'object') {
      return '';
    }
    const tree = this.router.createUrlTree([], {queryParams});
    return this.serializer.serialize(tree);
  }
}
