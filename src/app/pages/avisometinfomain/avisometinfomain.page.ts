import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import {MESESTIEMPO,DIASTIEMPO, leyendarecavisosmet} from '../../globales';
import { AvisosmetmapmainPage } from '../../pages/avisosmetmapmain/avisosmetmapmain.page';
import { listaMapas } from '../../models/listamapasmet.model';
import { StorageService, Geolocaposicion } from '../../services/storage.service';

@Component({
  selector: 'app-avisometinfomain',
  templateUrl: './avisometinfomain.page.html',
  styleUrls: ['./avisometinfomain.page.scss'],
})
export class AvisometinfomainPage implements OnInit {

  titulomodal:string;
  tituloaviso:string;
  data : any;
  ciudad;
  recomendacion;

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

  
  itemGP:  Geolocaposicion[]=[];
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

          let hrs='0'+this.fechaaux.getHours()
          let mns='0'+this.fechaaux.getMinutes()

          let hrs2='0'+this.fechaaux2.getHours()
          let mns2='0'+this.fechaaux2.getMinutes()

          let hrs3='0'+this.fechaaux3.getHours()
          let mns3='0'+this.fechaaux3.getMinutes()


          this.fechainicio=DIASTIEMPO[this.fechaaux.getDay()]+', '+this.fechaaux.getDate()+' de '+MESESTIEMPO[this.fechaaux.getMonth()]
          +' del '+this.fechaaux.getFullYear()+' a las '+hrs.slice(-2)+':'+mns.slice(-2)+' hrs.'; 

          this.fechafin=DIASTIEMPO[this.fechaaux2.getDay()]+', '+this.fechaaux2.getDate()+' de '+MESESTIEMPO[this.fechaaux2.getMonth()]
          +' del '+this.fechaaux2.getFullYear()+' a las '+hrs2.slice(-2)+':'+mns2.slice(-2)+' hrs.'; 

          this.fechaemision=DIASTIEMPO[this.fechaaux3.getDay()]+', '+this.fechaaux3.getDate()+' de '+MESESTIEMPO[this.fechaaux3.getMonth()]
          +' del '+this.fechaaux3.getFullYear()+' a las '+hrs3.slice(-2)+':'+mns3.slice(-2)+' hrs.';
        }


      })
  }

  ngOnInit() {

    this.storagese.getitemGeoposition().then((items0)=>{
      this.itemGP=items0;
      this.ciudad=this.itemGP[0].ciudad;
    })

    this.recomendacion=leyendarecavisosmet[this.nivel];

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
    ? 'NORMAL' //muy alto
    : parseInt(d) === 1 
    ? 'LEVE' //alto
    : parseInt(d) === 2
    ? 'MODERADO' //medio
    : parseInt(d) === 3 
    ? 'ALTO' //bajo
    : 'NORMAL'; //vacio
  }

  colortextoCuadro(d){
    return parseInt(d) != 0
    ? 'negro' //muy alto
    : 'datamain2'; //vacio
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
