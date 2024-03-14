import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  root = 'http://localhost:3000';

  login (email: string, password: string) : Observable<IUser> {
    return this.http.post<IUser>(this.root + '/user/login', { email, password });
  }

  getUser () : Observable<IUser> {
    return this.http.get<IUser>(this.root + '/user/auth/info');
  }
}
