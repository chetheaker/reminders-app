import { Component } from '@angular/core';
import { ReminderName } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'reminders-app';
  activeList: ReminderName = {
    name: 'Reminders',
    length: 0,
    id: 'r4444',
  };

  changeNewActive(reminder: ReminderName) {
    this.activeList = reminder;
  }
}
