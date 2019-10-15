import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowSpecificResultsPage } from './show-specific-results.page';

const routes: Routes = [
  {
    path: '',
    component: ShowSpecificResultsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowSpecificResultsPage]
})
export class ShowSpecificResultsPageModule {}
