import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowResultsScoresPage } from './show-results-scores.page';

const routes: Routes = [
  {
    path: '',
    component: ShowResultsScoresPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowResultsScoresPage]
})
export class ShowResultsScoresPageModule {}
