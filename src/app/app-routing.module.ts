import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';

const routes: Routes = [
  // localhost:4200/auth
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [ PublicGuard ],
    canMatch: [ PublicGuard ],
  },
  // localhost:4200/heroes
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canActivate: [ AuthGuard ],
    canMatch: [ AuthGuard ]
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
