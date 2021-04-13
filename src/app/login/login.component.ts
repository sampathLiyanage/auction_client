import { Component, OnInit } from '@angular/core';

export interface LoginData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: LoginData;
  constructor() {
    this.loginData = {username: '', password: ''};
  }

  ngOnInit(): void {
  }
}
