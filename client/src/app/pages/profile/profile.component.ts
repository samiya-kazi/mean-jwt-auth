import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { IUser } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor (private api: ApiService, private router: Router) {}

  user?: IUser;

  ngOnInit(): void {
    this.api.getUser().subscribe({
      next: user => {
        this.user = user;
      },
      error: err => {
        console.error(err);
        this.router.navigateByUrl('/login');
      }
    })
  }

  handleLogout () {
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }

}
