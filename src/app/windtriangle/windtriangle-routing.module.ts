import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WindTrianglePage } from './windtriangle.page';

const routes: Routes = [
  {
    path: '',
    component: WindTrianglePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WindTrianglePageRoutingModule {}
