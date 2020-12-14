import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    username: '',
    email: '',
    password: ''
  };

  constructor(public http: HttpClient) { }

  postUser(user: User) {
    return this.http.post(environment.apiUrl + '/register',user);
  }
}
