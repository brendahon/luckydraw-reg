import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from "./User";
import 'rxjs/add/operator/map';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  regForm: FormGroup;
  submitted = false;
  success = false;

  user: User;
  message: String;

  constructor(private data: DataService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern) ] ]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.regForm.invalid) {
        return;
    }

    this.addUser(this.regForm.controls.name.value, this.regForm.controls.email.value ).subscribe( (data: User) => {
      this.user = data;

      console.log("user retrieved: " + this.user);

      if(this.user._id) {
        this.message = "Registration is done Successfully!";
        this.success = true;
      } else {
        this.message = "Error in registration, please try again!"; 
      }

    }, (err: HttpErrorResponse) => {

        console.log("err: " + err);
        console.log("err.message: " + err.message);
        this.message = err.error;

    });
    
    console.log("message: " + this.message);
  }

  addUser(name, email) {
    return this.data.addUser(name, email);
  }

}
