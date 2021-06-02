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
  distancia;
  unidad;
  latitud;
  longitud;
  nombesta;

  constructor(public navParams:NavParams) { 

    this.departamento=this.navParams.get('dep');
    this.provincia=this.navParams.get('prov');
    this.distrito=this.navParams.get('dist');
    this.distancia=this.navParams.get('distancia');
    this.unidad=this.navParams.get('unidad');
    this.latitud=this.navParams.get('latitud');
    this.longitud=this.navParams.get('longitud');
    this.nombesta=this.navParams.get('nombest');
  }

  ngOnInit() {
  
  }

  
 

}
