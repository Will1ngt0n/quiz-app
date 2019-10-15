import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home/:key', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'choose-category', loadChildren: './choose-category/choose-category.module#ChooseCategoryPageModule' },
  { path: 'show-results', loadChildren: './show-results/show-results.module#ShowResultsPageModule' },
  { path: 'view-quiz/:key', loadChildren: './view-quiz/view-quiz.module#ViewQuizPageModule' },
  { path: 'show-results-scores/:key', loadChildren: './show-results-scores/show-results-scores.module#ShowResultsScoresPageModule' },
  { path: 'show-specific-results/:key', loadChildren: './show-specific-results/show-specific-results.module#ShowSpecificResultsPageModule' },
  { path: 'user-profile', loadChildren: './user-profile/user-profile.module#UserProfilePageModule' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
