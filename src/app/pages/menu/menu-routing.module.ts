import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu/main',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuPage,
    children : [
      { path: 'main', loadChildren: () => import('../main/main.module').then( m => m.MainPageModule)
      },
      { path: 'search',   loadChildren: () => import('../search/search.module').then( m => m.SearchPageModule)},
      {
        path: 'smetmap1',
        loadChildren: () => import( '../smetmap1/smetmap1.module').then( m => m.Smetmap1PageModule)
      },
      {
        path: 'smetmap2',
        loadChildren: () => import('../smetmap2/smetmap2.module').then( m => m.Smetmap2PageModule)
      },
    
      {
        path: 'riesgoagroclim1',
        loadChildren: () => import('../riesgoagroclim1/riesgoagroclim1.module').then( m => m.Riesgoagroclim1PageModule)
      },
      {
        path: 'riesgoagroclim2',
        loadChildren: () => import('../riesgoagroclim2/riesgoagroclim2.module').then( m => m.Riesgoagroclim2PageModule)
      },
      {
        path: 'riesgoagroclim3',
        loadChildren: () => import('../riesgoagroclim3/riesgoagroclim3.module').then( m => m.Riesgoagroclim3PageModule)
      },
      {
        path: 'riesgoagroclim4',
        loadChildren: () => import('../riesgoagroclim4/riesgoagroclim4.module').then( m => m.Riesgoagroclim4PageModule)
      },
      {
        path: 'riesgoagroclim5',
        loadChildren: () => import('../riesgoagroclim5/riesgoagroclim5.module').then( m => m.Riesgoagroclim5PageModule)
      },
      {
        path: 'riesgoagroclim6',
        loadChildren: () => import('../riesgoagroclim6/riesgoagroclim6.module').then( m => m.Riesgoagroclim6PageModule)
      },
      {
        path: 'avisosdetail4',
        loadChildren: () => import('../avisosdetail4/avisosdetail4.module').then( m => m.Avisosdetail4PageModule)
      },
      {
        path: 'avisosdetail1',
        loadChildren: () => import( '../avisosdetail1/avisosdetail1.module').then( m => m.Avisosdetail1PageModule)
      },
      {
        path: 'avisosinfo1',
        loadChildren: () => import( '../avisosinfo1/avisosinfo1.module').then( m => m.Avisosinfo1PageModule)
      },
      {
        path: 'avisosinfo4',
        loadChildren: () => import( '../avisosinfo4/avisosinfo4.module').then( m => m.Avisosinfo4PageModule)
      },
      {
        path: 'avisometinfomain',
        loadChildren: () => import('../avisometinfomain/avisometinfomain.module').then( m => m.AvisometinfomainPageModule)
      },
      {
        path: 'avisohidinfomain',
        loadChildren: () => import('../avisohidinfomain/avisohidinfomain.module').then( m => m.AvisohidinfomainPageModule)
      },
      {
        path: 'ajustes',
        loadChildren: () => import('../ajustes/ajustes.module').then( m => m.AjustesPageModule)
      },
      { path: 'alertmaphidro', loadChildren: () => import('../alertmaphidro/alertmaphidro.module').then( m => m.AlertmaphidroPageModule)}, //pagina notificaion de avisos hidrologicos texto(nuevo)  
      { path: 'alertmap2', loadChildren: () => import('../alertmap2/alertmap2.module').then( m => m.Alertmap2PageModule)},//pagina notficaion de avisos con servicio espaciales       
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
