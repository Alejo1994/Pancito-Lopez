import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SliderComponent } from './components/slider/slider.component';
import { AboutComponent } from './components/about/about.component';
import { MenuComponent } from './components/menu/menu.component';
import { UploadImageComponent } from './shared/upload-image/upload-image.component';

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'slider', component: SliderComponent},
  {path: 'menu', component: MenuComponent},
  { path: 'uploadImage', component: UploadImageComponent },
  {path: '**', pathMatch: 'full', redirectTo: 'about'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
