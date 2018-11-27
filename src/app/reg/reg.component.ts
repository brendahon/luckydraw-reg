import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/User';

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

    this.addUser(this.regForm.controls.name.value, this.regForm.controls.email.value );

    this.success = true;

  }

  addUser(name, email) {
    this.data.addUser(name, email);
  }

}
