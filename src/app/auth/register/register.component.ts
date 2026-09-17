import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
signupForm: FormGroup;
constructor (
      private fb: FormBuilder,private router:Router,private userservice:UserService)
{
      this.signupForm = this.fb.group({

          username :['', Validators.required],

          email:['', Validators.required],

          password:['', Validators.required],

          confirmPassword:['', Validators.required],
      });
  }
signup() {
    if (this.signupForm.get('password')?.value!== this.signupForm.get('confirmPassword')?.value ){
      alert('Passwords do not match!');
      return;
    }
    
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      alert('Please fill all required fields.');
      return;
    }

    const payload = {
      username: this.signupForm.get('username')?.value,
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value,
      // role: this.signupForm.get('role')?.value
    };
  
    this.userservice.signup(payload).subscribe({
      next: (res) => {
        alert('Signup successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error?.message || 'Signup failed!');
      }
    });
  }
}
