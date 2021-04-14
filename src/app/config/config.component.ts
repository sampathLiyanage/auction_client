import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  maxBidAmount!: number;
  configForm!: FormGroup;
  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getConfig();
    this.configForm = this.formBuilder.group({
      maxBidInput: new FormControl('', [
        Validators.min(0),
      ])
    });
  }

  saveConfig(form: any): void {
    if (form.valid) {
      const maxBid = (typeof this.maxBidAmount === 'undefined') ? null : this.maxBidAmount;
      this.apiService.updateConfiguration({max_bid_amount: maxBid}).subscribe(() => {
        this.snackbar.open('Configuration updated successfully', undefined, {duration: 2000});
      });
    }
  }

  getConfig(): void {
    this.apiService.getConfiguration().subscribe(config => {
      if (typeof config.configuration === 'string' && config.constructor.length > 0) {
        const configuration = JSON.parse(config.configuration);
        this.maxBidAmount = configuration.max_bid_amount;
      }
    });
  }
}
