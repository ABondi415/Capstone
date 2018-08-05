import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';  
import { HttpService } from '../http.service';
import { AuthService } from '../auth.service';
import { User } from '../model/user'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  userScore: number;
  color:string = 'warn';
  
  user: User = new User(
    JSON.parse(localStorage.getItem('currentUser')).id,
    JSON.parse(localStorage.getItem('currentUser')).userId,
    JSON.parse(localStorage.getItem('currentUser')).firstName,
    JSON.parse(localStorage.getItem('currentUser')).lastName,
    JSON.parse(localStorage.getItem('currentUser')).emailAddress,
    JSON.parse(localStorage.getItem('currentUser')).score,
    JSON.parse(localStorage.getItem('currentUser')).sprite,
    JSON.parse(localStorage.getItem('currentUser')).receiveNotifications
  )

  checked: boolean;
  
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService
  ) {
    this.createForm()
  }

  ngOnInit() {
    // get the user and task data
    if(this.authService.isAuthenticated){
      let currentUserId = JSON.parse(localStorage.getItem('currentUser')).userId;
      this.httpService.getOrCreateUser(this.user).subscribe(user => this.user = user);
    }

    this.checked = this.user.receiveNotifications;
  }

  createForm() {
    this.userForm = this.formBuilder.group({
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      emailAddress: [{value: this.user.emailAddress, disabled: true}],
      floatLabel: 'auto'
    });
  }

  saveUser() {
    this.httpService.updateUser(this.user).subscribe(user => this.user);
  }

  changed() {
    this.user.receiveNotifications = this.checked;
  }

  saveImage(){
    this.saveUser();
  }

}
