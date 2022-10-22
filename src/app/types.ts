type ReminderName = {
  name: string;
  id: string;
  length: number;
};

type Reminder = {
  content: string;
  completed: boolean;
  id: string;
  listId: string;
};

export { ReminderName, Reminder };
