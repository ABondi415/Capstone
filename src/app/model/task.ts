export class Task {
  constructor(
    public id: string,
    public dueDate: Date,
    public description: string,
    public taskPriority: boolean,
    public taskDetail: string,
    public taskCompleted: boolean,
    public voiceReminder: boolean,
    public selected: boolean,
    public userId: string
  ) { }
}