import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private authService : AuthService , private router : Router) { }

  hidePassword : boolean = true;
  hidePasswordConfirm : boolean = true;
  form : any;

  ngOnInit(): void {
    this.form = new FormGroup({
      userName : new FormControl('' , [Validators.required] , [this.checkUserName.bind(this) as AsyncValidatorFn]),
      email : new FormControl('' , [Validators.email , Validators.required]),
      password : new FormControl('' , [Validators.required , Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{4,}$/)]),
      passwordConfirm : new FormControl('' , [Validators.required , Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{4,}$/),
      this.checkPasswords])
    })
  }

  onSubmit(){
    if(this.form.invalid){
      return;
    }
    const form = this.form.value;
    this.authService.signUp$({userName : form.userName , email : form.email , password : form.password})
      .subscribe((response =>{
        this.router.navigate(['/']);
      }))
  }


  private checkPasswords : ValidatorFn = (form : AbstractControl) :ValidationErrors | null  => {


    let pass = this.form?.get('password')?.value;
    let passRepeat =  this.form?.get('passwordConfirm')?.value;

    if(pass && passRepeat){
      return pass === passRepeat ? null : {notSame : true}
    }
    return null;
  }


  checkUserName(control: FormControl): Promise<any> {

    return new Promise((resolve, reject) => {

      this.authService.checkUserName(control.value)
        .subscribe(response => {
          if (response) {
            resolve({'nameIsUsed': true});
          } else {
            resolve(null);
          }
        })

    })
  }

}
