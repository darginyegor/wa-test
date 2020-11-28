import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  private get(url: string) {
    return this.httpClient.get(`${this.apiUrl}/${url}`);
  }

  private post(url: string, body: any) {
    return this.httpClient.post(`${this.apiUrl}/${url}`, body);
  }

  private put(url: string, body: any) {
    return this.httpClient.put(`${this.apiUrl}/${url}`, body);
  }

  private delete(url) {
    return this.httpClient.delete(`${this.apiUrl}/${url}`);
  }

  // Auth

  public authenticate(authData: {
    email: string,
    password: string
  }) {
    return this.post('Auth/token', authData);
  }

  public changePassword(password: string, newPassword: string) {
    return this.post('Auth/password', {
      password, newPassword
    });
  }

  public getCurrentUserData() {
    return this.get('Auth/me');
  }

  // Users

  public getUsersList() {
    return this.get('Users');
  }

  public getUserData(id: number) {
    return this.get(`Users/${id}`)
  }

  public createUser(user: User) {
    return this.post('Users', user);
  }

  public updateUser(id: number, user: User) {
    return this.put(`Users/${id}`, user);
  }

  public deleteUser(id: number) {
    return this.delete(`User/${id}`);
  }
}
