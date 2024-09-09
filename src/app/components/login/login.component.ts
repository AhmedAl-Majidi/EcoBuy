import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials = {
    username: '',
    password: '',
  };

  token: string = '';

  loginForm = new FormGroup({
    username: new FormControl(this.credentials.username, [Validators.required]),
    password: new FormControl(this.credentials.password, [Validators.required]),
  });

  // set credentials to form value

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe((response) => {
        if (response) {
          this.token = response.token;
          this.authenticateUser(response.token);
        }
      });
    } else {
      alert('Form is invalid!');
    }
  }

  authenticateUser(token: string) {
    this.authService.authUser(token).subscribe((response) => {
      if (response) {
        this.router.navigate(['/product-list']);
      } else {
        alert('Invalid username or password');
      }
    });
  }
}
