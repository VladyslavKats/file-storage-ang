
import { Component, Input, OnDestroy } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { switchMap, startWith, scan, takeWhile, takeUntil, mapTo } from 'rxjs/operators';


@Component({
  selector: 'app-number-tracker',
  templateUrl: './number-tracker.component.html',
  styleUrls: ['./number-tracker.component.css']
})
export class NumberTrackerComponent {

  @Input()
  set end(endRange: number) {
    this._counterSub$.next(endRange);
  }
  @Input() countInterval = 100;
  @Input() color = 'black';
  @Input() fontSize = 40;
  public currentNumber = 0;
  private _counterSub$ = new Subject();
  private _onDestroy$ = new Subject();

  constructor() {
    this.count();
  }

  private positiveOrNegative(endRange : any, currentNumber : any) {
    return endRange > currentNumber ? 1 : -1;
  }

  private isApproachingRange(endRange : any, currentNumber : any) {
    return endRange > currentNumber
      ? (val: number) => val <= endRange
      : (val: number) => val >= endRange;
  }

  count(){
    this._counterSub$
      .pipe(
        switchMap(endRange => {
          return timer(0, this.countInterval).pipe(
            mapTo(this.positiveOrNegative(endRange, this.currentNumber)),
            startWith(this.currentNumber),
            scan((acc: number, curr: number) => acc + curr),
            takeWhile(this.isApproachingRange(endRange, this.currentNumber))
          )
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe((val: number) => this.currentNumber = val);
  }
  
}
