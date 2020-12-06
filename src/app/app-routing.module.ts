import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SliderComponent } from './components/slider/slider.component';
import { AboutComponent } from './components/about/about.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'slider', component: SliderComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'product', component: ProductComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'menu'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
