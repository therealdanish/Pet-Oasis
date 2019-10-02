import { Component, OnInit } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {descrip} from '../animals.component';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss']
})
export class CatComponent implements OnInit {

  constructor(private af: AngularFirestore,
	      private route:Router) { }

  cat$;
  cats:AngularFirestoreCollection<descrip>;
  ngOnInit() {
	this.cats=this.af.collection<descrip>('Cat');
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
