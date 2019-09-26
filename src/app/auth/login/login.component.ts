import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService) { }
  AuthError:any;

  ngOnInit() {
	  this.auth.eventAuthError$.subscribe(data=>{
			this.AuthError=data;	
	  });
  }

  loginprtl(frm){

	this.auth.login(frm.value.email, frm.value.password);
  }

}
