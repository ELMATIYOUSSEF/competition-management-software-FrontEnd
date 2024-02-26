import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

import { environment } from '../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
/**
 * Login-2 component
 */
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) { }

  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;

  // set the currenr year
  year: number = new Date().getFullYear();

  ngOnInit(): void {
    document.body.classList.add('auth-body-bg');
    this.loginForm = this.formBuilder.group({
      email: ['youssef@gmail.com', [Validators.required, Validators.email]],
      password: ['password', [Validators.required]],
    });


    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }



  // convenience getter for easy access to form fields
  get dataForm() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
  
    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log('Invalid login form');
      return;
    }
  
    // Proceed with login
    this.authenticationService.login(this.dataForm.email.value, this.dataForm.password.value)
      .subscribe({
        next: () => {
          // Redirect to dashboard upon successful login
          console.log('DONE');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          // Display error message to the user
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              this.error = 'Invalid email or password. Please try again.';
            }
            if (error.status === 400) {
              const errorMessage = 'The server is currently undergoing maintenance. Please try again later.';
              console.log(errorMessage);
              Swal.fire({
                title: 'Error Your account is disabled ?',
                text: 'Contact the administrator !',
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#34c38f',
                cancelButtonColor: '#f46a6a',
                confirmButtonText: 'Ok!'
              })
            } 
            else {
              this.error = 'An unexpected error occurred. Please try again later.';
            }
          } else {
            this.error = 'An unexpected error occurred. Please try again later.';
          }
        }
      });
  }
  
}
