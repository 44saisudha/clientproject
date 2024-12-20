import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingService } from '../meeting.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  meetings: any[] = [];

  constructor(private meetingService: MeetingService, private router: Router) {}

  ngOnInit(): void {
    this.fetchMeetings();
  }

  fetchMeetings(): void {
    this.meetingService.getMeetings().subscribe((data) => {
      this.meetings = data;
    });
  }

  goToSchedule(): void {
    this.router.navigate(['/schedule']);
  }
}
