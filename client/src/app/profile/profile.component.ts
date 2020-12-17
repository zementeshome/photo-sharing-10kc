import { Component, OnInit } from '@angular/core';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  faSmile = faSmile
  user: User;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser()
    console.log(this.user)
  }

  openForm() {
    document.getElementById('profileForm').style.display = 'block'
  }

  closeForm() {
    document.getElementById('profileForm').style.display = 'none'
  }

}
