import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {LoginComponent} from '../login/login.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfigService} from '../config.service';
import {ConfigComponent} from '../config/config.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  @Output() onSearch: EventEmitter<any> = new EventEmitter();

  searchString: string;
  constructor(private router: Router, public apiService: ApiService, private dialog: MatDialog) {
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

  config(): void {
    const dialogRef = this.dialog.open(ConfigComponent);
  }

  ngOnInit(): void {
  }
}
