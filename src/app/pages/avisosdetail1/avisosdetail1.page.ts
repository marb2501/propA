import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { previous, MESESTIEMPO,layermet} from '../../globales';
import { AvisometeoroService } from '../../services/avisometeoro.service';
import { AvisoMeteoro } from '../../models/avisomet.model';
import { StorageService, Geolocaposicion} from '../../services/storage.service';
import { WmssenamhiService } from '../../services/wmssenamhi.service';
import { MenumetService } from '../../services/menumet.service';
import { MenuMetApp } from '../../models/menumet.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Avisosmap24hPage } from '../avisosmap24h/avisosmap24h.page';
import { AvisosmapquebraPage } from '../avisosmapquebra/avisosmapquebra.page';
import { LoadingController } from '@ionic/angular';
import { Map} from 'leaflet';
import { AvisoMeteoroIDESEP } from '../../models/avisometidesep.model';


@Component({
  selector: 'app-avisosdetail1',
  templateUrl: './avisosdetail1.page.html',
  styleUrls: ['./avisosdetail1.page.scss'],
})
export class Avisosdetail1Page implements OnInit{

  public avisoMet: AvisoMeteoro[];
  public avisoMetAuxNivel: AvisoMeteoro[];

  public ametideseptemp:AvisoMeteoroIDESEP[];
  public ametidesep:AvisoMeteoroIDESEP[];

  ordenando:boolean = true;
  titulolist="Avisos Meteorológicos";
  previo=previous;
  itemGP:  Geolocaposicion[]=[];
  pagesMet: MenuMetApp[]=[];
  color24hnivel;
  fecha24h;
  dep=null;
  prov=null;
  ciudad;
  viewparams;
  //datacheck=[{name:'Mostrar los avisos meteorólogicos del país', selected:false}]
  datacheck=[{name:'Ver avisos del país', selected:false}]
  //array de niveles
  nivelesAM=[];
  icono;
  map: Map;
  
   constructor(private modalcontroller: ModalController, 
              private storageService:StorageService,
              private router:Router,
              private route: ActivatedRoute,
              public loadingController: LoadingController,
              public wmssenamhi:WmssenamhiService,
              public avisoMeteoro: AvisometeoroService,
              public menumetappService:MenumetService ) { 

                this.avisoMet=[];
               
                this.route.queryParams.subscribe(params => {
                  if (params && params.special){
                    this.icono = params.special
                  }
                })

                // inject desde main a app.component
                this.storageService.hiddenButtonApp({
                  main: true,
                  search: true,
                  share:true
                });
  }

  ngOnInit(){
    //this.datacheck=[{name:'Mostrar los avisos meteorólogicos del país', selected:false}]
    this.datacheck=[{name:'Ver avisos del país', selected:false}]
    this.avisoMet=[];
    
    this.nivelesAM=[];
    this.color24hnivel='';
    this.fecha24h='';
     this.getColorNivel24Horas();
     this.loadMenuMet();
     this.cargaMisListadoAvisoMeteoro();
  }

  ionViewWillEnter(){

    // inject desde main a app.component
    this.storageService.hiddenButtonApp({
      main: true,
      search: true,
      share:true
    });


    //this.datacheck=[{name:'Mostrar los avisos meteorólogicos del país', selected:false}]
    this.datacheck=[{name:'Ver avisos del país', selected:false}]
    this.avisoMet=[];
    this.nivelesAM=[];
    this.color24hnivel='';
    this.fecha24h='';
    this.getColorNivel24Horas();
    this.loadMenuMet();
    this.cargaMisListadoAvisoMeteoro();
  }

  checkControlEvent(check){
    if(check['selected']){
      this.avisoMet=[];
      this.cargaListadoAvisoMeteoro()
    }else{
      this.avisoMet=[];
      this.cargaMisListadoAvisoMeteoro();
    }
  }

    async cargaMisListadoAvisoMeteoro(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
    });
    
    await loading.present();
  
   this.storageService.getitemGeoposition().then((items0)=>{
      this.itemGP=items0;

      let dep=this.itemGP[0].coddep;
      let prov=this.itemGP[0].codprov;
      this.ciudad=this.itemGP[0].ciudad;
      let lat=this.itemGP[0].lat;
      let long=this.itemGP[0].long;


      this.avisoMet=[];
      this.avisoMeteoro.getAvisoMetIDESEPLatLon(lat, long).subscribe((dato) => {
        this.ametideseptemp=JSON.parse(dato.data);
        if(this.ametideseptemp.length<=0 || this.ametideseptemp.length==null){
          this.avisoMet=[];
        }else{
          this.ametidesep=this.ametideseptemp.filter(function(filtr) {
             return (filtr.nivel>1);}) 
            this.ametideseptemp=[];

            if(this.ametidesep.length<=0 || this.ametidesep.length==null){
              this.avisoMet=[];
            }else{
              this.avisoMeteoro.getListaAvisoMeteoroGeoposicion(dep,prov,'')
            .subscribe(async (listaavisomet) =>{
                
              if(listaavisomet.data!=null){
                this.avisoMet=[];
                this.avisoMetAuxNivel=[];
                this.avisoMetAuxNivel=JSON.parse(listaavisomet.data);
                this.avisoMetAuxNivel.map(reaA=>{
                  this.ametidesep.map(res=>{
                    if (Number(reaA.numero)===res.nroAviso){
                      reaA.codNivel=res.nivel.toString()
                      this.avisoMet.push(reaA);
                      
                    }
                  })
                })

                this.avisoMet=Array.from(new Set(this.avisoMet));
            }
              
            },  (error)=>{console.log(error)});

            }
        }
      })    
    })
    await loading.dismiss();
   
  }


  //carga todos los avisos vigentes a nivel nacional
  async cargaListadoAvisoMeteoro(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
    });

    await loading.present();

    this.avisoMet=[];
    this.avisoMeteoro.getListaAvisoMeteoro()
      .subscribe(async (listaavisomet) =>{
        this.avisoMet=[];
        this.avisoMet=JSON.parse(listaavisomet.data);
       
      }, (error)=>{console.log(error)});

      await loading.dismiss();
  }

