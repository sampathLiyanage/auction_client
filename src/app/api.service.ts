import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {ConfigService} from './config.service';
import {Router, UrlSerializer} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {LoginComponent} from './login/login.component';

export interface UserCredentials{
  api_token: string | null;
  user_id: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private token!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private serializer: UrlSerializer,
    private dialog: MatDialog) {
  }

  login(): Observable<any> {
    return new Observable((observer) => {
      this.openLoginDialog().subscribe((credentials: any) => {
        if (typeof credentials === 'object') {
          this.http.post<any>(ConfigService.API_BASE_URL + 'login', credentials).subscribe(user => {
            user = user.data;
            localStorage.setItem('api_token', user.api_token);
            localStorage.setItem('user_id', user.id);
            observer.complete();
          });
        } else {
          observer.error();
        }
      });
      return {unsubscribe() {}};
    });
  }

  getAuctionItems(params: any): Observable<any> {
    return this.http.get<any>(ConfigService.API_BASE_URL + 'items' + this.getUrlParams(params));
  }

  getAuctionItem(id: string): Observable<any> {
    return this.http.get<any>(ConfigService.API_BASE_URL + 'items/' + id);
  }

  getBidHistory(params: any): Observable<any> {
    return this.http.get<any>(ConfigService.API_BASE_URL + 'bids' + this.getUrlParams(params));
  }

  placeBid(params: any): Observable<any> {
    const dummyObservable = new Observable<any>((observer) => {
      observer.complete();
    });
    const user = this.getUser();
    const apiToken = user?.api_token;
    if (!apiToken) {
      this.login().subscribe(() => {
          params.user_id = user?.user_id;
          return this.doPlaceBid(params, apiToken);
      });
    } else {
      params.user_id = user?.user_id;
      return this.doPlaceBid(params, apiToken);
    }
    return dummyObservable;
  }

  private doPlaceBid(params: any, apiToken: any): Observable<any> {
    return this.http.post<any>(
      ConfigService.API_BASE_URL + 'bids',
      params,
      {headers: new HttpHeaders({Authorization: 'Bearer ' + apiToken})}
    );
  }

  private getUrlParams(queryParams: any): any {
    if (typeof queryParams !== 'object') {
      return '';
    }
    return '?' + new HttpParams({ fromObject: queryParams }).toString();
  }

  private openLoginDialog(): Observable<any> {
    const dialogRef = this.dialog.open(LoginComponent);
    return dialogRef.afterClosed();
  }

  private getUser(): UserCredentials | null {
    return {api_token: localStorage.getItem('api_token'), user_id: localStorage.getItem('user_id')};
  }
}
