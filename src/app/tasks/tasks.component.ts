import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RemindersService } from '../reminders.service';
import { Reminder, ReminderName } from '../types';

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
    id: 'r4444',
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
    this.addReminderForm.value.content = '';
    console.log(content);
  }
}
