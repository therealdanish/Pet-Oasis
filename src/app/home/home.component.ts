import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth:AuthService,
	      private route:Router) { }

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
