import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoading$ =  new Subject<boolean>();

  public show() : void {
    this.isLoading$.next(true);
  }

  public hide() : void {
    this.isLoading$.next(false);
  }
 
  constructor() { 
    
  }
  
 
}
