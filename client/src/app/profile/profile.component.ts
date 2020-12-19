import { Component, OnInit, NgModule } from '@angular/core';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { HttpClient } from '@angular/common/http';

// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { environment } from '../../environments/environment';
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
      // upload code goes here
      
      const uploadData = new FormData();
      uploadData.append('photo', this.selectedFile);
      uploadData.append('caption', this.caption );
      console.log(uploadData, this.selectedFile);
  
      this.http.post(`http://localhost:4000/api/upload/${this.user.username}`, uploadData)
        .subscribe(success => {
          console.log('abc' + success)
          if (success) {
            this.http.get(`http://localhost:4000/api/loadimage/${this.user.username}`).subscribe((updatedImage:Photo) => {
              this.imageSrc = this.constructImageSrc(updatedImage);
              this.user.photo = updatedImage;
              console.log('hey' + updatedImage);
            })
          }
        });
    }
  }

    // this.user = this.userService.getCurrentUser()
    // console.log(this.user)
    // this.getPhotos()
    // this.photoUrl = this.photoService.apiUrl;


  // getPhotos(): void {
  //   this.photoService.getPhotos()
  //       .subscribe(photos => {
  //         this.photos = photos.reverse();
  //         });
  // }

  // delete(photo): void{
  //   if (confirm(`Are you sure you want to delete id#: ${photo._id}?`)){
  //     this.photoService.deletePhoto(photo._id).subscribe(()=>{
  //       this.getPhotos();
  //       //if delete a picture, a flash message is displayed
  //       // this._flashMessagesService.show(`Deleted ${photo._id}`, { cssClass: 'alert-success',timeout: 4000 } );
  //     });
  //   }
  // }

  // onSubmit(){
  //   let formData = new FormData()
  //   formData.append('photo', this.photo.photo)
  //   formData.append('caption', this.photo.caption)

  //   this.photoService.uploadPhoto(formData).subscribe((photo) => {
  //     this.photosComponent.getPhoto()
  //   })
  // }

  // handleSubmit(target) {
  //   let photoFile = target.files[0];
  //   this.photo.photo = photoFile;
  // }

  // getPhotos(): void {
  //   this.
  // }


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

