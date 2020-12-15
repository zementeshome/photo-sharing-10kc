import { Component, OnInit } from '@angular/core';
import { faMeh } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  faMeh = faMeh
  constructor() { }

  ngOnInit(): void {
  }

}
