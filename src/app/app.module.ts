import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SliderComponent } from './components/slider/slider.component';
import { AboutComponent } from './components/about/about.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, BUCKET} from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { ProductComponent } from './components/product/product.component';
import { NgFilesDirective } from './directives/ng-files.directive';
import { ProductService } from './services/product.service';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './shared/table/table.component';
import { CardsComponent } from './shared/cards/cards.component';
import { LoginComponent } from './components/login/login.component';
import { SingInComponent } from './components/sing-in/sing-in.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SliderComponent,
    AboutComponent,
    MenuComponent,
    FooterComponent,
    NgFilesDirective,
    ProductComponent,
    TableComponent,
    CardsComponent,
    LoginComponent,
    SingInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [
    ProductService,
    {provide: BUCKET, useValue: 'gs://pancito-lopez.appspot.com'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
