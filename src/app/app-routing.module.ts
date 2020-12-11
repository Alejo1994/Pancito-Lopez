import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProductComponent } from './components/product/product.component';
import { SingInComponent } from './components/sing-in/sing-in.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { SignOutGuard } from './guards/sign-out.guard';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'product', component: ProductComponent, canActivate:[AuthGuard] },
  {path: 'product/addProduct', component: AddProductComponent, canActivate:[AuthGuard] },
  {path: 'login', component: LoginComponent, canActivate:[SignOutGuard]},
  {path: 'signOut', component: SignOutComponent, canActivate:[AuthGuard]},
  {path: '**', pathMatch: 'full', redirectTo: 'menu'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
