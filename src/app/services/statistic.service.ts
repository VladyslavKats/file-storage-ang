import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TotalStatisticModel } from '../interfaces/total-statistic-model';
import { UserStatisticModel } from '../interfaces/user-statistic-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {



  constructor( private http : HttpClient,private authService:AuthService) {
    
   }


  getUserStatistic() : Observable<UserStatisticModel>{
    let id  = this.authService.getUser()?.userId;
    let url :string = `${environment.baseUrl}api/statistic/${id}`
    let headers = this.authService.createHeaderWithToken();
    return this.http.get<UserStatisticModel>(url , {headers : headers});
  }

  getTotalStatistic() : Observable<TotalStatisticModel>{
    let url : string = `${environment.baseUrl}api/statistic/total`;
    let headers = this.authService.createHeaderWithToken();
    return this.http.get<TotalStatisticModel>(url , {headers : headers});
  }

  getAllStatistic() : Observable<UserStatisticModel[]>{
    let url :string = `${environment.baseUrl}api/statistic`
    let headers = this.authService.createHeaderWithToken();
    return this.http.get<UserStatisticModel[]>(url , {headers : headers});
  }

 
}
