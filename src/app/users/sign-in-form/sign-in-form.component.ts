import { AppService } from 'src/app/shared/app.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {

  @ViewChild('signInForm', {static: false}) signInForm: NgForm;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.appService.signInUser(this.signInForm.value.username, this.signInForm.value.password);
    console.log(this.signInForm);
    this.signInForm.reset();
  }

}
