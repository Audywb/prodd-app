import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//new Auth
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'add-song',
    loadChildren: () => import('./add-song/add-song.module').then( m => m.AddSongPageModule)
  },
  {
    path: 'edit-promo/:id',
    loadChildren: () => import('./edit-song/edit-song.module').then( m => m.EditSongPageModule)
  },
  {
    path: 'promo-display',
    loadChildren: () => import('./promo-display/promo-display.module').then( m => m.PromoDisplayPageModule)
  },
  {
    path: 'promo-add',
    loadChildren: () => import('./promo-add/promo-add.module').then( m => m.PromoAddPageModule)
  },

  {path: 'login',component: LoginComponent},
  {path: 'profile',component: ProfileComponent},
  {path: 'register',component: RegisterComponent},


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
