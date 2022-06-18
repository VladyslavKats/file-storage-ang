import { Component, OnInit } from '@angular/core';
import { UserStatisticModel } from 'src/app/interfaces/user-statistic-model';
import { StatisticService } from 'src/app/services/statistic.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  files:number = 0;
  percent : number = 0;

  constructor(private statisticService : StatisticService) { }

  ngOnInit(): void {
    this.statisticService.getUserStatistic()
      .subscribe((response :UserStatisticModel)=> {
        this.files = response.files;
        this.percent = this.getPercent(response.usedSpace , response.maxSpace);
      });
  }


  getPercent(current : number , total : number){
    let result = current / (total / 100);
    return result;
  }


}
