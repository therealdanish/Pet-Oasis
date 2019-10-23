import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule, AngularFirestore} from '@angular/fire/firestore';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';
import { MatToolbarModule, MatIconModule, MatSidenavModule,MatProgressBarModule, MatListModule, MatButtonModule,MatDividerModule, MatExpansionModule,MatFormFieldModule, MatInputModule, MatCardModule, MatProgressBar } from  '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './auth/profile/profile.component';
import { AnimalsComponent } from './animals/animals.component';
import { DetailComponent } from './animals/detail/detail.component';
import { ErrorComponent } from './animals/error/error.component';
import { CatComponent } from './animals/cat/cat.component';
import { DogsComponent } from './animals/dogs/dogs.component';
import { MzParallaxModule } from 'ngx-materialize';
import { MzCardModule } from 'ngx-materialize';
import {AuthService} from './auth/auth.service';
import{AuthGuard} from './auth/auth.guard';
import { AngularFireStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    ProfileComponent,
    AnimalsComponent,
    DetailComponent,
    ErrorComponent,
    CatComponent,
    DogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule,
    MatCardModule,
    MzCardModule,
    MatDividerModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp( environment.firebase),
    FormsModule,
    MzParallaxModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatExpansionModule
  ],
  providers: [
	AuthGuard,
	AuthService,
	AngularFireStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
