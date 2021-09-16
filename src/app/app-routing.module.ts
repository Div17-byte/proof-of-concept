import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './dashboard/main/main.component';
import { PocInfoComponent } from './dashboard/poc-info/poc-info.component';
import { PocViewComponent } from './dashboard/poc-view/poc-view.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: MainComponent,
      },
      {
        path: 'me',
        component: ProfileComponent,
      },
      {
        path: 'user/:publicUserId',
        component: ProfileComponent,
      },
      {
        path: 'poc/view/:id',
        component: PocViewComponent,
      },
      {
        path: 'poc/create',
        component: PocInfoComponent,
      },
      {
        path: 'poc/create/:requestId',
        component: PocInfoComponent,
      },
      {
        path: 'poc/edit/:editId',
        component: PocInfoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
