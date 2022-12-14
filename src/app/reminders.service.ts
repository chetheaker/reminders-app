import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reminder, ReminderName } from './types';

@Injectable({
  providedIn: 'root',
})
export class RemindersService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  serverApiUrl = 'http://localhost:4040';

  constructor(private http: HttpClient) {}

  getAllLists(): Observable<ReminderName[]> {
    return this.http.get<ReminderName[]>(this.serverApiUrl + '/lists');
  }

  createNewList(list: ReminderName): Observable<any> {
    return this.http.post(this.serverApiUrl + '/lists', list, this.httpOptions);
  }

  getRemindersByList(listId: string): Observable<Reminder[]> {
    return this.http.get<Reminder[]>(
      this.serverApiUrl + '/reminders/' + listId
    );
  }

  addReminderToList(reminder: Reminder): Observable<any> {
    return this.http.post(
      this.serverApiUrl + '/reminders',
      reminder,
      this.httpOptions
    );
  }

  toggleReminderCompleted(reminder: Reminder): Observable<any> {
    return this.http.put(
      this.serverApiUrl + '/reminders',
      reminder,
      this.httpOptions
    );
  }

  deleteReminder(id: string): Observable<any> {
    const url = this.serverApiUrl + '/reminders/' + id;
    console.log(url);
    return this.http.delete(url, this.httpOptions);
  }
}
