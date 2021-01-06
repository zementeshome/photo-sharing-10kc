import { Component, OnInit, NgModule } from '@angular/core';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { HttpClient } from '@angular/common/http';

export interface Photo{ data: string; contentType: string ; caption:string;} 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  faSmile = faSmile
  user: { username: string, email: string, photo: Photo};
  selectedFile: File;
  // array
  // selectedFile: [];
  imageSrc = '';
  caption='';

  constructor(private userService: UserService, private http: HttpClient) { }

  openForm() {
    document.getElementById('profileForm').style.display = 'block';
  }

  closeForm() {
    document.getElementById('profileForm').style.display = 'none';
  }

  ngOnInit(): void {
     // get user
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user?.photo) {
      const { photo } = this.user;
      this.imageSrc = this.constructImageSrc(photo)
      this.caption = photo.caption;
    }
  }

    constructImageSrc = (photo) => {
       // saves the content type and the image data 
      // imageSrc variable in the image tag in profile html
      return `data:${photo?.contentType};base64,${photo?.data}`
    }

    onFileChanged(event) {
          // whenever an image is selected it gets saved in this variable
      this.selectedFile = event.target.files[0];
      // array
      // this.selectedFile = event.target.files;
    }

    deleteImage = () => {
      this.http.delete(`http://localhost:4000/api/image/${this.user.username}`).subscribe(success=>{
        this.imageSrc = '';
        this.caption = '';
      })
    } 

    onUpload() {
       // on upload form data is created
      // then adding an image and getting the selected file
      // calling the api with the current user username, with the uploadData
      // once the image has been uploaded call the load image api
      const uploadData = new FormData();
      uploadData.append('photo', this.selectedFile);
      uploadData.append('caption', this.caption);
      // array 
      // for (let file of this.selectedFile) {
      //   uploadData.append('photo', file);
      //   uploadData.append('caption', this.caption);
      // }
      this.http.post(`http://localhost:4000/api/upload/${this.user.username}`, uploadData)
        .subscribe(success => {
          if (success) {
            this.http.get(`http://localhost:4000/api/loadimage/${this.user.username}`).subscribe((updatedImage:Photo) => {
              this.imageSrc = this.constructImageSrc(updatedImage);
              this.user.photo = updatedImage;
            })
          }
        });
      }
    }

