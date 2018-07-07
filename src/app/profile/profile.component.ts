import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormsModule, NgForm } from '@angular/forms';  

import { User } from '../model/user'
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  user: User = new User(
    JSON.parse(localStorage.getItem('currentUser')).userId, 
    JSON.parse(localStorage.getItem('currentUser')).firstName, 
    JSON.parse(localStorage.getItem('currentUser')).lastName, 
    JSON.parse(localStorage.getItem('currentUser')).emailAddress, 
    JSON.parse(localStorage.getItem('currentUser')).score
  )

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm()
  }

  ngOnInit() {
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
