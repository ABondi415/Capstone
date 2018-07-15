export class User {
  constructor(
    public id: string,
    public userId: string,
    public firstName: string,
    public lastName: string,
    public emailAddress: string,
    public score: number
  ) { }
}