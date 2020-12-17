import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    username: '',
    email: '',
    password: ''
  };
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(public http: HttpClient, public router: Router) { }

  postUser(user: User) {
    return this.http.post(environment.apiUrl + '/register',user);
  }
}
  // getAccessToken() {
  //   return localStorage.getItem('access_token');
  // }

  // public isLoggedIn(): boolean {
  //   let authToken = localStorage.getItem('access_token');
  //   return (authToken !== null) ? true : false;
  // }

//   login(user: User) {
//     return this.http.post<any>(`${environment.apiUrl}/login`, user)
//       .subscribe((res: any) => {
//         localStorage.setItem('access_token', res.token)
//         this.getUserProfile(res._id).subscribe((res) => {
//           this.currentUser = res;
//           this.router.navigate(['/home']);
//         })
//       })
//   }

//   logout(){
//     if (localStorage.removeItem('access_token') == null) {
//       this.router.navigate(['/']);
//     }
//   }

//   getUserProfile(id): Observable<any> {
//     return this.http.get(`${environment.apiUrl}/profile/${id}`, { headers: this.headers }).pipe(
//       map((res: Response) => {
//         return res || {}
//       }),
//       catchError(this.handleError)
//     )
// }

// handleError(error: HttpErrorResponse) {
//   let msg = '';
//   if (error.error instanceof ErrorEvent) {
//     // client-side error
//     msg = error.error.message;
//   } else {
//     // server-side error
//     msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
//   }
//   return throwError(msg);
// }
// 
