import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  @Output() onSearch: EventEmitter<any> = new EventEmitter();
  @Output() onConfig: EventEmitter<any> = new EventEmitter();

  searchString: string;
  constructor(private router: Router, public apiService: ApiService) {
    this.searchString = '';
  }

  gotoHome(): void {
    this.router.navigate(['']);
  }

  toggleLogInOut(): void {
    if (this.apiService.isLoggedIn()) {
      this.apiService.logout();
    } else {
      this.apiService.login().subscribe(() => {});
    }
  }

  ngOnInit(): void {
  }
}
