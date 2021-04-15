import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {ConfigService} from './config.service';
import {Router, UrlSerializer} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {LoginComponent} from './login/login.component';
import {MatSnackBar} from '@angular/material/snack-bar';

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
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  login(): Observable<any> {
    return new Observable((observer) => {
      this.openLoginDialog().subscribe((credentials: any) => {
        if (typeof credentials === 'object') {
          this.http.post<any>(ConfigService.API_BASE_URL + 'login', credentials).subscribe(user => {
            user = user.data;
            localStorage.setItem('api_token', user.api_token);
            localStorage.setItem('user_id', user.id);
            this.snackBar.open('Logged In Successfully', undefined, {duration: 2000});
            location.reload();
            observer.complete();
          }, error => {
            this.snackBar.open('Invalid Credentials', undefined, {duration: 2000});
            observer.complete();
          });
        } else {
          observer.error();
        }
      });
      return {unsubscribe() {}};
    });
  }

  isLoggedIn(): boolean {
    const user = this.getUser();
    const apiToken = user?.api_token;
    const userId = user?.user_id;
    if (apiToken && userId) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.clear();
    this.snackBar.open('Logged Out Successfully', undefined, {duration: 2000});
  }

  getAuctionItems(params: any): Observable<any> {
    return this.http.get<any>(ConfigService.API_BASE_URL + 'items' + this.getUrlParams(params));
  }

  getAuctionItem(id: string): Observable<any> {
    return this.http.get<any>(ConfigService.API_BASE_URL + 'items/' + id);
  }

  getConfiguration(): Observable<any> {
    const user = this.getUser();
    const apiToken = user?.api_token;
    const userId = user?.user_id;
    return this.http.get<any>(
      ConfigService.API_BASE_URL + 'configurations/' + userId,
      {headers: new HttpHeaders({Authorization: 'Bearer ' + apiToken})}
    );
  }

  updateConfiguration(config: any): Observable<any> {
    const user = this.getUser();
    const apiToken = user?.api_token;
    const userId = user?.user_id;
    return this.http.patch<any>(
      ConfigService.API_BASE_URL + 'configurations/' + userId, config,
      {headers: new HttpHeaders({Authorization: 'Bearer ' + apiToken})}
    );
  }

  updateAutoBidStatus(params: any): Observable<any> {
    const user = this.getUser();
    const apiToken = user?.api_token;
    params.user_id = user?.user_id;
    return this.http.patch<any>(
      ConfigService.API_BASE_URL + 'autoBidStatus', params,
      {headers: new HttpHeaders({Authorization: 'Bearer ' + apiToken})}
    );
  }

  getAutoBidStatus(params: any): Observable<any> {
    const user = this.getUser();
    const apiToken = user?.api_token;
    params.user_id = user?.user_id;
    return this.http.get<any>(
      ConfigService.API_BASE_URL + 'autoBidStatus' + this.getUrlParams(params),
      {headers: new HttpHeaders({Authorization: 'Bearer ' + apiToken})}
    );
  }

  getBidHistory(params: any): Observable<any> {
    return this.http.get<any>(ConfigService.API_BASE_URL + 'bids' + this.getUrlParams(params));
  }

  placeBid(params: any): Observable<any> {
    const dummyObservable = new Observable<any>((observer) => {
      observer.complete();
    });
    if (!this.isLoggedIn()) {
      this.login().subscribe();
    } else {
      return this.doPlaceBid(params);
    }
    return dummyObservable;
  }

  private doPlaceBid(params: any): Observable<any> {
    const user = this.getUser();
    const apiToken = user?.api_token;
    const userId = user?.user_id;
    params.user_id = userId;
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
