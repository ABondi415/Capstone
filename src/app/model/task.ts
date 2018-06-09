export class Task {
  constructor(
    public id: string,
    public dueDate: Date,
    public description: string,
    public selected: boolean) { }
}