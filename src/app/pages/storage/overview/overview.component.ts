import { Component, OnInit } from '@angular/core';
import { TotalStatisticModel } from 'src/app/interfaces/total-statistic-model';
import { UserStatisticModel } from 'src/app/interfaces/user-statistic-model';
import { AuthService } from 'src/app/services/auth.service';
import { StatisticService } from 'src/app/services/statistic.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  files:number = 0;
  percent : number = 0;

  constructor(private statisticService : StatisticService , private authService : AuthService) { }

  ngOnInit(): void {
    if(this.authService.isAdmin()){
      this.statisticService.getTotalStatistic()
        .subscribe((response : TotalStatisticModel) => {
          this.files = response.totalFiles;
          this.percent = this.getPercent(response.totalUsedSpace , response.maxSpace);
        });
    }else{
      this.statisticService.getUserStatistic()
        .subscribe((response :UserStatisticModel)=> {
          this.files = response.files;
          this.percent = this.getPercent(response.usedSpace , response.maxSpace);
        });
    }
    
  }


  getPercent(current : number , total : number){
    let result = current / (total / 100);
    return result;
  }


}
