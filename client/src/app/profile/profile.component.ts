import { Component, OnInit } from '@angular/core';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  faSmile = faSmile
  user: User;
  // public files: any[]
  constructor(private userService: UserService) { 
    // this.files = [];
  }

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

  // onFileChange(e: any) {
  //   this.files = e.target.files;
  // }

  // onUpload() {
  //   const formData = new FormData();
  //   for ( const file of this.files) {
  //     formData.append(name, file, file.name)
  //   }
  //   return this.http.post(environment.apiUrl + '/:id', formData)
  // }

}
