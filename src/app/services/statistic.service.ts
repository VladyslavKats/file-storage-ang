import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserStatisticModel } from '../interfaces/user-statistic-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor( private http : HttpClient,private authService:AuthService) { }


  getUserStatistic() : Observable<UserStatisticModel>{
    let id  = this.authService.getUser()?.userId;
    let url :string = `${environment.baseUrl}api/statistic/${id}`
    return this.http.get<UserStatisticModel>(url);
  }
}
