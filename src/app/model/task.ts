export class Task {
  constructor(
    public id: string,
    public dueDate: Date,
    public penaltyDate: Date,
    public description: string,
    public taskPriority: boolean,
    public taskDetail: string,
    public taskCompleted: boolean,
    public voiceReminder: boolean,
    public sprite: string,
    public selected: boolean,
    public userId: string
  ) { }
}