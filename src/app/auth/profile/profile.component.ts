import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import{AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
export interface usser{firstname:string;lastname:string;role:string;id?:string;email:string;image:string};


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	usercolref:AngularFirestoreCollection<usser>;
	useref$:Observable<usser[]>;
	uid=this.af.authState.pipe(
		map(AuthState=>{
			return AuthState.uid;
		})
	)
	edit=false;
	editdata(){
		
		this.edit=true;
		console.log(this.edit);
	}


        updateform:FormGroup;  
  constructor(private auth:AuthService,
	       private readonly db:AngularFirestore,
	       private af:AngularFireAuth,
	       private fb:FormBuilder) { 
		this.auth.getCurrentState().subscribe(user=>{
			this.user=user;})
		this.updateform=this.fb.group({
			'firstName':[{value:'',disabled:(this.edit)},[
				Validators.required,
				Validators.minLength(3)
			]],
			'lastName':[{value:'',disabled:(this.edit)},[
			       Validators.required,
			       Validators.maxLength(20)
		       ]],
		       'role':[{value:'',disabled:(this.edit)},[
			       Validators.required,
			       Validators.minLength(3),
		       ]]
		})			 
		this.usercolref=this.db.collection<usser>('Users');
		this.useref$ = this.usercolref.snapshotChanges().pipe(map(actions => {
			return actions.map(action => {
			  const data = action.payload.doc.data() as usser;
			  const id = action.payload.doc.id;
			  return {id,...data};
			});
		      }));
		console.log(this.edit);
		}
  user:firebase.User;

  Update1(frm){
	  
	this.usercolref.doc(this.user.uid).update(frm.value);
	this.edit=false;
	console.log(this.edit);
}
get firstName(){
	return this.updateform.get('firstName');
}
get lastName(){
	return this.updateform.get('lastName');
}
get email(){
	return this.updateform.get('email');
}
get role(){
	return this.updateform.get('role');
}
  
  

  ngOnInit() {
	  
	  
 

	 
		
	  
  }
}
     

