import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SliderComponent } from './components/slider/slider.component';
import { AboutComponent } from './components/about/about.component';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'slider', component: SliderComponent},
  {path: 'menu', component: MenuComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'about'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
