import { Component } from '@angular/core';
import { AuthService } from '../../services/user.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router : Router,
    ){}

  onLogin():void{
    this.authService.login('chovan68@gmail.com', 'adsd.aklfj333l.dkjfklds3')
    .subscribe(user => {
      this.router.navigateByUrl('/')
    });
  }
}
