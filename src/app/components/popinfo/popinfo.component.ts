import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';


@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss'],
})
export class PopinfoComponent implements OnInit {

  departamento;
  provincia;
  distrito;

  constructor(public navParams:NavParams) { 

    this.departamento=this.navParams.get('dep');
    this.provincia=this.navParams.get('prov');
    this.distrito=this.navParams.get('dist');

  }

  ngOnInit() {
  
  }

  
 

}
