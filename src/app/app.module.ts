import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HammerModule } from '@angular/platform-browser';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './home/articles/articles.component';
import { ContactComponent } from './home/contact/contact.component';
import { FooterComponent } from './nav/footer/footer.component';
import { HeaderComponent } from './nav/header/header.component';
import { HomeComponent } from './home/home.component';
import { LinksComponent } from './home/links/links.component';
import { ResumeComponent } from './resume/resume.component';
import { RibbonComponent } from './nav/ribbon/ribbon.component';
import { VisionComponent } from './home/vision/vision.component';
import { WorkComponent } from './home/work/work.component';
import { ResumeHeaderComponent } from './nav/resume-header/resume-header.component';
import { ResumeMenuComponent } from './nav/resume-menu/resume-menu.component';
import { TilesComponent } from './home/work/tiles/tiles.component';
import { ModalComponent } from './home/work/modal/modal.component';

declare var Hammer: any;

export class MyHammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    let mc = new Hammer(element, {
      touchAction: 'pan-y'
    });
    return mc;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    ContactComponent,
    LinksComponent,
    ResumeComponent,
    ResumeMenuComponent,
    ResumeHeaderComponent,
    RibbonComponent,
    VisionComponent,
    WorkComponent,
    TilesComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HammerModule,
    LayoutModule,
    MatIconModule,
    NgxGoogleAnalyticsModule.forRoot('G-B44ET3NT3G'),
    NgxGoogleAnalyticsRouterModule
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
