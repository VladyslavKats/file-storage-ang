import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {





  constructor(public authService : AuthService , private router:Router ) { }

  ngOnInit(): void {
   
  }

  logout() : void{
    this.authService.logOut();
    this.router.navigate(['']);
  }

}
