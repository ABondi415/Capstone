export class User {
  constructor(
    public id: string,
    public userId: string,
    public firstName: string,
    public lastName: string,
    public emailAddress: string,
    public score: number,
    public sprite: string,
    public preferences: any
  ) { 
    preferences = {
      "notifications": true
    }
  }

  loadDefaultPreferences () {
    this.preferences = {
      "notifications": true
    }
  }
}