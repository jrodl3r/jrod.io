import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './home/articles/articles.component';
import { ContactComponent } from './home/contact/contact.component';
import { FooterComponent } from './nav/footer/footer.component';
import { HeaderComponent } from './nav/header/header.component';
import { HeaderSmallComponent } from './nav/header-small/header-small.component';
import { HomeComponent } from './home/home.component';
import { LinksComponent } from './home/links/links.component';
import { ResumeComponent } from './resume/resume.component';
import { VisionComponent } from './home/vision/vision.component';
import { WorkComponent } from './home/work/work.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    FooterComponent,
    HeaderComponent,
    HeaderSmallComponent,
    HomeComponent,
    ContactComponent,
    LinksComponent,
    ResumeComponent,
    VisionComponent,
    WorkComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
