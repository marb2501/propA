import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Lugarafectado } from '../../models/lugarafectado.model';
import { MESESTIEMPO,DIASTIEMPO} from '../../globales';
import { Avisosmap4Page } from '../avisosmap4/avisosmap4.page';


@Component({
  selector: 'app-avisosinfo4',
  templateUrl: './avisosinfo4.page.html',
  styleUrls: ['./avisosinfo4.page.scss'],
})
export class Avisosinfo4Page {

  caviso:string;
  cnivel:string;
  colnivel:string;
  coloHexa:string;
  fEmi:string;
  hEmi:string;
  nTitulo:string;
  fIni:string;
  fFin:string;
  cPlazo:string;
  nPlazo:string;
  desc1:String;
  desc2:String;
  rutaimg:String;
  mgrojo:String;
  mgnaranja:String;
  mgamarillo:String;
 
  lugafec:Lugarafectado[];
  data : any;

  @Input() codAviso: string;
  @Input() codNivel: string;
  @Input() colorNivel: string;
  @Input() colorHexa: string;
  @Input() fecEmi:string;
  @Input() hrEmi:string;
  @Input() nomTitulo:string;
  @Input() fecIni:string;
  @Input() fecFin:string;
  @Input() codPlazo:string;
  @Input() nomPlazo:string;
  @Input() descrip1:string;
  @Input() descrip2:string;
  @Input() rutaImg:string;
  @Input() msgRojo:string;
  @Input() msgNaranja:string;
  @Input() msgAmarillo:string;
  @Input() codEsta:string;
  @Input() latEsta:string;
  @Input() lonEsta:string;
  @Input() altitudEsta:string;
  @Input() depEsta:string;
  @Input() provEsta:string;
  @Input() distEsta:string;
  @Input() lat:string;
  @Input() lng:string;
  @Input() lugarafectado:Array<Lugarafectado>;

  argFecha=[];

  constructor(private modalcontroler: ModalController,private router:Router,
      private route: ActivatedRoute) { 
    
      this.route.queryParams.subscribe(params => {
        if (params && params.special){
          this.data = JSON.parse(params.special);
          this.caviso=this.data.codAviso;
          this.cnivel=this.data.codNivel;
          this.colnivel=this.data.colorNivel;
          this.coloHexa=this.data.colorHexa;
          this.fEmi=this.data.fecEmi;
          this.hEmi=this.data.hrEmi;
          this.nTitulo=this.data.nomTitulo;
          this.fIni=this.data.fecIni;
          this.fFin=this.data.fecFin;
          this.cPlazo=this.data.codPlazo;
          this.nPlazo=this.data.nomPlazo;
          this.desc1=this.data.descrip1;
          this.desc2=this.data.descrip2;
          this.rutaimg=this.data.rutaImg;
          this.mgrojo=this.data.msgRojo;
          this.mgnaranja=this.data.msgNaranja;
          this.mgamarillo=this.data.msgAmarillo;
          this.codEsta=this.data.codEsta;
          this.latEsta=this.data.latEsta;
          this.lonEsta=this.data.lonEsta;
          this.altitudEsta=this.data.altitudEsta;
          this.depEsta=this.data.depEsta;
          this.provEsta=this.data.provEsta;
          this.distEsta=this.data.distEsta;
          this.lat=this.data.lat;
          this.lng=this.data.lng;
          this.lugafec=this.data.lugarafectado;
      }})
    }



    colorAviso(d){
      return parseInt(d) === 0
      ? 'blanco' //muy alto
      : parseInt(d) === 1 
      ? 'bannerAvisoAmarillo' //alto
      : parseInt(d) === 2
      ? 'bannerAvisoNaranja' //medio
      : parseInt(d) === 3 
      ? 'bannerAvisoRojo' //bajo
      : 'blanco'; //vacio
    }

    fechacat(fecha, vigencia){
      let fi=new Date(fecha);
      let ff=new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),fi.getHours()+vigencia,fi.getMinutes());
      return DIASTIEMPO[ff.getDay()]+', '+ff.getDate()+' de '+MESESTIEMPO[ff.getMonth()]+' del '+ff.getFullYear()+' a las '+ff.getHours()+':'+ff.getMinutes()+' hrs.'; 
    }

    getProvDistAfectados(){
      let codigoProv;
      let codigoDep;
      let tabalresul ="<table class='tablavert'><thead><tr><th>DEPARTAMENTO</th><th>PROVINCIA</th><th>DISTRITO</th></tr></thead><tbody>";
      this.lugafec.forEach(datos=>{
        if(codigoProv=="" && codigoDep==""){
          codigoDep=datos.codDep
          codigoProv=datos.codProv
          tabalresul +="<tr><td>"+datos.nomdep+"</td><td>"+datos.nomProv+"</td><td>"+datos.nomDist+"</td></tr>";
        }else{
          if(codigoDep!=datos.codDep){
            codigoDep=datos.codDep
            codigoProv=datos.codProv
            tabalresul +="<tr><td>"+datos.nomdep+"</td><td>"+datos.nomProv+"</td><td>"+datos.nomDist+"</td></tr>";

          }else if(codigoProv!=datos.codProv) {
            codigoProv=datos.codProv
            tabalresul +="<tr><td>&nbsp;</td><td>"+datos.nomProv+"</td><td>"+datos.nomDist+"</td></tr>";
          }else{
            tabalresul +="<tr><td>&nbsp;</td><td>&nbsp;</td><td>"+datos.nomDist+"</td></tr>";
          }
        }
      })
      tabalresul +="</tbody></table>";

      if(this.lugafec.length<=0){
        tabalresul="No se ha registrado los lugares afectados";
      }

      return tabalresul;
    }

    retornar(){
      this.router.navigate(['/menu/avisosdetail4']);
    }

    ngOnInit() {
    
      this.argFecha=[];
      let fecha=new Date();
      this.argFecha.push(fecha);
     
    }

    async openModal(fecha) {

      const modal = await this.modalcontroler.create({
        component: Avisosmap4Page ,
        componentProps: {
          'codAviso': this.caviso,
          'codNivel': this.cnivel,
          'colorNivel':  this.colnivel,
          'colorHexa': this.coloHexa,
          'fecEmi': this.fEmi,
          'hrEmi':this.hEmi,
          'nomTitulo': this.nTitulo,
          'fecIni': this.fIni,
          'fecFin':this.fFin,
          'codPlazo':this.cPlazo,
          'nomPlazo':this.nPlazo,
          'descrip1':this.desc1,
          'descrip2': this.desc2,
          'rutaImg':this.rutaimg,
          'msgRojo': this.mgrojo,
          'msgNaranja':this.mgnaranja,
          'msgAmarillo':this.mgamarillo,
          'codEsta':this.codEsta,
          'latEsta':this.latEsta,
          'lonEsta':this.lonEsta,
          'altitudEsta':this.altitudEsta,
          'depEsta':this.depEsta,
          'provEsta':this.provEsta,
          'distEsta':this.distEsta,
          'lugarafectado':this.lugafec,
          'lat':this.lat,
          'lng':this.lng,
          'fechactual':fecha
          }
      });
      return await modal.present();
    }


}
