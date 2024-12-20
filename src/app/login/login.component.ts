import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        // Save JWT token and username in localStorage
        this.authService.saveToken(response.token);
        this.authService.saveUsername(this.username);  // Save username

        // Redirect to welcome page
        this.router.navigate(['/welcome']);
      },
      (error) => {
        this.errorMessage = 'Invalid username or password.';
      }
    );
  }
}
