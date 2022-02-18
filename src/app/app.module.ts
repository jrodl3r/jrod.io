import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './resume/resume.component';
import { TimelineComponent } from './timeline/timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResumeComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
