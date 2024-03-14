import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor (private fb: FormBuilder, private api: ApiService, private router: Router) {}

  handleSubmit () {
    const { email, password } = this.loginForm.value;

    if (email && password)
      this.api.login(email!, password!).subscribe({
        next: data => {
          console.log('Success! \n', data);
          this.loginForm.reset();
          this.router.navigateByUrl('/profile');
        },
        error: err => {
          console.error(err);
        }
      })
  }
}
