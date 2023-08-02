import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/common/header/header.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { PrivacyPolicyComponent } from './components/common/privacy-policy/privacy-policy.component';
import { NavMenuComponent } from './components/common/nav-menu/nav-menu.component';
import { HomeIntroComponent } from './components/home/home-intro/home-intro.component';
import { HomeCreditsComponent } from './components/home/home-credits/home-credits.component';
import { HomeSpecsComponent } from './components/home/home-specs/home-specs.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { SampleViewComponent } from './components/sample-view/sample-view.component';
import { ImageDisplayPortComponent } from './components/image-viewer/image-display-port/image-display-port.component';
import { ImagePaginatorComponent } from './components/image-viewer/image-paginator/image-paginator.component';
import { ImageViewerDirective } from './directives/image-viewer.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NotFoundComponent,
    PrivacyPolicyComponent,
    NavMenuComponent,
    HomeIntroComponent,
    HomeCreditsComponent,
    HomeSpecsComponent,
    ImageViewerComponent,
    SampleViewComponent,
    ImageDisplayPortComponent,
    ImagePaginatorComponent,
    ImageViewerDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
