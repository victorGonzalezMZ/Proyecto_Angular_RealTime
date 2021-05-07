import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/core/search.service';
import { AuthService } from '../../services/auth.service';
import { SocketioService } from '../../services/socketio.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'Api Real-Time';
  suscription$: Subscription;
  NewUserPass: boolean = false;
  message1: string = '';
  hiddenMessage1: boolean = false;
  message2: string = '';
  hiddenMessage2: boolean = false;

  constructor(private authSvc: AuthService, public socket: SocketioService, private router: Router ) {
    this.suscription$ = this.socket.on('responseSignIn').subscribe((response: any) => {
      this.message1 = response;
      this.hiddenMessage1 = true;
    });

    this.suscription$ = this.socket.on('faillogin').subscribe((response: any) => {
      this.message1 = response;
      this.hiddenMessage1 = true;
    });

    this.suscription$ = this.socket.on('returnUserSignIn').subscribe((user: any) => {
      window.sessionStorage.setItem('fullName', user.nombreCompleto);
      window.sessionStorage.setItem('email',user.correo);
      window.sessionStorage.setItem('photo',user.fotoURL);

      this.NewUserPass = true;
    });

    this.suscription$ = this.socket.on('finishSignIn').subscribe((result: any) => {
      window.sessionStorage.setItem('token', result[0].token.token);

      this.NewUserPass = false;

      this.router.navigate(['/home']);
    });

    this.suscription$ = this.socket.on('resultLogin').subscribe((result: any) => {
      window.sessionStorage.setItem('fullName', result[0].user.nombreCompleto);
      window.sessionStorage.setItem('email',result[0].user.correo);
      window.sessionStorage.setItem('photo',result[0].user.fotoURL);
      window.sessionStorage.setItem('token', result[0].token.token);

      this.router.navigate(['/home']);
    });
   }

  ngOnInit(): void {
    var tokenAuth = window.sessionStorage.getItem('token');

    if(tokenAuth != null){
      this.router.navigate(['/home']);
    }
  }

  loginOAuth2(provider: string) {

    console.log('Provider: ', provider);
    this.authSvc.loginOAuth2(provider)
    .then((user: any) => {
      this.socket.emit('signUp', {
        fullName: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        apiKey: environment.API_KEY
      });

    })
    .catch((error) => {
      return {
        success: false,
        error
      }
    })
  }

  sendLogin(email: string, password: string) {
    if(email != '' || password != ''){
      this.message1 = '';
      this.hiddenMessage1 = false;

      this.socket.emit('login', {
        email: email,
        password: password,
        apiKey: environment.API_KEY
      });
    }
    else{
      this.message1 = 'Please introduce your email and password';
      this.hiddenMessage1 = true;
    }
  }

  sendPassword(password: string, confirmPassword: string){
    var email = window.sessionStorage.getItem('email');

    if(password != '' || confirmPassword != ''){
      if(password == confirmPassword){
        this.message2 = '';
        this.hiddenMessage2 = false;

        this.socket.emit('passwordSetup', {
          email: email,
          password: password,
          apiKey: environment.API_KEY
        });
      }else{
        this.message2 = 'Password and Confirm Password must match';
        this.hiddenMessage2 = true;
      }
    }else{
      this.message2 = 'Please introduce your new password';
      this.hiddenMessage2 = true;
    }
  }

}
