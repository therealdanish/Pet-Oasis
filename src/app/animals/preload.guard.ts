import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import{AngularFirestore} from '@angular/fire/firestore';
import {
	CanActivate,
	Resolve,
	Router
      } from '@angular/router';
import { first, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PreloadGuard implements Resolve<any> {
	constructor(private afs: AngularFirestore, private router: Router) {}
      
	resolve(
	  next: ActivatedRouteSnapshot,
	  state: RouterStateSnapshot
	): Observable<any> {
	  const name = next.paramMap.get('id');
	  return this.afs
	    .doc('Cat/' + name)
	    .valueChanges()
	    .pipe(
	      first(),
	      tap(animal => {
		if (!animal) {
		  alert('Animal not found!');
		  this.router.navigate(['animals']);
		}
	      })
	    );
	}
      }
