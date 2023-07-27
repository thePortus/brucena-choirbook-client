import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SampleViewComponent } from './components/sample-view/sample-view.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { PrivacyPolicyComponent } from './components/common/privacy-policy/privacy-policy.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sample', component: SampleViewComponent },
  // redirects root to home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // privacy policy
  { path: 'privacy', component: PrivacyPolicyComponent },
  // set 404 component and redirect all other entered routes to 404
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
