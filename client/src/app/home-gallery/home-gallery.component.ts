import { Component, OnInit } from '@angular/core';
import { faMeh } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home-gallery',
  templateUrl: './home-gallery.component.html',
  styleUrls: ['./home-gallery.component.scss']
})
export class HomeGalleryComponent implements OnInit {
  faMeh = faMeh

  constructor() { }

  ngOnInit(): void {
  }

}
