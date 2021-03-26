import { User } from './../../shared/user.model';
import { AppService } from 'src/app/shared/app.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  @ViewChild('signUpForm', {static: false}) signUpForm: NgForm;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const newUser = new User(this.signUpForm.value.username, this.signUpForm.value.password, this.signUpForm.value.name, this.signUpForm.value.userType);
    this.appService.signUpUser(newUser);
    console.log(this.signUpForm);
    this.signUpForm.reset();
  }

}
