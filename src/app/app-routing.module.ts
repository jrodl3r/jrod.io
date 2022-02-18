import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './resume/resume.component';
import { TimelineComponent } from './timeline/timeline.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
