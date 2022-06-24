import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {UserStatisticModel} from 'src/app/interfaces/user-statistic-model'
import { AuthService } from 'src/app/services/auth.service';
import { StatisticService } from 'src/app/services/statistic.service';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements  OnInit {

  displayedColumns: string[] = ['userName', 'files', 'usedSpace' ,'maxSpace' ,  'action' ];
  dataSource!: MatTableDataSource<UserStatisticModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private statistcService : StatisticService , private authService : AuthService) {}
  
  ngOnInit(): void {
    
    this.statistcService.getAllStatistic()
      .subscribe(response =>{
        
        this.dataSource = new MatTableDataSource<UserStatisticModel>(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } , error => {
        Swal.fire({text : 'Error . Please try later' , icon : 'error' , heightAuto : false});
      });
      
  }

 


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  removeUser(model : UserStatisticModel){
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!',
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteUser(model.userName)
        .subscribe(response => {
          Swal.fire({text : 'User has been deleted!' , icon: 'success' , heightAuto : false})
          this.dataSource.data = this.dataSource.data.filter(u => u.userName !== model.userName);
        } , 
        error => {
          Swal.fire({text : 'Error . Please try later' , icon: 'error' , heightAuto : false})
      });
      }
    })


  }
}






