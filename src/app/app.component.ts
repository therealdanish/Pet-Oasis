import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'petoasis';
  constructor(private bn: MatIconRegistry,
	       private bb: DomSanitizer){
		       this.bn.addSvgIcon('liste',this.bb.bypassSecurityTrustResourceUrl('../assets/24px.svg'));
	       }
}
