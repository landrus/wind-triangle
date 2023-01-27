import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { WindTrianglePage } from './windtriangle.page';

import { WindTrianglePageRoutingModule } from './windtriangle-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WindTrianglePageRoutingModule
  ],
  declarations: [WindTrianglePage]
})
export class WindTrianglePageModule {}
