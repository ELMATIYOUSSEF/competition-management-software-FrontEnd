import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { first } from 'rxjs/operators';
import { UserProfileService } from '../../../core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    private userService: UserProfileService) { }
  // set the currenr year
  year: number = new Date().getFullYear();

  ngOnInit(): void {
    document.body.classList.add('auth-body-bg');
  
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      familyName: ['', Validators.required],
      accessionDate: ['', Validators.required],
      nationality: ['', Validators.required],
      identityDocumentType: ['', Validators.required],
      identityNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  
  

  // convenience getter for easy access to form fields
  get dataForm() { return this.signupForm.controls; }


  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    } else {
        this.authenticationService.register(this.signupForm.get('name').value ,this.signupForm.get('familyName').value ,
        this.signupForm.get('accessionDate').value , this.signupForm.get('nationality').value,
        this.signupForm.get('identityDocumentType').value ,this.signupForm.get('identityNumber').value ,
        this.signupForm.get('email').value , this.signupForm.get('password').value).subscribe({
          next: () => {
            this.successmsg = true;
            if (this.successmsg) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Create Success , administrator will be notified ',
                showConfirmButton: false,
                timer: 3500
              });
               this.router.navigate(['/account/auth/login']);
            }
          },
          error(error) {
            this.error = error ? error : '';
          },
          complete: () => {
          }
        })

    }
  }
}
