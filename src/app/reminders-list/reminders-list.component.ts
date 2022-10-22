import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RemindersService } from '../reminders.service';
import { ReminderName } from '../types';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminders-list.component.html',
  styleUrls: ['./reminders-list.component.css'],
})
export class RemindersListComponent implements OnInit {
  remindersList: ReminderName[] = [];
  activeList: ReminderName | null = null;
  addListForm = this.formBuilder.group({ name: '' });

  @Output()
  newActive = new EventEmitter();

  constructor(
    private remindersService: RemindersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getReminderLists();
  }

  getReminderLists() {
    this.remindersService
      .getAllLists()
      .subscribe((reminders) => (this.remindersList = reminders));
  }

  addNewList(list: ReminderName) {
    if (!list.name) return;
    this.remindersService
      .createNewList(list)
      .subscribe((list) => this.remindersList.push(list));
  }

  handleSubmit() {
    const name = this.addListForm.value.name;
    this.addListForm.value.name = '';
    if (name) {
      const list = {
        name: name,
        id: uuidv4(),
        length: 0,
      };
      this.addNewList(list);
      this.addListForm.reset();
    }
  }

  handleReminderClick(reminder: ReminderName) {
    this.activeList = reminder;
    this.newActive.emit(this.activeList);
  }
}
