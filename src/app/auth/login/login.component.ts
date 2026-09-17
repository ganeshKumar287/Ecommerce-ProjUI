import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginForm: FormGroup;
constructor (
      private fb: FormBuilder,private router:Router,private userservice:UserService)
{
      this.loginForm = this.fb.group({

          username :['', Validators.required],

          password:['', Validators.required],

      });
    }
  login() 
  {  
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      alert('Please fill all required fields.');
      return;
    }

    const payload = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
      // role: this.signupForm.get('role')?.value
    };
  
    this.userservice.login(payload).subscribe({
      next: (res:any) => {
        console.log(res);
      //  alert('login successful!');
        localStorage.setItem('username',res?.data.username);
        localStorage.setItem('roles', JSON.stringify(res?.data.roles));
        localStorage.setItem('userId', String(res?.data.userId));
        localStorage.setItem('token', res?.data.token);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        alert(err.error?.message || 'login failed!');

      }
    });
  }

}
