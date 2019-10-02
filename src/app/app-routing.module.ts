import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { AnimalsComponent } from './animals/animals.component';
import { DetailComponent } from './animals/detail/detail.component';
import { AuthGuard } from './auth/auth.guard';
import { PreloadGuard } from './animals/preload.guard';
import { ErrorComponent } from './animals/error/error.component';
import { CatComponent } from './animals/cat/cat.component';
import { DogsComponent } from './animals/dogs/dogs.component';
import {PreloalGuard} from './animals/preloal.guard';


const routes: Routes = [
	{
		path:'login',
		component: LoginComponent
	},
	
	{
		path:'register',
		component:RegistrationComponent
	},

	{
		path:'home',
		component:HomeComponent,
		
	},
	{
		path:'profile',
		component:ProfileComponent

	},
	{
		path:'animals',
		component:AnimalsComponent,
	},	
	{
	path:'animals/cat',
	component:CatComponent,
	children:[
			{
				path:':id',
				component:DetailComponent,
				resolve:[PreloadGuard]
			}
		]
	},
	{
	path:'animals/dog',
	component:DogsComponent,
	children:[
			{
				path:':id',
				component:DetailComponent,
				resolve:[PreloalGuard]
			}
		]	
	},
		
	
	{
		path:'',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{
		path:'**',
		component:ErrorComponent,
		pathMatch:'full'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
