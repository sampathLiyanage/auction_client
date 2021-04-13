import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Input() title!: string;
  @Output() onSearch: EventEmitter<any> = new EventEmitter();
  @Output() onConfig: EventEmitter<any> = new EventEmitter();

  searchString: string;
  constructor() {
    this.searchString = '';
  }

  ngOnInit(): void {
  }

  getType() {
    debugger;
    return typeof this.onConfig === 'undefined';
  }
}
