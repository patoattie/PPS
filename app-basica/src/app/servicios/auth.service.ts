import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  public doLogin(email: string, password: string)
  {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.EmailAuthProvider();
      this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
 }
}
