import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignUpModel} from "../interfaces/sign-up-model";
import {Environment} from "@angular/cli/lib/config/workspace-schema";
import {environment} from "../../environments/environment.prod";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {AuthenticateResponse} from "../interfaces/authenticate-response";
import {User} from "../interfaces/user";
import {fakeAsync} from "@angular/core/testing";
import {LogInModel} from "../interfaces/log-in-model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('user'));

  public isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(private http:HttpClient ) { }

  logIn$(model : LogInModel) : Observable<AuthenticateResponse>{
    let url : string = `${environment.baseUrl}api/account/login`;
    return this.http.post(url , model)
      .pipe(
        tap((response : any) => {
          this.setUser({userName : response.userName , token : response.token});
          this._isLoggedIn.next(true);
        })
      );
  }



  signUp$(model:SignUpModel) : Observable<AuthenticateResponse>{
    let url:string = `${environment.baseUrl}api/account/signup`;
    return this.http.post(url , model )
      .pipe(
        tap((response : any) => {
          this.setUser({userName : response.userName , token : response.token})
          this._isLoggedIn.next(true);
        })
      )
  }

  private setUser(user:User) : void{
    localStorage.setItem('user' , JSON.stringify(user));
  }

  getUser() : User | null{
    let value = localStorage.getItem('user');
    if(!value){
      return null;
    }
    const user : User = JSON.parse(value);
    return user;
  }

  logOut() : void{
    localStorage.clear();
    this._isLoggedIn.next(false);
  }


  checkUserName( value : string) : Observable<boolean>{
    let url : string = `${environment.baseUrl}api/account/${value}`
    return this.http.get<boolean>(url);
  }
}
