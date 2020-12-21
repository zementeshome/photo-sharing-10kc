import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    username: '',
    email: '',
    password: '',
  };
  currentUser: User;

  constructor(public http: HttpClient, public router: Router) {
   }

  postUser(user: User) {
    return this.http.post(environment.apiUrl + '/register', user);
  }

  login(username: string, password: string) {
    return this.http.post(environment.apiUrl + '/login', {
      username, password
    })
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getCurrentUser = (): User => JSON.parse(localStorage.getItem('user'))
  
  logout() {
    this.currentUser = null 
    this.router.navigate(['/']);
  }
}


