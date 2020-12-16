import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../auth.service';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
// import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup


 constructor(public userService: UserService, public formBuilder: FormBuilder, public router: Router) {
  this.loginForm= this.formBuilder.group({
    username: [''],
    password: ['']
  })
 }

  ngOnInit(): void {
  }

  loginUser() {
    if (this.userService.login(this.loginForm.value)) {
      this.router.navigate(['/home'])
    }
  }

  // loginUser(e) {
  //   e.preventDefault()
  //   const target = e.target;
  //   const username = target.querySelector('username').value;
  //   const password = target.querySelector('password').value;
  //   this.Auth.getUserDetails(username, password)
  //   console.log(username, password)
  // }

    // constructor(public Auth: AuthService) { }
}
