import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

import Auth0Lock from 'auth0-lock';

@Injectable()
export class AuthService {
  private expiresAt: number;
  private accessToken: any;
  private userProfile: any;
  private authenticated: boolean;

  auth0Options = {
    auth: {
      redirectUrl: environment.auth0.callbackURL,
      responseType: 'token id_token',
      audience: `https://${environment.auth0.domain}/userinfo`,
      params: {
        scope: 'openid profile'
      }
    },
    autoclose: true,
    oidcConformant: true,
  };

  lock = new Auth0Lock(
    environment.auth0.clientId,
    environment.auth0.domain,
    this.auth0Options
  );

 
  constructor(private router: Router) {
    // this.getAccessToken();
    this.lock.on('authenticated', (authResult: any) => {
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          throw new Error(error);
        }
        else if (profile){
         this._setSession(authResult, profile);
         this.router.navigate(['/task-list'])
         console.log('User ID: ', localStorage.getItem('userId'))
        }
      });
      });
    }
  

  login() {
    // Auth0 authorize request
    this.lock.show();
  }

  getAccessToken() {
    this.lock.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.getUserInfo(authResult);
      }
    });
  }

  getUserInfo(authResult) {
    // Use access token to retrieve user's profile and set session
    this.lock.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
      }
    });
  }

  private _setSession(authResult, profile) {
    // Save authentication data and update login status subject
    this.expiresAt = authResult.expiresIn * 1000 + Date.now();
    this.accessToken = authResult.accessToken;
    this.userProfile = profile;
    this.authenticated = true;

    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('userId', profile.sub);
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.authenticated = false;
    this.router.navigate(['/']);
  }

  get isLoggedIn(): boolean {
    // Check if current date is before token
    // expiration and user is signed in locally
    return Date.now() < this.expiresAt && this.authenticated;
  }
  // constructor(private router: Router) {
  //   this.auth0.checkSession({}, (err, authResult) => {
  //     console.log('constructor')
  //     console.log(authResult)
  //     if (authResult && authResult.accessToken) {
  //       this.getUserInfo(authResult);
  //     }
  //   });
  //   //   this.lock.on('authenticated', (authResult: any) => {
  // //     this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
  // //       if (error) {
  // //         throw new Error(error);
  // //       }

  // //       console.log(authResult);
  // //       console.log('-----------------------------------')
  // //       localStorage.setItem('token', authResult.idToken);
  // //       localStorage.setItem('profile', JSON.stringify(profile));
  // //       console.log(localStorage.profile);
  // //       console.log(localStorage.token);
  // //       this.isLoggedIn = true;
  // //       console.log('Logged in: ', this.isLoggedIn);
  // //       this.router.navigate(['/task-list']);
  // //   });
  // // });

  // //   this.lock.on('authorization_error', error => {
  // //     console.log('something went wrong', error);
  // //   });
  // }

  // getUserInfo(authResult) {
  //   // Use access token to retrieve user's profile and set session
  //   this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
  //     if (profile) {
  //       this._setSession(authResult, profile);
  //     }
  //   });
  // }

  // private _setSession(authResult, profile) {
  //   // Save authentication data and update login status subject
  //   this.expiresAt = authResult.expiresIn * 1000 + Date.now();
  //   this.accessToken = authResult.accessToken;
  //   this.userProfile = profile;
  //   this.authenticated = true;

  //   localStorage.setItem('profile', JSON.stringify(profile));
  //   console.log(localStorage.profile);
  //   this.router.navigate(['/task-list']);
  // }

  // login() {
  //   // this.lock.show();
  //   this.auth0.authorize();
  // }

  // logout() {
  //   localStorage.removeItem('profile');
  //   localStorage.removeItem('token');
  //   this.isLoggedIn = false;
  //   console.log('Logged in: ', this.isLoggedIn);
  //   this.router.navigate(['/login']);
  // }

  isAuthenticated() {
    return this.authenticated;
  }
}