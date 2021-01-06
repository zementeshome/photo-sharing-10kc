import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
username: string
password: string
showErrorMessage: boolean;

constructor(public userService: UserService, public router: Router) {}

  ngOnInit() {
  }

  loginUser(e) {
     // if user is true set current user and navigate to home page
    e.preventDefault()
    this.showErrorMessage = false;
    this.userService.login(this.username, this.password).subscribe((user: User) => {
      if (user) {
       this.userService.setCurrentUser(user)
        this.router.navigate(['/home'])
      } else {
        console.log('no user')
      }
    },
    (error) => {
      this.showErrorMessage = true;
    }
    )
  }
}

