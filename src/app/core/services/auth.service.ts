import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: BehaviorSubject<User>;
  private accessToken: string;


  constructor(
    private api: ApiService
  ) {
    this.accessToken = localStorage.getItem('accessToken');
    this.currentUser = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
  }

  getAccessToken() {
    return this.accessToken;
  }

  authenticate(authData: { email: string; password: string; }) {
    return this.api.authenticate(authData).pipe(map(
      (response: any) => {
        this.accessToken = response.access_token;
        localStorage.setItem('accessToken', response.access_token);
        return response;
      },
      (error: HttpErrorResponse) => {
        return error;
      }
    ));
  }

  isAuthenticated(): boolean {
    if (this.accessToken) {
      return true;
    }
  }
}
