import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  @Input() user: any;
  //user = null;

  constructor(private as:AuthService) { }

  ngOnInit() {
    this.user = this.as.auth_user;
    console.log(this.user);
  }



}
