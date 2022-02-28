import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import {MESESTIEMPO,DIASTIEMPO, niveltexto, leyendarecavisosmet} from '../../globales';
import { Avisosmap1Page } from '../avisosmap1/avisosmap1.page';
import { StorageService, Geolocaposicion } from '../../services/storage.service';
import { listaMapas } from '../../models/listamapasmet.model';
import { WmssenamhiService } from '../../services/wmssenamhi.service';


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
  itemGP:  Geolocaposicion[]=[];
  ciudad;
  arrayNivel:any[]=[];
  arrayCodNivel:any[]=[];
  aniofechaem;
  recomendacion;

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
  @Input() lattemp: number;
  @Input() longtemp: number;
  @Input() lmapas:Array<listaMapas>;



  
  constructor(private modalcontroller: ModalController, private socialSharing: SocialSharing, 
    private screenshot: Screenshot,private router:Router, private storageService:StorageService,
    public wmssenamhi:WmssenamhiService,
    private route: ActivatedRoute) { 

       // inject desde main a app.component
    this.storageService.hiddenButtonApp({
      main: true,
      search: true,
      share:true
    });

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

          this.aniofechaem=this.fechaaux1.getFullYear();

          this.fechaaux2=new Date(this.fechaaux.getFullYear(),this.fechaaux.getMonth(),this.fechaaux.getDate(),this.fechaaux.getHours()+this.vigencia,this.fechaaux.getMinutes());

          let hrs='0'+this.fechaaux.getHours()
          let mns='0'+this.fechaaux.getMinutes()
       
          let hrs1='0'+this.fechaaux1.getHours()
          let mns1='0'+this.fechaaux1.getMinutes()

          let hrs2='0'+this.fechaaux2.getHours()
          let mns2='0'+this.fechaaux2.getMinutes()

          this.fechaemision=DIASTIEMPO[this.fechaaux1.getDay()]+', '+this.fechaaux1.getDate()+' de '+MESESTIEMPO[this.fechaaux1.getMonth()]
          +' del '+this.fechaaux1.getFullYear()+'\n a las '+hrs1.slice(-2)+':'+mns1.slice(-2)+' hrs.'; 
     
          this.fechainicio=DIASTIEMPO[this.fechaaux.getDay()]+', '+this.fechaaux.getDate()+' de '+MESESTIEMPO[this.fechaaux.getMonth()]
          +' del '+this.fechaaux.getFullYear()+'\n a las '+hrs.slice(-2)+':'+mns.slice(-2)+' hrs.'; 

          this.fechafin=DIASTIEMPO[this.fechaaux2.getDay()]+', '+this.fechaaux2.getDate()+' de '+MESESTIEMPO[this.fechaaux2.getMonth()]
          +' del '+this.fechaaux2.getFullYear()+'\n a las '+hrs2.slice(-2)+':'+mns2.slice(-2)+' hrs.'; 

        }
      })
    }

  ngOnInit(){
    this.listamapas=[];
    this.listamapas=this.lmapas;

    //console.log(this.listamapas)
    const tiempoTranscurrido = new Date(Date.now());
    const fehac=tiempoTranscurrido.getDate()+'/'+tiempoTranscurrido.getMonth()+'/'+tiempoTranscurrido.getFullYear();
    
    this.arrayNivel=[];
    this.arrayCodNivel=[];
    this.recomendacion=leyendarecavisosmet[0];

    this.storageService.getitemGeoposition().then((items0)=>{
      this.itemGP=items0;

      this.ciudad=this.itemGP[0].ciudad;
      this.lattemp=this.itemGP[0].lat;
      this.longtemp=this.itemGP[0].long;

    
      this.lmapas.map(i=>{
          let viewpar='viewparams=qry:'+this.titulomodal+'_'+i.numMapa+"_"+this.aniofechaem;
          this.wmssenamhi.getInfoAvisosNiveles(1,viewpar,'g_aviso:view_aviso', this.lattemp,this.longtemp)
            .subscribe(dat=>{
              let obj = JSON.parse(dat.data);
              let datawms = obj['features'];
              let resultado;

              datawms.map(element => {
               
                let dato=element['properties'].nivel;
                let fehcini=new Date(element['properties'].fech_ini);
                
                let feh=fehcini.getDate()+'/'+fehcini.getMonth()+'/'+fehcini.getFullYear();
          
                let niveli=dato.slice(-1);
                let textonivel='';
                if(Number(niveli)){
                  niveli=Number(niveli)-1;
                  if(niveli<0){
                    niveli=0;  
                  }
                  resultado=niveli;
                }else{
                  resultado=0
                }

                if(resultado==0){
                  textonivel='No está expuesto'
                }else{
                  textonivel=niveltexto[resultado];
                }

                if(feh==fehac){
                  this.recomendacion=leyendarecavisosmet[resultado];
                }
           
                let nivele=textonivel;
                this.arrayNivel.push(nivele);
                this.arrayCodNivel.push(resultado);
              })

            })
      })
   
    })

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

  colorAvisoTD(i){
    let d=this.arrayCodNivel[i];
    return parseInt(d) === 0
    ? 'datamain2' //muy alto
    : parseInt(d) === 1 
    ? 'bannerAvisoAmarillo' //alto
    : parseInt(d) === 2
    ? 'bannerAvisoNaranja' //medio
    : parseInt(d) === 3 
    ? 'bannerAvisoRojo' //bajo
    : 'datamain2'; //vacio
  }

  colortextoCuadro(i){
    let d=this.arrayCodNivel[i];
    return parseInt(d) != 0
    ? 'negro' //muy alto
    : 'datamain2'; //vacio
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


  ionViewWillEnter(){

    // inject desde main a app.component
    this.storageService.hiddenButtonApp({
      main: true,
      search: true,
      share:true
    });

  }
  
}
