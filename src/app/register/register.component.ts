import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    address: '',
    password: '',
    rep: ''
   
  };

  message = '';

  constructor(private http: HttpClient) {}

  registerUser() {
    this.http.post('http://localhost:3000/register', this.user, { responseType: 'text' })
      .subscribe(
        (response: string) => {
          console.log('Success Response:', response);
          this.message = response; // Plain text response
          this.user = { username: '', email: '', address: '', password: '', rep: '' };
        },
        (error) => {
          console.error('Error Response:', error);
          this.message = 'Error: Could not register user.';
        }
      );
}

}
