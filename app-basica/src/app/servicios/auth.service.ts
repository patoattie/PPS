import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }


  public doLogin(email: string, password: string): Promise<any>
  {
    return new Promise<any>((resolve, reject) => 
    {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function(error) 
      {
        // Handle Errors here.
        console.log(error.code);
        console.log(error.message);
        // ...
      });
    })
  }

  public doLogout(): void
  {
    firebase.auth().signOut()
    .then(function() 
    {
      // Sign-out successful.
    })
    .catch(function(error) 
    {
      console.info(error.code);
    });
  }

  public getUser(): string
  {
    return firebase.auth().currentUser.email;
  }

  public getToken(): Observable<string>
  {
    return this.afAuth.idToken;
  }
}
