import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  private apiUrl = 'http://localhost:3000/api/meetings';

  constructor(private http: HttpClient) {}

  addMeeting(meeting: any): Observable<any> {
    return this.http.post(this.apiUrl, meeting);
  }

  getMeetings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
