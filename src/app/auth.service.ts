import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Backend API URL
  private currentUsernameSubject = new BehaviorSubject<string | null>(this.getUsername());
  currentUsername = this.currentUsernameSubject.asObservable();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any) {}

  // Helper: Check if running in a browser environment
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId); // Returns true if running in a browser
  }

  // Login user
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  // Store JWT token in localStorage (only in the browser)
  saveToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('auth_token', token);
    }
  }

  // Get JWT token from localStorage (only in the browser)
  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('auth_token') : null;
  }

  // Store username in localStorage and BehaviorSubject (only in the browser)
  saveUsername(username: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('username', username);
      this.currentUsernameSubject.next(username); // Update BehaviorSubject
    }
  }

  // Get username from localStorage (only in the browser)
  getUsername(): string | null {
    return this.isBrowser() ? localStorage.getItem('username') : null;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Logout user (only in the browser)
  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('username');
      this.currentUsernameSubject.next(null); // Clear username
    }
  }
}
