import { Component, OnInit, ɵSWITCH_COMPILE_INJECTABLE__POST_R3__, Injectable } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PhotoService } from '../../shared/photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  providers: [PhotoService]
})
@Injectable({
  providedIn:'root'
})
export class PhotosComponent implements OnInit {
photo;
photoUrl;

  constructor( private route: ActivatedRoute, public photoService: PhotoService, public router: Router) { }

getPhoto() {
  let photoId = this.route.snapshot.paramMap.get('id');
  this.photoService.getPhoto(photoId).subscribe(
    photo => {
      this.photo = photo.body
    },
    error => {
      if(error.status == 422){
        this.router.navigate(['/profile'])
      }
    }
  )
}

  ngOnInit(): void {
    this.getPhoto()
    this.photoUrl = this.photoService.apiUrl
  }

}
