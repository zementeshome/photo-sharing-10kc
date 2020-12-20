import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [UserService]
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessage: string;
  showSignUp: boolean;
  showLogin: boolean;

  constructor(public userService: UserService, public router: Router) { }

  ngOnInit() {
  }

  toggleForm() {
    this.showSignUp = !this.showSignUp
  }

  toggleLogin() {
    this.showLogin = !this.showLogin
  }

  onSubmit(form: NgForm) {
    if(form.valid === true)
    this.userService.postUser(form.value).subscribe(
      res => {
        this.resetForm(form);
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/home'])
      },
      err => {
        if(err.status === 422) {
          this.serverErrorMessage = err.error.join('<br/>');
        } else
          this.serverErrorMessage = "something went wrong";
      }
    );
  }

  resetForm(form:NgForm) {
    this.userService.selectedUser = {
      username: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessage = '';
  }
}
