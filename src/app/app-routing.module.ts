import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobOpeningComponent } from './pages/job-opening/job-opening.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { JobDetailComponent } from './pages/job-detail/job-detail.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"jobs",
    component:JobOpeningComponent
  },
  {
    path:"jobs/:jobId",
    component:JobDetailComponent
  }
  ,
  {
    path:"search",
    component:SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
