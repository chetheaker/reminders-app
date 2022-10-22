import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RemindersService } from '../reminders.service';
import { Reminder, ReminderName } from '../types';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  reminders: Reminder[] = [];
  addReminderForm = this.formBuilder.group({ content: '' });

  constructor(
    private remindersService: RemindersService,
    private formBuilder: FormBuilder
  ) {}

  @Input()
  list: ReminderName = {
    name: 'Reminders',
    length: 0,
    id: 'default',
  };

  ngOnInit(): void {}

  ngOnChanges() {
    this.getRemindersByList();
  }

  getRemindersByList() {
    return this.remindersService
      .getRemindersByList(this.list.id)
      .subscribe((reminderArr) => (this.reminders = reminderArr));
  }

  handleAddReminder() {
    const content = this.addReminderForm.value.content;
    if (!content) return;
    const newReminder = {
      content: content,
      completed: false,
      id: uuidv4(),
      listId: this.list.id,
    };
    this.addReminder(newReminder);
    this.addReminderForm.reset();
  }

  addReminder(reminder: Reminder) {
    return this.remindersService
      .addReminderToList(reminder)
      .subscribe((reminder) => this.reminders.push(reminder));
  }
}
