import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import{AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
export interface usser{firstname:string;lastname:string;role:string;id?:string}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	usercolref:AngularFirestoreDocument<usser>;
	useref$:Observable<usser[]>;
	uid=this.af.authState.pipe(
		map(AuthState=>{
			return AuthState.uid;
		})
	)

  constructor(private auth:AuthService,
	       private readonly db:AngularFirestore,
	       private af:AngularFireAuth) { 
		this.usercolref=this.db.collection<usser>('Users').doc('mfssJ8ZseZR0l2en9l6LzCusgGh2');
		this.useref$=this.usercolref.valueChanges();
		
	       }
  user:firebase.User;
  
  

  ngOnInit() {
	  this.auth.getCurrentState().subscribe(user=>{
		  this.user=user;
	  })
	  this.db.collection(`Users/${this.user.uid}`).snapshotChanges().pipe(
		  map(changes => {
		return changes.map(a => {
		  const data = a.payload.doc.data() as usser;
		  data.id = a.payload.doc.id;
		  return data;
	})
}))
		
	  
  }
}
     

