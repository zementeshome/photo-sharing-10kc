import { Component, OnInit } from '@angular/core';
import { faMeh } from '@fortawesome/free-solid-svg-icons';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserNinja } from '@fortawesome/free-solid-svg-icons';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 faMeh = faMeh
 faSmile = faSmile
 faFrown = faFrown
 faUser = faUser
 faUserNinja = faUserNinja
 faUserAstronaut = faUserAstronaut
 faUserSecret = faUserSecret
  constructor() { }

  ngOnInit(): void {
  }

}
