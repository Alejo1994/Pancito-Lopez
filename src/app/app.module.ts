import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, BUCKET} from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProductComponent } from './components/product/product.component';
import { TableComponent } from './shared/table/table.component';
import { CardsComponent } from './shared/cards/cards.component';
import { LoginComponent } from './components/login/login.component';
import { SingInComponent } from './components/sing-in/sing-in.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { environment } from '../environments/environment';

import { ProductService } from './services/product.service';
import { AuthService } from './services/auth.service';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    MenuComponent,
    FooterComponent,
    ProductComponent,
    TableComponent,
    CardsComponent,
    LoginComponent,
    SingInComponent,
    SignOutComponent,
    AddProductComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService,
    AuthService,
    {provide: BUCKET, useValue: 'gs://pancito-lopez.appspot.com'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
