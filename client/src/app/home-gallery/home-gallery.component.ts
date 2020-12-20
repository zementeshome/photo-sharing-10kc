import { Component, OnInit } from '@angular/core';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../profile/profile.component';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-home-gallery',
  templateUrl: './home-gallery.component.html',
  styleUrls: ['./home-gallery.component.scss']
})
export class HomeGalleryComponent implements OnInit {
  faSmile = faSmile
  imageSrc = '';
  caption = '';
  user: User

  constructor(private http: HttpClient, public userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.loadImage();
  }
  constructImageSrc = (photo) => {
    return `data:${photo?.contentType};base64,${photo?.data}`
  }

  loadImage() {
    this.http.get(`http://localhost:4000/api/loadimage/${this.user.username}`).subscribe((updatedImage:Photo) => {
        this.imageSrc = this.constructImageSrc(updatedImage);
        this.user.photo = updatedImage;
      })
    }
  }
