import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {descrip} from './animals/animals.component';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'petoasis';
  urrl='';
  urrl2='';
  first='';
  second=''; 
  showsidenav=true;
  first$;
  second$;
  cat:AngularFirestoreCollection<descrip>;
  dog:AngularFirestoreCollection<descrip>;


  constructor(private bn: MatIconRegistry,
	       private bb: DomSanitizer,
	       private route:Router,
	       private db:AngularFirestore){
		       this.cat=this.db.collection<descrip>('Cat');
		       this.dog=this.db.collection<descrip>('Dog');
		       this.bn.addSvgIcon('liste',this.bb.bypassSecurityTrustResourceUrl('../assets/24px.svg'));
		       this.route.events.subscribe(events=>{
			       if(route.url === '/animals/cat'){
				       this.urrl="/animals/cat";
				       this.urrl2="/animals/dog";
				       this.first="Cat";
				       this.second="Dog";
				       this.showsidenav=true;
				       this.first$=this.cat.snapshotChanges().pipe(
					       map(actions=>{
						       return actions.map(action=>{
							       const id=action.payload.doc.id;
							       const data=action.payload.doc.data() as descrip;
							       return {id,...data};
						       });
					       }));
					this.second$=this.dog.snapshotChanges().pipe(
						map(actions=>{
							return actions.map(action=>{
								const id=action.payload.doc.id;
								const data=action.payload.doc.data() as descrip;
								return {id,...data};
							});
						}));
					

			       }
			       else if(route.url === '/animals/dog'){
				this.showsidenav=true;
				this.urrl="animals/dog";
				this.urrl2="animals/cat";
				this.first="Dog";
				this.second="Cat";
				this.first$=this.dog.snapshotChanges().pipe(
					map(actions=>{
						return actions.map(action=>{
							const id=action.payload.doc.id;
							const data=action.payload.doc.data() as descrip;
							return {id,...data};
						});
					}));
				 this.second$=this.cat.snapshotChanges().pipe(
					 map(actions=>{
						 return actions.map(action=>{
							 const id=action.payload.doc.id;
							 const data=action.payload.doc.data() as descrip;
							 return {id,...data};
						 });
					 }));
			       }
			       else if(route.url ==='/login' || route.url ==='/register'||route.url ==='/animals' || route.url ==='/home' || route.url ==='/profile'|| route.url ==='/**'){
				       this.showsidenav=false;
			       }
		       })	
		}
  

	
	}

