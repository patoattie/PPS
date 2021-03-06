import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { InicioComponent } from "./componentes/inicio/inicio.component";

// Import canActivate guard services
import { AuthGuard } from "./guard/auth.guard";
import { SecureInnerPagesGuard } from "./guard/secure-inner-pages.guard.ts.guard";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard]},
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [SecureInnerPagesGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
