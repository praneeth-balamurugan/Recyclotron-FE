import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminGuard } from './account/admin.guard';
import { AuthGuard } from './account/auth.guard';
import { SignupComponent } from './account/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ScrapViewComponent } from './scrap/scrap-view/scrap-view.component';
import { ScrapComponent } from './scrap/scrap.component';
import { AddScrapComponent } from './user/add-scrap/add-scrap.component';
import { AdminViewScrapComponent } from './user/admin-view-scrap/admin-view-scrap.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', children: [{ path: '', component: HomeComponent }] },
  {
    path: 'u',
    children: [
      { path: 'signup', component: SignupComponent },
      { path: ':id', component: UserComponent, 
      // canActivate: [AuthGuard] 
    },
      {
        path: ':id/add-s',
        component: AddScrapComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'a/:id/sc/:sid',
        component: AdminViewScrapComponent,
        // canActivate: [AdminGuard],
      },
    ],
  },
  {
    path: 'sc',
    children: [
      { path: '', component: ScrapComponent },
      { path: ':sid', component: ScrapViewComponent },
    ],
  },
  { path: 'about', component: AboutComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
