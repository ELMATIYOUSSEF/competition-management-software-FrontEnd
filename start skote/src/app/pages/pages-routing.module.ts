import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './dashboards/default/default.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/account/auth/login', pathMatch: 'full' },
  { path: 'dashboard', component: DefaultComponent ,canActivate:[AuthGuard] },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) ,canActivate:[AuthGuard]},
  { path: 'competitions', loadChildren: () => import('./competition/competition.module').then(m => m.CompetitionModule) ,canActivate:[AuthGuard]},
  { path: 'members', loadChildren: () => import('./member/member.module').then(m => m.MemberModule) ,canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
