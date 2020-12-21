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
  selectedFile: File
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
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user?.photo) {
      const { photo } = this.user;
      this.imageSrc = this.constructImageSrc(photo)
      this.caption = photo.caption;
    }
  }

    constructImageSrc = (photo) => {
      return `data:${photo?.contentType};base64,${photo?.data}`
    }

    onFileChanged(event) {
      this.selectedFile = event.target.files[0]
    }

    deleteImage = ()=>{
      this.http.delete(`http://localhost:4000/api/image/${this.user.username}`).subscribe(success=>{
        this.imageSrc = '';
        this.caption = '';
      })
    } 

    onUpload() {
      const uploadData = new FormData();
      uploadData.append('photo', this.selectedFile);
      uploadData.append('caption', this.caption );
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

