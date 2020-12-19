import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
    providedIn: 'root'
})

export class PhotoService {

    constructor(private http: HttpClient) { }

    apiUrl = environment.apiUrl

    // return this.http.post(environment.apiUrl + '/register', user);

    getPhotos(): Observable<any> {
        return this.http.get(`${this.apiUrl}/api/photos`, {withCredentials: true})
    }

    getPhoto(id): Observable<any>{
        return this.http.get(`${this.apiUrl}/api/photos/${id}`, { observe: 'response'})
    }

    deletePhoto( id: number) {
        return this.http.delete(`${this.apiUrl}/api/photos/${id}`)
    }

    uploadPhoto(data) {
        return this.http.post(`${this.apiUrl}/api/photos`, data)
    }

}