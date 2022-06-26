import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _isLoading$ =  new BehaviorSubject<boolean>(false);

  public readonly isLoading$ = this._isLoading$.asObservable();

  public show() : void {
    this._isLoading$.next(true);
  }

  public hide() : void {
    this._isLoading$.next(false);
  }
 
  constructor() { 
    
  }
  
 
}
