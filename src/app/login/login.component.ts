import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { AccessControlService } from '../shared/services/access-control.service';
import { LoginUser } from '../shared/interfaces/Base.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginText: string = 'Введите логин';
  passwordText: string = 'Введите пароль';
  processing = false;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private accessControlService: AccessControlService
  ) {
    this.form = new FormGroup({
      login: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
    this.form.get('login')?.valueChanges.subscribe(() => {
      if (this.form.get('login')?.hasError('minlength')) {
        this.loginText = 'Мин 3 символа';
      } else {
        this.loginText = 'Введите логин';
      }
    });
    this.form.get('password')?.valueChanges.subscribe(() => {
      if (this.form.get('password')?.hasError('minlength')) {
        this.passwordText = 'Мин 5 символов';
      } else {
        this.passwordText = 'Введите пароль';
      }
    });
  }
  submit() {
    const user: LoginUser = {
      username: this.form.value.login,
      password: this.form.value.password,
    };
    this.authService.login(user).subscribe({
      next: () => {
        this.authService.getUserInfo().subscribe({
          next: (userInfo) => {
            this.accessControlService.setUserInfo(userInfo);
            const userInfoFromService = this.accessControlService.getUserInfo();
            if (userInfoFromService !== undefined) {
              this.router.navigate(['/']);
              this.form.reset();
            }
          },
          error: (_) => this.authService.logout(),
        });
      },
    });
  }
}
