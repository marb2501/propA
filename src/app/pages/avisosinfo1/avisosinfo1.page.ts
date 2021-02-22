import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import {MESESTIEMPO,DIASTIEMPO} from '../../globales';
import { Avisosmap1Page } from '../avisosmap1/avisosmap1.page';

import { listaMapas } from '../../models/listamapasmet.model';

@Component({
  selector: 'app-avisosinfo1',
  templateUrl: './avisosinfo1.page.html',
  styleUrls: ['./avisosinfo1.page.scss'],
})
export class Avisosinfo1Page implements OnInit {

  titulomodal:string;
  tituloaviso:string;
  data : any;
  fechaaux;
  fechaaux1;
  fechaaux2;
  diferenciasdias;
  listamapas:listaMapas[];

  @Input() numero: string;
  @Input() tituloA: string;
  @Input() fechaemision: string;
  @Input() fechainicio: string;
  @Input() fechafin: string;
  @Input() vigencia: number;
  @Input() descripcion1: string;
  @Input() nivel: string;
  @Input() lat: number;
  @Input() long: number;
  @Input() lmapas:Array<listaMapas>;
  
  constructor(private modalcontroller: ModalController, private socialSharing: SocialSharing, 
    private screenshot: Screenshot,private router:Router,
    private route: ActivatedRoute) { 

      this.route.queryParams.subscribe(params => {
        if (params && params.special){
          this.data = JSON.parse(params.special);
          this.titulomodal=this.data.numero;
          this.tituloaviso=this.data.tituloA;
          this.fechaaux=new Date(this.data.fechaini);
          this.fechaaux1=new Date(this.data.fechaemi);
          this.nivel = this.data.nivel;
          this.vigencia=this.data.vigencia;
          this.descripcion1=this.data.descripcion1;
          this.lat=this.data.latapp;
          this.long=this.data.longapp;
          this.lmapas=this.data.listaMapas;

          this.fechaemision=DIASTIEMPO[this.fechaaux1.getDay()]+', '+this.fechaaux1.getDate()+' de '+MESESTIEMPO[this.fechaaux1.getMonth()]
          +' del '+this.fechaaux1.getFullYear()+' a las '+this.fechaaux1.getHours()+':'+this.fechaaux1.getMinutes()+' hrs.'; 

          this.fechaaux2=new Date(this.fechaaux.getFullYear(),this.fechaaux.getMonth(),this.fechaaux.getDate(),this.fechaaux.getHours()+this.vigencia,this.fechaaux.getMinutes());
     
          this.fechainicio=DIASTIEMPO[this.fechaaux.getDay()]+', '+this.fechaaux.getDate()+' de '+MESESTIEMPO[this.fechaaux.getMonth()]
      +' del '+this.fechaaux.getFullYear()+' a las '+this.fechaaux.getHours()+':'+this.fechaaux.getMinutes()+' hrs.'; 

      this.fechafin=DIASTIEMPO[this.fechaaux2.getDay()]+', '+this.fechaaux2.getDate()+' de '+MESESTIEMPO[this.fechaaux2.getMonth()]
      +' del '+this.fechaaux2.getFullYear()+' a las '+this.fechaaux2.getHours()+':'+this.fechaaux2.getMinutes()+' hrs.'; 

        }
      })
    }

  ngOnInit(){
    this.listamapas=[];
    this.listamapas=this.lmapas;
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


  retornar(){
    this.router.navigate(['/menu/avisosdetail1']);
  }

  async openModal(fecha,variable,nivelmapa,descripcion) {
    
   
    const modal = await this.modalcontroller.create({
      component: Avisosmap1Page ,
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
        'descripcion':descripcion,
        'nivelaviso': this.nivel
      }
    });
    return await modal.present();
  }

  
}
