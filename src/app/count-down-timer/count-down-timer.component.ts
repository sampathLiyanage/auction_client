import {Component, Input, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-count-down-timer',
  templateUrl: './count-down-timer.component.html',
  styleUrls: ['./count-down-timer.component.css']
})
export class CountDownTimerComponent implements OnInit {

  private diff !: number;
  private days !: number;
  private hours !: number;
  private minutes !: number;
  private seconds !: number;
  private subscription !: Subscription;
  timeSet !: boolean;
  countDownMessage: string;

  @Input() endTime !: string;
  constructor() {
    this.countDownMessage = '';
  }

  ngOnInit(): void {
    this.subscription = interval(1000).subscribe(x => {
      const currentDateTimeUtc = new Date().toISOString().slice(0, 19).replace('T', ' ');
      this.diff = Date.parse(this.endTime) - Date.parse(currentDateTimeUtc);
      this.days = this.getDays(this.diff);
      this.hours = this.getHours(this.diff);
      this.minutes = this.getMinutes(this.diff);
      this.seconds = this.getSeconds(this.diff);
      this.countDownMessage = '';
      if (!isNaN(this.seconds) && this.seconds >= 0) {
        if (this.days > 0) {
          this.countDownMessage += (this.days === 1) ? ('1 Day, ') : (this.days + ' Days, ');
        }
        if (this.hours > 0) {
          this.countDownMessage += (this.hours === 1) ? ('1 Hour, ') : (this.hours + ' Hours, ');
        }
        if (this.minutes > 0) {
          this.countDownMessage += (this.minutes === 1) ? ('1 Minute, ') : (this.minutes + ' Minutes, ');
        }
        if (this.seconds > 0) {
          this.countDownMessage += (this.seconds === 1) ? ('1 Second') : (this.seconds + ' Seconds');
          this.countDownMessage += ' Remaining';
        }
      }
    });
  }

  private getDays(time: number): number {
    return Math.floor( time / (1000 * 60 * 60 * 24) );
  }

  private getHours(time: number): number {
    return Math.floor( (time / (1000 * 60 * 60)) % 24 );
  }

  private getMinutes(time: number): number {
    return Math.floor( (time / 1000 / 60) % 60 );
  }

  private getSeconds(time: number): number {
    return Math.floor( (time / 1000) % 60 );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
