import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Material Components
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

// Components
import { DialogLoginComponent } from './auth/dialog-login/dialog-login.component';
import { DialogSignupComponent } from './auth/dialog-signup/dialog-signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogOtpComponent } from './auth/dialog-otp/dialog-otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { MainComponent } from './dashboard/main/main.component';
import { PocInfoComponent } from './dashboard/poc-info/poc-info.component';
import { ProfileEditComponent } from './dashboard/profile/profile-edit/profile-edit.component';
import { MarkdownModule } from 'ngx-markdown';
import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthtokenInterceptor } from './interceptors/authtoken.interceptor';
import { PocViewComponent } from './dashboard/poc-view/poc-view.component';
import { ReportUserComponent } from './dashboard/main/report-user/report-user.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DialogLoginComponent,
    DialogSignupComponent,
    DashboardComponent,
    DialogOtpComponent,
    ProfileComponent,
    MainComponent,
    PocInfoComponent,
    ProfileEditComponent,
    PocViewComponent,
    ReportUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatInputModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatDividerModule,
    MatChipsModule,
    MarkdownModule.forRoot(),
    HttpClientModule,
    MatTooltipModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthtokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
