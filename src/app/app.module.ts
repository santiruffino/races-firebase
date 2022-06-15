import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeEsAr from '@angular/common/locales/es-AR';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AppRoutingModule } from './app-routing.module';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AddRaceComponent } from './races/add-race/add-race.component';
import { DashboardComponent } from './races/dashboard/dashboard.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { environment } from "../environments/environment";
import { EditRaceComponent } from './races/edit-race/edit-race.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { AuthService } from "./services/auth.service";
import { GoogleAuthProvider } from "@angular/fire/auth";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatExpansionModule } from "@angular/material/expansion";
import { FlexModule } from "@angular/flex-layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { IntroCardComponent } from './shared/intro-card/intro-card.component';
import { CoolSocialLoginButtonsModule } from "@angular-cool/social-login-buttons";
import { MatListModule } from "@angular/material/list";
import { MatChipsModule } from "@angular/material/chips";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { registerLocaleData } from "@angular/common";

registerLocaleData(localeEsAr, 'es-Ar');

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    AddRaceComponent,
    DashboardComponent,
    EditRaceComponent,
    IntroCardComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoolSocialLoginButtonsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    FlexModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatListModule,
    MatChipsModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [
    AuthService,
    GoogleAuthProvider,
    {
      provide: LOCALE_ID, useValue: 'es-Ar'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
