import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingService } from '../meeting.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent {
  meeting = {
    topic: '',
    people: '',
    date: '',
    time: '',
  };

  constructor(private meetingService: MeetingService, private router: Router) {}

  scheduleMeeting(): void {
    this.meetingService.addMeeting(this.meeting).subscribe(() => {
      alert('Meeting scheduled successfully!');
      this.router.navigate(['/welcome']);
    });
  }
}