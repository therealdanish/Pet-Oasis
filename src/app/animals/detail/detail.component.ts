import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor( private af: AngularFirestore,
	       private route:ActivatedRoute) { }
  animal$;
  ngOnInit() {
	this.animal$=this.route.data.pipe(map(val=>val[0]));
  }

}
