import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Input() title!: string;
  @Output() onSearch: EventEmitter<any> = new EventEmitter();

  searchString: string;
  constructor() {
    this.searchString = '';
  }

  ngOnInit(): void {
  }

  search(): void {
    debugger;
    this.onSearch.emit(this.searchString);
  }
}
