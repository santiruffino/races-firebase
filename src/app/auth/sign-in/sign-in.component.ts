import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  constructor(
    public authService: AuthService,
    public router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  signInClick() {
    const signInButton = document.getElementById('signIn');
    signInButton?.classList.add('right-panel-active');
  }

  signUpClick() {
    this.router.navigate(['sign-up']);
    const signUpButton = document.getElementById('signUp');
    signUpButton?.classList.remove('right-panel-active');
  }
}
