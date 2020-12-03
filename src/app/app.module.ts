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
import {AngularFireStorageModule, BUCKET} from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { UploadImageComponent } from './shared/upload-image/upload-image.component';
import { StorageService } from './shared/upload-image/services/storage.service';
import { NgFilesDirective } from './shared/upload-image/directives/ng-files.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SliderComponent,
    AboutComponent,
    MenuComponent,
    FooterComponent,
    UploadImageComponent,
    NgFilesDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [
    StorageService,
    {provide: BUCKET, useValue: 'gs://pancito-lopez.appspot.com'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
