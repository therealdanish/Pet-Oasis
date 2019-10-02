import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import{FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService,
	      private fb:FormBuilder) { }
 loginform:FormGroup;
 dtr="";
 s='';
  AuthError:any;

  ngOnInit() {
	  this.auth.eventAuthError$.subscribe(data=>{
			this.AuthError=data;	
	  });
	  this.loginform=this.fb.group({
		  'email':['',[
		Validators.required,
		Validators.email]
			    ],
		  'password':['',[
			  Validators.required
		  ]]
		
	  })
  }
  get email(){
	return this.loginform.get('email');
  }
  get password(){
	return this.loginform.get('password');
  }
  loginprtl(frm){

	this.auth.login(frm.value.email, frm.value.password);
  }

}
