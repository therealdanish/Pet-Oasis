import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {descrip} from '../animals.component';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss']
})
export class DogsComponent implements OnInit {

 constructor(private af: AngularFirestore,
	private route:Router) { }

cat$;
cats:AngularFirestoreCollection<descrip>;
ngOnInit() {
  this.cats=this.af.collection<descrip>('Dog');
  this.cat$=this.cats.snapshotChanges().pipe(
  map(action=>{
	  return action.map(actions=>{
	  const id=actions.payload.doc.id;
	  const data=actions.payload.doc.data() as descrip;
	  return{id,...data};
  });
  }));

}	


  

}