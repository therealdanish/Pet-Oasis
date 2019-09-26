import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable, pipe } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


	
  constructor(private afAuth:AngularFireAuth,
	      private db:AngularFirestore,
	      private router: Router) { 
		
	      
		}
private eventAuthError= new BehaviorSubject<string>("");
eventAuthError$=this.eventAuthError.asObservable();
newUser:any;

getCurrentState(){
	return this.afAuth.authState;
}

createUser(user){
	console.log(user);
	this.afAuth.auth.createUserWithEmailAndPassword( user.email, user.password)
	.then( userCredential=>{
		this.newUser=user;
		console.log(userCredential);
		userCredential.user.updateProfile({
			displayName:user.firstName + ' ' + user.lastName
		});
	
	
	this.insertUserData(userCredential)
	  .then(()=>{
		  this.router.navigate(['/home']);
	  });
	
	})
	.catch(error=>{
		this.eventAuthError.next(error);
	});
}
insertUserData(userCredential: firebase.auth.UserCredential){

	return this.db.doc(`/Users/${userCredential.user.uid}`).set({
		email:this.newUser.email,
		firstName:this.newUser.firstName,
		lastName:this.newUser.lastName,
		role:'klj'
	})
}
login(email:string,password:string){
	this.afAuth.auth.signInWithEmailAndPassword(email,password)
	.catch(error=>{
		this.eventAuthError.next(error);
	})
	.then(userCredential=>{
		if(userCredential){
			this.router.navigate(['/home']); 
		}
	})
}

logout(){
	this.afAuth.auth.signOut();
}

}


