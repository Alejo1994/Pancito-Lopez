import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  auth: any;

  constructor(private aFauth: AngularFireAuth) { }

  ngOnInit(): void {
    this.aFauth.authState
      .pipe(map(auth => {
        if (auth && auth !== undefined && auth !== null) {
          return true;
        }
        else {
          return false;
        }
      })).subscribe(res => this.auth = res);;

  }

}
