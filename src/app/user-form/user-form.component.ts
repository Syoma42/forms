import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../shared/email.service';
import { emailAsyncValidator } from '../shared/email.validator';




@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  exform: FormGroup;


  public frameworks = ['', 'angular', 'react', 'vue'];

  public versions = {
    angular: ['', '1.1.1', '1.2.1', '1.3.3'], 
    react: ['', '2.1.2', '3.2.4', '4.3.1'], 
    vue: ['', '3.3.1', '5.2.1', '5.1.3']
  }

  constructor (private fb: FormBuilder,
              private emailService: EmailService) {}

  ngOnInit(): void {

    this.exform = this.fb.group({
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'email' : [null, [Validators.required, Validators.email], emailAsyncValidator(this.emailService)],
      'dateOfBirth' : [null, Validators.required],
      'framework' : [null, Validators.required],
      'frameworkVersion' : [null, Validators.required],
      'hobby' : this.fb.array([ this.createItem() ])
    })

  }

  confirm() {
    console.log(this.exform.value);
    this.exform.reset();
  }

  get firstName() {
    return this.exform.get('firstName');
  }

  get lastName() {
    return this.exform.get('lastName');
  }

  get email() {
    return this.exform.get('email');
  }

  get framework() {
    return this.exform.get('framework');
  }

  get frameworkVersions() {
    if (this.framework?.value === 'angular') {
      return this.versions.angular
    } else if (this.framework?.value === 'react') {
      return this.versions.react
    } else if (this.framework?.value === 'vue') {
      return this.versions.vue
    } else {
      return undefined
    }
  }

  get hobby() {
    return this.exform.get('hobby') as FormArray
  }

  createItem(): FormGroup {
    return this.fb.group({
      name : [null, Validators.required],
      duration : [null, Validators.required]
    })
  }

  addItem(): void {
    this.hobby.push(this.createItem())
  }

  isEmailTaken(): boolean {
    return this.exform.get('email').hasError('emailExist');
  }
  
}