async openAvisoTextInfo(numero, titulo, fechaemi, fechaaviso, vigencia, descripcion1, nivel , listamapas){

  let infonivel=Number(nivel);
  infonivel--

  let parametros={  'numero': numero,
                    'tituloA': titulo,
                    'fechaemi': fechaemi,
                    'fechaini': fechaaviso,
                    'vigencia': vigencia,
                    'descripcion1': descripcion1,
                    'nivel':infonivel,
                    'latapp': this.itemGP[0].lat,
                    'longapp': this.itemGP[0].long,
                    'listaMapas':listamapas
                  };

    let navigationExtra: NavigationExtras = {
      queryParams:{
        special : JSON.stringify(parametros)
      }
    }

    this.router.navigate(["menu/avisosinfo1"],navigationExtra);
}

  async openModalExtra(url, valmet) {
     
      let variable;
      if(valmet=='avisosmap24h'){
        variable=Avisosmap24hPage
      }

      if(valmet=='avisosmapquebra'){
        variable=AvisosmapquebraPage
      }

      const modal = await this.modalcontroller.create({
      component: variable,
      componentProps: {
        'latapp': this.itemGP[0].lat,
        'longapp': this.itemGP[0].long
      }
    });
    return await modal.present();
  }

  gotoMain() {
    this.router.navigate(['/menu/main']);
  }
  
  getColor(codnivel){

    let nivel=codnivel;
    nivel--;
    return parseInt(nivel) === 0
      ? 'blanco'
      : parseInt(nivel) === 1 
      ? 'amarillo' 
      : parseInt(nivel) === 2
      ? 'naranja' 
      : parseInt(nivel) === 3 
      ? 'rojo' 
      : 'verde'; 
  };

  getAvisoAfectados(d){
    let info=this.nivelesAM.filter(function(filtr) {return filtr.codigo === d;});
    let nivel=info[0].nivel;
    return parseInt(nivel) === 0
      ? 0
      : parseInt(nivel) === 1 
      ? 1 
      : parseInt(nivel) === 2
      ? 1 
      : parseInt(nivel) === 3 
      ? 1 
      : 0; 
  };


  getColor24H(){
    
    return parseInt(this.color24hnivel) === 0
      ? 'blanco'
      : parseInt(this.color24hnivel) === 1 
      ? 'amarillo' 
      : parseInt(this.color24hnivel) === 2
      ? 'naranja' 
      : parseInt(this.color24hnivel) === 3 
      ? 'rojo' 
      : 'blanco'; 
  };

  fechacat(fecha, vigencia){
    let fi=new Date(fecha);
    let ff=new Date(fi.getFullYear(),fi.getMonth(),fi.getDate(),fi.getHours()+vigencia,fi.getMinutes());
    return 'Desde el '+fi.getDate()+' de '+MESESTIEMPO[fi.getMonth()]+' del '+fi.getFullYear()+' hasta el '+
            ff.getDate()+' de '+MESESTIEMPO[ff.getMonth()]+' del '+ff.getFullYear()
  }

  async loadMenuMet(){
    //se obtiene los avisos de 24 horas y activacion de  quebradas
    this.menumetappService.getMenuMetApp().pipe(
      catchError(e => {
        return throwError(e)
        })
    ).subscribe(reponse => {
      if (reponse.body==null){
      }else{

        this.pagesMet= reponse.body;
      }
    })
  }

  async getColorNivel24Horas(){
      this.storageService.getitemGeoposition().then((items0)=>{
        this.itemGP=items0;
       
        this.wmssenamhi.getInfoAvisos(2,'g_prono_pp_24h:view_aviso24h',this.itemGP[0].lat,this.itemGP[0].long)
          .subscribe((response)=>{
            let obj = JSON.parse(response.data);
            let data = obj['features'];
            let resultado;
            
            data.map(element => {
              let dato=element['properties'].nivel;
              let fechmod=new Date(element['properties'].fecha);
              let niveli=dato.slice(-1);
              if(Number(niveli)){
                niveli=Number(niveli)-2;
                if(niveli<0){
                  niveli=0;  
                }
                resultado=niveli;
              }else{
                resultado=0
              }
              this.fecha24h=fechmod.getDate()+'/'+(fechmod.getMonth()+1)+'/'+fechmod.getFullYear();
              this.color24hnivel=resultado; 
              
            });
            
         });
       });
  }
}  