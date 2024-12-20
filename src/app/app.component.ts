import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  username: string | null = '';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to currentUsername observable to get updates
    this.authService.currentUsername.subscribe((username) => {
      this.username = username; // Update username dynamically
    });
  }

  logout(): void {
    this.authService.logout();  // Call logout from AuthService
    this.router.navigate(['/login']);  // Redirect to login page after logout
  }
}
