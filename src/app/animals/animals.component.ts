import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

import { AngularFirestoreCollection} from '@angular/fire/firestore';
export interface descrip{firstName:string;lastName:string;email:string;role:string;id?:string}

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss']
})
export class AnimalsComponent implements OnInit {
	
  animals$;
  usercolref:AngularFirestoreCollection<descrip>;	
  constructor(private af: AngularFirestore) { }


  ngOnInit() {
	this.usercolref=this.af.collection<descrip>('Cat');
	this.animals$ = this.usercolref.snapshotChanges().pipe(map(actions => {
		return actions.map(action => {
		  const data = action.payload.doc.data() as descrip;
		  const id = action.payload.doc.id;
		  return {id,...data};
		});
	      }));
  }

}
