import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AuthenticateResponse} from "../../interfaces/authenticate-response";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService : AuthService) { }

  ngOnInit(): void {
    
  }


}
