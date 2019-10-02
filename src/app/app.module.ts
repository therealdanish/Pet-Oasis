import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule,MatDividerModule, MatExpansionModule,MatFormFieldModule, MatInputModule, MatCardModule } from  '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './auth/profile/profile.component';
import { AnimalsComponent } from './animals/animals.component';
import { DetailComponent } from './animals/detail/detail.component';
import { ErrorComponent } from './animals/error/error.component';
import { SidenavComponent } from './home/sidenav/sidenav.component';
import { CategoriesComponent } from './categories/categories.component';
import { CatComponent } from './animals/cat/cat.component';
import { DogsComponent } from './animals/dogs/dogs.component';

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
    SidenavComponent,
    CategoriesComponent,
    CatComponent,
    DogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule,
    MatCardModule,
    MatDividerModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp( environment.firebase),
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
