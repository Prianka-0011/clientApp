import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  isInvalid:boolean=true;
  constructor(private _http: HttpClient,
    private _authService: UserService,
    private _router: Router) { }

  login(loginForm: NgForm) {
    this.isInvalid = false;
    this._authService.auth({
      username: loginForm.value.username,
      password: loginForm.value.password
    }).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this._authService.setAuth(true);
          localStorage.setItem("user", JSON.stringify(response.data));
          this._router.navigate(["profile"]);
        } else {
          this.isInvalid = true;
        }
      },
      error: (error:any) => {
        this.isInvalid = true;
        console.log("Error from login", error);
      }
    })
  }


}
