import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import {MESESTIEMPO,DIASTIEMPO} from '../../globales';
import { AvisosmetmapmainPage } from '../../pages/avisosmetmapmain/avisosmetmapmain.page';
import { listaMapas } from '../../models/listamapasmet.model';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-avisometinfomain',
  templateUrl: './avisometinfomain.page.html',
  styleUrls: ['./avisometinfomain.page.scss'],
})
export class AvisometinfomainPage implements OnInit {

  titulomodal:string;
  tituloaviso:string;
  data : any;

  @Input() numero: string;
  @Input() tituloA: string;
  @Input() fechainicio: string;
  @Input() fechaemision: string;
  @Input() fechafin: string;
  @Input() vigencia: number;
  @Input() descripcion1: string;
  @Input() nivel: string;
  @Input() lat: number;
  @Input() long: number;
  @Input() flaglayer: string;
  @Input() lmapas:Array<listaMapas>;

  listamapas:listaMapas[];
  argFecha=[];

  fechaaux;
  fechaaux2;
  fechaaux3;
  diferenciasdias;


  constructor(private modalcontroller: ModalController,private router:Router,
    private route: ActivatedRoute, private storagese:StorageService) { 

      this.storagese.hiddenButtonApp({
        main: true,
        search: true,
        share:true
      });

      this.route.queryParams.subscribe(params => {
        if (params && params.special){
          this.data = JSON.parse(params.special);
          this.titulomodal=this.data.numero;
          this.tituloaviso=this.data.tituloA;
          this.fechaaux=new Date(this.data.fechainimet);
          this.fechaaux3= new Date(this.data.fechaemisionmet);
          this.nivel=this.data.nivel;
          this.vigencia=this.data.vigencia;
          this.descripcion1=this.data.descripcion1;
          this.lat=this.data.latapp;
          this.long=this.data.longapp;
          this.lmapas=this.data.listaMapas;

          this.fechaaux2=new Date(this.fechaaux.getFullYear(),this.fechaaux.getMonth(),this.fechaaux.getDate(),this.fechaaux.getHours()+this.vigencia,this.fechaaux.getMinutes());
     
          this.fechainicio=DIASTIEMPO[this.fechaaux.getDay()]+', '+this.fechaaux.getDate()+' de '+MESESTIEMPO[this.fechaaux.getMonth()]
      +' del '+this.fechaaux.getFullYear()+' a las '+this.fechaaux.getHours()+':'+this.fechaaux.getMinutes()+' hrs.'; 

      this.fechafin=DIASTIEMPO[this.fechaaux2.getDay()]+', '+this.fechaaux2.getDate()+' de '+MESESTIEMPO[this.fechaaux2.getMonth()]
      +' del '+this.fechaaux2.getFullYear()+' a las '+this.fechaaux2.getHours()+':'+this.fechaaux2.getMinutes()+' hrs.'; 

      this.fechaemision=DIASTIEMPO[this.fechaaux3.getDay()]+', '+this.fechaaux3.getDate()+' de '+MESESTIEMPO[this.fechaaux3.getMonth()]
      +' del '+this.fechaaux3.getFullYear()+' a las '+this.fechaaux3.getHours()+':'+this.fechaaux3.getMinutes()+' hrs.';
        }


      })
  }

  ngOnInit() {
    this.argFecha=[];
    let fechatemp= new Date();
    let reul=Number(fechatemp.getMonth())+1;
    let mesac='0'+reul;
    let diaact='0'+fechatemp.getDate();
    let regi=fechatemp.getFullYear()+'-'+mesac.slice(-2)+'-'+diaact.slice(-2);
 
    this.argFecha=this.lmapas.filter(function(filtr) {return filtr.fechaInicio === regi;});
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

  textoNivel(d){
    return parseInt(d) === 0
    ? 'Blanco' //muy alto
    : parseInt(d) === 1 
    ? 'Amarillo' //alto
    : parseInt(d) === 2
    ? 'Naranja' //medio
    : parseInt(d) === 3 
    ? 'Rojo' //bajo
    : 'Blanco'; //vacio
  }

  async openModal(fecha,variable,nivelmapa,descripcion) {

    const modal = await this.modalcontroller.create({
      component: AvisosmetmapmainPage ,
      componentProps: {
        'layer': 1,
        'numero': this.titulomodal,
        'tituloA': this.tituloaviso,
        'fechaini': this.fechaaux,
        'vigencia':  this.vigencia,
        'latapp': this.lat,
        'longapp':  this.long,
        'fecharef':fecha,
        'variable':variable,
        'nivel':nivelmapa,
        'nivelaviso':this.nivel,
        'descripcion':descripcion,
      }
    });
    return await modal.present();
  }

  retornar(){
    this.router.navigate(['menu/main']);
  }

  ionViewWillEnter(){
    this.storagese.hiddenButtonApp({
      main: true,
      search: true,
      share:true
    });
  }
 

}
