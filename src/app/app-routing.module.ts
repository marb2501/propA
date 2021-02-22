import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'main', loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)},
  { path: 'menu', loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)},
  { path: 'alertmap2', loadChildren: () => import('./pages/alertmap2/alertmap2.module').then( m => m.Alertmap2PageModule)},//pagina notficaion de avisos con servicio espaciales
  { path: 'alertmaphidro', loadChildren: () => import('./pages/alertmaphidro/alertmaphidro.module').then( m => m.AlertmaphidroPageModule)}, //pagina notificaion de avisos hidrologicos texto(nuevo)  
  { path: 'search',   loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)},
  {
    path: 'menu/avisosinfo1',
    loadChildren: () => import( './pages/avisosinfo1/avisosinfo1.module').then( m => m.Avisosinfo1PageModule)
  },
  {
    path: 'menu/avisometinfomain',
    loadChildren: () => import('./pages/avisometinfomain/avisometinfomain.module').then( m => m.AvisometinfomainPageModule)
  },
 
 /* {
    path: 'menu/avisohidinfomain',
    loadChildren: () => import('./pages/avisohidinfomain/avisohidinfomain.module').then( m => m.AvisohidinfomainPageModule)
  },*/
    
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
