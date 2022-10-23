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
  completedReminders: Reminder[] = [];
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
      .subscribe((reminderArr) => {
        this.reminders = reminderArr.filter(
          (reminder) => reminder.completed == false
        );
        this.completedReminders = reminderArr.filter(
          (reminder) => reminder.completed == true
        );
      });
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

  handleReminderComplete(reminder: Reminder) {
    this.remindersService.toggleReminderCompleted(reminder).subscribe(() => {
      const rm = this.reminders.find((rmnd) => rmnd.id === reminder.id);
      if (rm) {
        rm.completed = true;
        const index = this.reminders.indexOf(rm);
        this.completedReminders.push(rm);
        this.reminders.splice(index, 1);
      }
    });
  }

  handleReminderIncomplete(reminder: Reminder) {
    this.remindersService.toggleReminderCompleted(reminder).subscribe(() => {
      console.log('this');
      const rm = this.completedReminders.find(
        (rmnd) => rmnd.id === reminder.id
      );

      if (rm) {
        rm.completed = false;
        const index = this.completedReminders.indexOf(rm);
        this.reminders.push(rm);
        this.completedReminders.splice(index, 1);
      }
    });
  }

  deleteReminder(reminder: Reminder) {
    console.log('before reminders: ', this.reminders);
    this.remindersService.deleteReminder(reminder.id).subscribe(() => {
      if (this.reminders.indexOf(reminder) !== -1) {
        this.reminders.splice(this.reminders.indexOf(reminder), 1);
      } else {
        this.completedReminders.splice(
          this.completedReminders.indexOf(reminder),
          1
        );
      }
      console.log('Reminders after: ', this.reminders);
      console.log('Completed reminders after: ', this.completedReminders);
    });
  }
}
