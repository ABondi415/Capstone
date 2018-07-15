import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormsModule, NgForm } from '@angular/forms';  
import { HttpService } from '../http.service';
import { AuthService } from '../auth.service';
import { User } from '../model/user'
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  userScore: number;
  user: User = new User(
    JSON.parse(localStorage.getItem('currentUser')).id,
    JSON.parse(localStorage.getItem('currentUser')).userId,
    JSON.parse(localStorage.getItem('currentUser')).firstName,
    JSON.parse(localStorage.getItem('currentUser')).lastName,
    JSON.parse(localStorage.getItem('currentUser')).emailAddress,
    JSON.parse(localStorage.getItem('currentUser')).score
  )

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
    console.log('saving user');
  }
}