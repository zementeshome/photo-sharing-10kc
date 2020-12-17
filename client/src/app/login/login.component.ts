import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../auth.service';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup} from "@angular/forms";
import { User } from '../shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
username: string = '';
password: string = '';


 constructor(public userService: UserService, public formBuilder: FormBuilder, public router: Router) {
  // this.loginForm= this.formBuilder.group({
  //   username: [''],
  //   password: ['']
  // })
 }

  ngOnInit(): void {
  }

  loginUser(e) {
    e.preventDefault()
    this.userService.login(this.username, this.password).subscribe((user: User) => {
      if (user) {
       this.userService.setCurrentUser(user)
        this.router.navigate(['/home'])
      }
    })
  }
}
    // constructor(public Auth: AuthService) { }

