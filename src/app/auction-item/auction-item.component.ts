import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { ApiService } from '../api.service';
import { AuctionItem } from '../app.auction-item';
import {BidHistoryComponent} from '../bid-history/bid-history.component';
import {MatInput} from '@angular/material/input';
import {AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, NgModel, Validators} from '@angular/forms';

@Component({
  selector: 'app-auction-item',
  templateUrl: './auction-item.component.html',
  styleUrls: ['./auction-item.component.css']
})
export class AuctionItemComponent implements OnInit {

  @Input() item!: AuctionItem;
  @Input() latestBid!: number | null | undefined;
  @Input() showSummaryOnly: boolean;
  @Output() onBid: EventEmitter<any> = new EventEmitter();
  bidAmount!: number;
  bidForm!: FormGroup;
  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {
    this.showSummaryOnly = true;
  }

  bidNow(form: any): void {
    if (this.showSummaryOnly || form.valid) {
      this.onBid.emit({item: this.item, bid: this.bidAmount});
      this.bidForm.get('bidInput')?.updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    this.bidForm = this.formBuilder.group({
      bidInput: new FormControl('', [
        Validators.required,
        (control: AbstractControl) => Validators.min((this.latestBid ? this.latestBid : 0) + 1)(control)
      ])
    });
  }

}
