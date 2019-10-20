import { Component, OnInit,AfterContentInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { firestore } from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {usser} from '../auth/profile/profile.component';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import * as Parallax from 'parallax-js';

declare var Parallax:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth:AuthService,
	      private route:Router,
	      private db:AngularFirestore) { 
		      this.data=this.db.collection<usser>('Users');
		      this.data$=this.data.snapshotChanges().pipe(map(actions=>{
			      return actions.map(action=>{
				     const id=action.payload.doc.id;
				     const data=action.payload.doc.data() as usser;
				     return {id,...data};
			      });
		      }));
	      }

data:AngularFirestoreCollection<usser>;
data$:Observable<usser[]>;
user:firebase.User;

  ngOnInit() {
	  this.auth.getCurrentState().subscribe( user=>{
		  this.user=user;
	  })
	 
  }
  
  

register(){
	this.route.navigate(['/register']);
}
login(){
	this.route.navigate(['/login']);	
}
logout(){
	this.auth.logout();
	//this.route.navigate(['/login']);	
}
}
