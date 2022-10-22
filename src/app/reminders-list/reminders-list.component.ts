import { Component, OnInit } from '@angular/core';
import { ReminderName } from '../types';

@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminders-list.component.html',
  styleUrls: ['./reminders-list.component.css'],
})
export class RemindersListComponent implements OnInit {
  remindersList: ReminderName[] = [
    { id: 1, name: 'Todo', totalReminders: 4 },
    { id: 2, name: 'Other list', totalReminders: 0 },
  ];

  constructor() {}

  ngOnInit(): void {}
}
