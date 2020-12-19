import { Component, OnInit, NgModule } from '@angular/core';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { PhotoService } from '../shared/photo.service';
import { PhotosComponent } from '../profile/photos/photos.component';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [PhotoService]
})
export class ProfileComponent implements OnInit {
  faSmile = faSmile
  user: User;
  photos
  description: string = 'Gallery'
  photoUrl: string
  imageURL: string
  
  // users: string = ''
  // public files: any[]
  constructor(private userService: UserService, private photoService: PhotoService, private photosComponent: PhotosComponent) { 
    // this.files = [];
  }

  photo = {
    caption: '',
    photo: null
  }

  ngOnInit() {
    this.user = this.userService.getCurrentUser()
    console.log(this.user)
    this.getPhotos()
    this.photoUrl = this.photoService.apiUrl;
  }

  getPhotos(): void {
    this.photoService.getPhotos()
        .subscribe(photos => {
          this.photos = photos.reverse();
          });
  }

  delete(photo): void{
    if (confirm(`Are you sure you want to delete id#: ${photo._id}?`)){
      this.photoService.deletePhoto(photo._id).subscribe(()=>{
        this.getPhotos();
        //if delete a picture, a flash message is displayed
        // this._flashMessagesService.show(`Deleted ${photo._id}`, { cssClass: 'alert-success',timeout: 4000 } );
      });
    }
  }

  onSubmit(){
    let formData = new FormData()
    formData.append('photo', this.photo.photo)
    formData.append('caption', this.photo.caption)

    this.photoService.uploadPhoto(formData).subscribe((photo) => {
      this.photosComponent.getPhoto()
    })
  }

  handleSubmit(target) {
    let photoFile = target.files[0];
    this.photo.photo = photoFile;
  }

  // getPhotos(): void {
  //   this.
  // }

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
