import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import{AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import{AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask}from '@angular/fire/storage';
import { Observable } from 'rxjs';
import {map, tap, finalize} from 'rxjs/operators';
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
	usercolrefs:AngularFirestoreCollection<usser>;
	useref$:Observable<usser[]>;
	file:File;
	task:AngularFireUploadTask;
	snapshot: Observable<any>;
	ref: AngularFireStorageReference;
	user:firebase.User;
	downloadURL:string;
	idd="";
	urk="";
	edit=false;
	editdata(){
		
		this.edit=true;
		console.log(this.edit);
	}


        updateform:FormGroup;  
  constructor(private auth:AuthService,
	       private readonly db:AngularFirestore,
	       private af:AngularFireAuth,
	       private fb:FormBuilder,
	       private storage: AngularFireStorage) { 
		this.auth.getCurrentState().subscribe(user=>{
			this.user=user;
			this.idd=user.uid;})

				
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
upload(event){
	const path= Math.random().toString(36).substring(2);
	const refa = this.storage.ref(path);
	this.file=event.target.files[0];
	this.task = this.storage.upload(path,this.file);

	this.task.snapshotChanges().pipe(
		finalize(() => {
		  refa.getDownloadURL().subscribe(url => {
		    this.urk=JSON.stringify(url);
		    this.urk=this.urk.replace(/"/g,"");
		    this.usercolref.doc(this.user.uid).set({image:this.urk},{merge:true});
		    console.log(this.urk); 
		  });
		})
	      ).subscribe();
	
}
  
  

  ngOnInit() {}
}
     

