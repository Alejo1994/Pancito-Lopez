import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private aFAuth: AngularFireAuth,
    private router: Router) { }

  async loginWithEmail(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.aFAuth.signInWithEmailAndPassword(email, password)
        .then(res => resolve(res))
        .catch(err => reject({ error: err.message }));
    });
  }

  async logout() {
    await this.aFAuth.signOut()
      .then(res => this.router.navigate(['product']));
  }
}
