import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {UserStatisticModel} from 'src/app/interfaces/user-statistic-model'
import { StatisticService } from 'src/app/services/statistic.service';





@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements  OnInit {

  displayedColumns: string[] = ['userName', 'files', 'usedSpace' ,'maxSpace'];
  dataSource!: MatTableDataSource<UserStatisticModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private statistcService : StatisticService) {}
  
  ngOnInit(): void {
    
    this.statistcService.getAllStatistic()
      .subscribe(response =>{
        this.dataSource = new MatTableDataSource<UserStatisticModel>(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

 


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}






