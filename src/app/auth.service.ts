import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { HttpService } from '../app/http.service';
import Auth0Lock from 'auth0-lock';
import { User } from './model/user';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
  private expiresAt: number;
  private accessToken: any;
  private userProfile: any;
  private authenticated: boolean = false;

  private authSubject: Subject<string> = new Subject<string>();
  authObservable = this.authSubject.asObservable();

  auth0Options = {
    auth: {
      redirectUrl: environment.auth0.callbackURL,
      responseType: 'token id_token',
      audience: `https://${environment.auth0.domain}/userinfo`,
      params: {
        scope: 'openid email profile'
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

  constructor(
    private httpService: HttpService,
    private router: Router
  ) {
    // this.getAccessToken();
    this.lock.on('authenticated', (authResult: any) => {
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          throw new Error(error);
        }
        else if (profile){
         this._setSession(authResult, profile)
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

    let user = new User(null, profile.sub, profile.given_name, profile.family_name, profile.email, 0, null, null);
    this.httpService.getOrCreateUser(user).subscribe(user_profile => {
      localStorage.setItem('currentUser', JSON.stringify(user_profile));
      localStorage.setItem('hasBeenReminded', "false");
      this.router.navigate(['/home']);
      this.authSubject.next('login');
    });
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('hasBeenReminded');
    this.authenticated = false;
    this.router.navigate(['/']);
    this.authSubject.next('logout');
  }

  get isLoggedIn(): boolean {
    // Check if current date is before token
    // expiration and user is signed in locally
    return Date.now() < this.expiresAt && this.authenticated;
  }

  isAuthenticated() {
    return localStorage.getItem('currentUser') != null ? true : false;
  }

  getCurrentUser() {
    let currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }
}