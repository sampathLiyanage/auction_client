import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface SelectOption {
  name: string;
  value: stirng;
}

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})

export class SortComponent implements OnInit {
  @Input() sortOptions: SelectOption[];
  @Input() initialValue: string;
  @Output() onSort: EventEmitter<any> = new EventEmitter();
  constructor() {
    this.initialValue = '';
    this.sortOptions = [];
  }

  ngOnInit(): void {
  }

  sort($event: any): void {
    this.onSort.emit($event.value);
  }

}
