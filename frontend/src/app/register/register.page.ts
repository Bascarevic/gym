import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @Input() type: string;
  @Input() placeholder: string;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name_and_surname : new FormControl(null, [Validators.required]),
      email:new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onRegister(){
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('/login');
    })
  }

}
