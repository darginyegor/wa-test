import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'wa-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  submit(): void {
    if (this.authForm.valid) {
      this.auth.authenticate(this.authForm.value).subscribe(
        response => {
          this.router.navigate(['/']);
        },
        error => {

        }
      );
    }
  }

  ngOnInit(): void {
  }

}
