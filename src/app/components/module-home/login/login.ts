import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/Auth.Service';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  form: any;
  router: any;

  constructor(private auth: AuthService, ) { }

  login() {
    this.auth.login(this.form).subscribe((res: any) => {
      this.auth.saveSession(res);
      this.router.navigate(['/dashboard']);
    });
  }
}
