import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import {MESESTIEMPO,DIASTIEMPO} from '../../globales';
import { AvisoshidmapmainPage } from '../../pages/avisoshidmapmain/avisoshidmapmain.page';
import { AvisometeoroService } from '../../services/avisometeoro.service';
import { Lugarafectado } from '../../models/lugarafectado.model';

@Component({
  selector: 'app-avisohidinfomain',
  templateUrl: './avisohidinfomain.page.html',
  styleUrls: ['./avisohidinfomain.page.scss'],
})
export class AvisohidinfomainPage implements OnInit {

  titulomodal:string;
  tituloaviso:string;
  data : any;

  codAviso;
  codNivel;
  colorNivel;
  colorHexa;
  fecEmi;
  hrEmi;
  nomTitulo;
  fecIni;
  fecFin;
  estadoAviso;
  codPlazo;
  nomPlazo;
  descrip1;
  descrip2;
  rutaImg;
  msgRojo;
  msgNaranja;
  msgAmarillo;
  codTipoAviso;
  nomTipoAviso;
  latEsta;
  lonEsta;
  

  @Input() numero: string;
  @Input() tituloA: string;
  @Input() fechainicio: string;
  @Input() fechafin: string;
  @Input() vigencia: number;
  @Input() nivel: string;
  @Input() lat: number;
  @Input() long: number;
  @Input() flaglayer: string;
  
  argFecha=[];

  lugafec:Lugarafectado[];

  fechaaux;
  fechaaux2;
  diferenciasdias;

  constructor(private modalcontroller: ModalController,
    private route: ActivatedRoute, public loadingController: LoadingController,private router:Router,
    public avisosHidro: AvisometeoroService ) { 

      this.route.queryParams.subscribe(params => {
        if (params && params.special){
          this.data = JSON.parse(params.special);
          this.codAviso=this.data.numero;
          this.nomTitulo=this.data.tituloAHid;
          this.codAviso=this.data.codAviso;
          this.codNivel=this.data.nivel;
          this.colorNivel=this.data.colorNivel;
          this.fecEmi=this.data.fechaemisionhid;
          this.hrEmi=this.data.hrEmi;
          this.fecIni=this.data.fechainihid;
          this.fecFin=this.data.fecFin;
          this.estadoAviso=this.data.estadoAviso;
          this.codPlazo=this.data.codPlazo;
          this.nomPlazo=this.data.nomPlazo;
          this.nomTipoAviso=this.data.nomTipoAviso;
          this.descrip1=this.data.descrip1;
          this.descrip2=this.data.descrip2;
          this.rutaImg=this.data.rutaImg;
  
          this.msgRojo=this.data.msgRojo;
          this.msgNaranja=this.data.msgNaranja;
          this.msgAmarillo=this.data.msgAmarillo;

          this.latEsta=this.data.latEsta;
          this.lonEsta=this.data.lonEsta;

          this.lugafec=this.data.lugarAfectado;

          this.lat=this.data.latapp;
          this.long=this.data.longapp;

          this.fechaaux=new Date(this.fecIni);

          this.fechaaux2=new Date(this.fecFin);
    
          this.fechainicio=DIASTIEMPO[this.fechaaux.getDay()]+', '+this.fechaaux.getDate()+' de '+MESESTIEMPO[this.fechaaux.getMonth()]
      +' del '+this.fechaaux.getFullYear()+' a las '+this.fechaaux.getHours()+':'+this.fechaaux.getMinutes()+' hrs.'; 

      this.fechafin=DIASTIEMPO[this.fechaaux2.getDay()]+', '+this.fechaaux2.getDate()+' de '+MESESTIEMPO[this.fechaaux2.getMonth()]
      +' del '+this.fechaaux2.getFullYear()+' a las '+this.fechaaux2.getHours()+':'+this.fechaaux2.getMinutes()+' hrs.';         

        }
      })
  }

  ngOnInit() {
    
    this.argFecha=[];
    let fecha=new Date();
    this.argFecha.push(fecha);
   
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


  async openModal(fecha) {

    const modal = await this.modalcontroller.create({
      component: AvisoshidmapmainPage ,
      componentProps: {
        'layer': 1,
        'numero': this.titulomodal,
        'tituloA': this.tituloaviso,
        'fechainihid': this.fechaaux,
        'fechafinhid':this.fechaaux2,
        'fechaemisionhid':  this.fecEmi,
        'lat': this.lat,
        'long':  this.long,
        'lugarAfectado':this.lugafec,
        'colorNivel':this.colorNivel,
        'latEsta':this.latEsta,
        'lonEsta':this.lonEsta
      }
    });
    return await modal.present();
  }

  retornar(){
    this.router.navigate(['menu/main']);
  }

}
