import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import{FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import{MatFormField} from '@angular/material';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  authError:any;
  
	
  constructor(private auth: AuthService,
		private fb:FormBuilder) { }
	
	registration:FormGroup;

  ngOnInit() {
	  this.auth.eventAuthError$.subscribe(data=>{
		  this.authError=data;
				       }
			       )
	 this.registration=this.fb.group({
		 'firstName':['',[
			 Validators.required,
			 Validators.minLength(5)
		 ]],
		 'lastName':['',[
			Validators.required,
			Validators.minLength(3)
		]],
		'email':['',[
			Validators.required,
			Validators.email
		]],
		'password':['',[
			Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
			Validators.minLength(6)
		]]
	 })			       
}
get firstName(){
	return this.registration.get('firstName');
}
get lastName(){
	return this.registration.get('lastName');
}
get email(){
	return this.registration.get('email');
}
get password(){
	return this.registration.get('password');
}


			
  createUser(frm: FormGroup){
	this.auth.createUser(frm.value);

  }

}
