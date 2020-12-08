import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignOutGuard implements CanActivate {

  constructor(private aFAuth: AngularFireAuth){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.aFAuth.authState
      .pipe(map( auth => {
          if(auth && auth !== undefined && auth !== null){
            return false;
          }
          else{
            return true;
          }
      }));
  }
  
}
