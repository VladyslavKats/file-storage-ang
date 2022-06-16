import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  hidePassword : boolean = true;

  form : any;
  constructor(private authService : AuthService , private router:Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      userName : new FormControl('' , [Validators.required ]),
      password : new FormControl('', Validators.required)
    })
  }

  onSubmit(){
    if(this.form.invalid){
      return;
    }
    const form = this.form.value;
    this.authService.logIn$({password : form.password , userName : form.userName})
      .subscribe(response => {
        this.router.navigate(['/']);
      }, error => {
        this.form.controls['userName'].setErrors({'incorrect' : true});
        this.form.controls['password'].setErrors({'incorrect' : true});
      });
  }

}
