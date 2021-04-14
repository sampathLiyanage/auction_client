import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  @Output() onSearch: EventEmitter<any> = new EventEmitter();
  @Output() onConfig: EventEmitter<any> = new EventEmitter();

  searchString: string;
  constructor(private router: Router ) {
    this.searchString = '';
  }

  gotoHome(): void {
    this.router.navigate(['']);
  }

  ngOnInit(): void {
  }
}
