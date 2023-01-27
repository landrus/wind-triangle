import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'windtriangle',
    loadChildren: () => import('./windtriangle/windtriangle.module').then( m => m.WindTrianglePageModule)
  },
  {
    path: '',
    redirectTo: 'windtriangle',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
