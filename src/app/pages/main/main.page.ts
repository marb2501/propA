import { Component, ViewChild } from '@angular/core';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, IonSlides } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import {
  senammincu,
  termomax,
  temperatura,
  humedad,
  viento,
  termomin,
  precipita,
  previous,
  next,
  humedadD,
  precipitaD,
  rutaiconoD,
  rutaiconoN,
  accordionmain1,
  accordionmain2
} from '../../globales';
import { ApiService } from '../../services/api.service';
import { AvisometeoroService } from '../../services/avisometeoro.service';
import { StorageService, Geolocaposicion } from '../../services/storage.service';
import { Avisosmethidg } from '../../models/avisosmethidg.model';
import { locationsMain} from '../../models/locationmain.model';
import { AvisoMeteoroIDESEP } from '../../models/avisometidesep.model';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PopoverController } from '@ionic/angular';
import { PopinfoComponent } from '../../components/popinfo/popinfo.component';
import { AndroidpermisionService } from '../../services/androidpermision.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})

export class MainPage {

  options: GeolocationOptions;
  currentPost: Geoposition;

  public bavisom1:Avisosmethidg[];
  public bavisom1temp:Avisosmethidg[];
  public bavisom2:Avisosmethidg[];
 
  public avisosmethidg:Avisosmethidg[];
  public bavisom2temp:Avisosmethidg[];

  public ametideseptemp:AvisoMeteoroIDESEP[];
  public ametidesep:AvisoMeteoroIDESEP[];

  itemGPMain:  Geolocaposicion[]=[];
  newitemGP:  Geolocaposicion=<Geolocaposicion>{};
  selectedTheme:String;

  fechaactual;

  flagAccordionA;
  flagAccordionB;
  automaticCloseA = false;
  automaticCloseB = false;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;

  sliderOne: any;

  slideOptions = {
    initialSlide: 0,
    speed: 300,
    autoplayDisableOnInteraction: false,
    autoplay: true
  };

  slideOptionsAviso = {
    initialSlide: 0,
    speed: 500,
    autoplay: true,
    direction:"vertical" ,
    setWrapperSize:true,
    autoHeight:true,
    centeredSlides: true
    };

  constructor(public http: HttpClient,
              private geolocation: Geolocation,
              private api: ApiService,
              private storageService:StorageService,
              public loadingController: LoadingController,
              private iab: InAppBrowser,
              private router:Router,
              public popoverController: PopoverController,
              public _androidpermision:AndroidpermisionService,
              private amet: AvisometeoroService) {
                this.sliderOne =
                {
                  isBeginningSlide: true,
                  isEndSlide: false,
                };

              // inject desde main a app.component
              this.storageService.hiddenButtonApp({
                main: false,
                search: true,
                share:true
            });
          
            this.storageService.getActiveTheme().subscribe(val=>{
              this.storageService.getitemColor().then(a=>{if(a==null){
                this.selectedTheme=val;
            }else{
              this.selectedTheme=a;}})
          })

          this.flagAccordionA = accordionmain1['items'];
          this.flagAccordionA[0].open=true;
          
          this.flagAccordionB = accordionmain2['items'];
          this.flagAccordionB[0].open=true;

          let fa= new Date();
          this.fechaactual=fa.getDate().toString()
  }

  listado: any[];
  listado2: any[];
  listado3: any[];
  indiceData:number=0;
  colorBanner;
    
  locations = new locationsMain;
  logominsiterio = senammincu;
  icontermomax = termomax;
  icontermomin = termomin;
  temperatura = temperatura;
  viento = viento;
  humedad = this.cambiarImagenMain();
  precipita=this.cambiarImagenMain2();
  previo=previous;
  siguiente=next;
  mensajenoaviso="No registra avisos según su ubicación";
   
  //////////al ingresa al app////////////////  
  ionViewWillEnter(){

    // inject desde main a app.component
    this.storageService.hiddenButtonApp({
      main: false,
      search: true,
      share:true
    });

    this.loadItemUbicaActEleg().then(()=>{
      this.getReloadCordenadas();
    })

    setInterval(()=>{this.itinialDataCoordenadas()},300000)//300000=5 minutos
  }
  //////////al ingresa al app////////////////

  /////////////////componetes de avisos meteorologicos e hidrologicos
  SlideDidChange(object, slideView)  {
    this.checkIfNavDisabled(object, slideView);
  } 

  ionSlideTouchEnd(slides: IonSlides) {
    slides.startAutoplay();
  }

  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }

   //Call methods to check if slide is first or last to enable disbale navigation  
   checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }

  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }

  async openModal(layer, numero, titulomet, titulohid,fechaavisomet,fechaavisohid , 
                vigencia,tipoaviso, fechaemisionmet, fechaemisionhid, nivel,
                descripcionmet, listamap,codAviso,colorNivel,
                hrEmi,fecFin,estadoAviso,codPlazo,nomPlazo,nomTipoAviso,descrip1,descrip2,rutaImg,
                msgRojo,
                msgNaranja,
                msgAmarillo,
                latEsta,
                lonEsta,
                lugarAfectado) {
    
    let dat=parseInt(nivel);
    if(tipoaviso=="ME"){
      dat--;
    }

    let parametros={  'layer': layer,
                      'numero': numero,
                      'tituloA': titulomet,
                      'fechainimet': fechaavisomet,
                      'fechainihid': fechaavisohid,
                      'vigencia': vigencia,
                      'fechaemisionmet':fechaemisionmet,
                      'fechaemisionhid':fechaemisionhid,
                      'descripcion1':descripcionmet,
                      'nivel':dat,
                      'latapp': this.locations.lat,
                      'longapp' : this.locations.lng,
                      'listaMapas':listamap,
                      'codAviso':codAviso,
                      'tituloAHid':titulohid,
                      'colorNivel':colorNivel, 
                      'hrEmi':hrEmi,
                      'fecFin':fecFin,
                      'estadoAviso':estadoAviso,
                      'codPlazo':codPlazo,
                      'nomPlazo':nomPlazo,
                      'nomTipoAviso':nomTipoAviso,
                      'descrip1':descrip1,
                      'descrip2':descrip2,
                      'rutaImg':rutaImg,
                      'msgRojo':msgRojo,
                      'msgNaranja':msgNaranja,
                      'msgAmarillo':msgAmarillo,
                      'latEsta':latEsta,
                      'lonEsta': lonEsta,
                      'lugarAfectado':lugarAfectado

                  };

    let navigationExtra: NavigationExtras = {
      queryParams:{
        special : JSON.stringify(parametros)
      }
    }
    if(tipoaviso=="ME"){
      this.router.navigate(["menu/avisometinfomain"],navigationExtra);
    }else{
      this.router.navigate(["menu/avisohidinfomain"],navigationExtra);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////recarga de Información del app//////////////////////////////////

  async loadItemUbicaActEleg(){
    this.storageService.getitemGeoposition().then(async items0=>{
      this.itemGPMain=items0;
    })
   }

  async getReloadCordenadas(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      //duration: 4000
    });
    
    await loading.present();
    await this.itinialDataCoordenadas();
    await loading.dismiss();
  }

  async getCordenadasNew() {
    this.locations.lat = this.itemGPMain[0].lat.toString();
    this.locations.lng = this.itemGPMain[0].long.toString();
    this.locations.ciudad= this.itemGPMain[0].ciudad;
    this.locations.AUXciudad= this.itemGPMain[0].ciudad;
       
    this.api.getEstaciones(this.locations.lat, this.locations.lng).subscribe((dato) => {
      let obj2 = dato as any;
      this.listado2=obj2;
      let data2=this.listado2[0];
      let fflagtemp='';
      let fflaghum='';
      let fflagpre='';
      if(data2.flagTemperatura==0){
        fflagtemp="*";
      }
      if(data2.flagHumedad==0){
        fflaghum="*";
      }

      if(data2.flagPrecipitacion==0){
        fflagpre="*";
      }

      if(data2.precipitacion==null){
        this.locations.PRECIPI="--mm/h"
      }else if(data2.precipitacion==0){
        this.locations.PRECIPI="0.0mm/h"
      }else{
        this.locations.PRECIPI=data2.precipitacion+'mm/h'+fflagpre
      }


      this.locations.TEMP = (data2.temperatura==null?"--°C":Math.round(data2.temperatura)+"°C"+fflagtemp) ;
      this.locations.HUME = (data2.humedad==null? "--%":data2.humedad +"%"+fflaghum) ;
      //this.locations.PRECIPI =(data2.precipitacion==0? "0.0mm/h":data2.precipitacion+'mm/h'+fflagpre);
      //this.locations.PRECIPI = (data2.precipitacion==null?"--mm/h":Math.round(data2.precipitacion) + " mm/h") ;
      
      this.locations.nombrestacion = data2.nomEsta;
      this.locations.depestacion=data2.nomDep;
      this.locations.provestacion=data2.nomProv;
      this.locations.distestacion=data2.nomDist;
      this.locations.altitud = data2.altitud+" m";
      this.locations.distancia = Math.round(data2.distancia)+" "+data2.unidad;
      this.locations.hora = data2.fecha
      this.listado2.shift();
    });

    this.api.getCurrentDataTime(this.locations.lat, this.locations.lng).subscribe((dato) => {
      
      let obj = dato as any;
      this.listado = obj['data'];
      let data = obj['data'][0];
      this.locations.titulo = data.HOY;
      this.locations.diaactual = data.NOM_DIA;
      this.locations.tempmax = data.TEMP_MAX + "°";
      this.locations.tempmin = data.TEMP_MIN + "°";
      this.locations.descrip_abre=data.DES_PRON_ABREV
      this.locations.zona=data.ZONA
      this.locations.descrip = data.DES_PRON;
    });

    this.api.getDepProvDist(this.locations.lat, this.locations.lng).subscribe((datow) => {
      let obj = JSON.parse(datow.data);
      const data = obj['features'];

      data.map(element => {
        let nivl=element['properties'].iddist;
        let ubig=nivl;
        let dep=ubig.substr(0,2);
        let prov=ubig.substr(2,2);
        let dist=ubig.slice(-2);

        this.locations.COD_DEP = dep;
        this.locations.COD_PROV = prov;
        this.locations.COD_DIST = dist;
        this.locations.AUXCOD_DEP = dep;
        this.locations.AUXCOD_PROV = prov;
        this.locations.AUXCOD_DIST = dist;

      })

      this.bavisom1=[];
      this.bavisom2=[];
      this.avisosmethidg=[];

      //avisos meteorologicos segun la posicion del usuario (lat/lon)
      this.amet.getAvisoMetIDESEPLatLon(this.locations.lat, this.locations.lng).subscribe((dato) => {
        this.ametideseptemp=JSON.parse(dato.data);


        if(this.ametideseptemp.length<=0 || this.ametideseptemp.length==null){
          this.bavisom1=[];
          this.avisosmethidg=this.bavisom1.concat(this.bavisom2);
          this.indiceData=this.avisosmethidg.length;
        }else{
          this.ametidesep=this.ametideseptemp.filter(function(filtr) {
            let fechini= new Date(filtr.fechaInicio);
            let fecact= new Date();
            let dat2='0'+(Number(fechini.getMonth())+1);
            let dat='0'+(Number(fecact.getMonth())+1);
            
  
            let fechiniAv=fechini.getFullYear()+'-'+dat2.slice(-2)+'-'+fechini.getDate();
            let fechAc=fecact.getFullYear()+'-'+dat.slice(-2)+'-'+fecact.getDate();
            
 
            return (filtr.nivel>1 && (fechiniAv==fechAc));}) 
            this.ametideseptemp=[];

            if(this.ametidesep.length<=0 || this.ametidesep.length==null){
              this.bavisom1=[];
              this.avisosmethidg=this.bavisom1.concat(this.bavisom2);
              this.indiceData=this.avisosmethidg.length;
            }else{
 
              this.amet.getListaAvisoMeteoroGeoposicion(this.locations.COD_DEP,this.locations.COD_PROV, this.locations.COD_DIST)
            .subscribe(async (listaavisomet) =>{

              if(listaavisomet.data!=null){
                this.bavisom1=[];
                this.bavisom1temp=[];
                this.bavisom1temp=JSON.parse(listaavisomet.data);
                this.bavisom1temp.map(reaA=>{
                  this.ametidesep.map(res=>{
                    if (Number(reaA.numero)===res.nroAviso){
                      reaA.codNivel=res.nivel.toString()
                      this.bavisom1.push(reaA);
                      return true
                    }
                  })
                })

                this.bavisom1.reduce((unique,item)=>{
                  return unique.includes(item)?unique : [...unique,item]
                    },[])

                this.avisosmethidg=this.bavisom1.concat(this.bavisom2);
                this.avisosmethidg=Array.from(new Set(this.avisosmethidg));
                this.indiceData=this.avisosmethidg.length;
               
                
            }
              
            }, (error)=>{this.indiceData=0; console.log(error)});

            }
        }
      })

     this.amet.getAvisosHidrologicosLatLong(this.locations.lat, this.locations.lng)
      .subscribe(async (listaavisohid) =>{
        if(listaavisohid.data!=null){
          this.bavisom2temp=[];
          this.bavisom2temp=JSON.parse(listaavisohid.data);
          let infor=this.bavisom2temp.filter(function(filtr) {
            return filtr.lugarAfectado.length>0;
          });
        
          let llave= this.itemGPMain[0].coddep+this.itemGPMain[0].codprov + this.itemGPMain[0].coddist;
          infor.map(elementa => {
            let info=elementa.lugarAfectado;
            let a=0;
            for (let i = 0; i < info.length; i++) {
              let llaveabt=info[i].codDep+info[i].codProv+info[i].codDist;
              if(llaveabt===llave){
                  a=1;
                  break;

              }
            }
    
            if(a==1){
              this.bavisom2.push(elementa);
              a=0;
            }
    
          });

          this.bavisom2.reduce((unique,item)=>{
            return unique.includes(item)?unique : [...unique,item]
              },[])
          
          this.bavisom2temp=[];
          this.bavisom1temp=[];   
          this.avisosmethidg=this.bavisom1.concat(this.bavisom2);
          this.indiceData=this.avisosmethidg.length;
        }
        
      }, (error)=>{this.indiceData=0; console.log(error)});
    });

    
  }
  

  ////////////////////////////componente visual//////////////////////////////////
  
  getColor(d,etiqe){
    let val=parseInt(d);
    if(etiqe=="ME"){
      val--;
    }

    return val === 0
      ? 'blanco' //muy alto
      : val === 1 
      ? 'bannerAvisoAmarillo' //alto
      : val === 2
      ? 'bannerAvisoNaranja' //medio
      : val === 3 
      ? 'bannerAvisoRojo' //bajo
      : 'blanco'; //vacio
  };

  getIconEstacion(d){
    return parseInt(d) === 0
      ? '' 
      : parseInt(d) === 1 
      ? 'navigate-circle-outline' 
      : parseInt(d) === 2
      ? 'rainy-outline' 
      : parseInt(d) === 3 
      ? 'thermometer-outline' 
      : parseInt(d) === 4 
      ? 'water-outline' 
      : ''; //vacio
  };
  
  // CAMBIO DE COLORES SEGUN LA HORA
  getIcono(codigoimg:string){
    if(this.selectedTheme==='dark-theme'){
      return rutaiconoN + codigoimg + ".png";
    }else{
      return rutaiconoD + codigoimg + ".png";
    }
  }

  cambiarImagenMain(){
    if(this.selectedTheme==='dark-theme'){
      return humedad;
    }else{
       return humedadD;
    }
  }

  cambiarImagenMain2(){
     if(this.selectedTheme==='dark-theme'){
       return precipita;
     }else{
        return precipitaD;
     }
  }

  //inicializa ubicacion cuando el sistema abre por primera vez
  async itinialDataCoordenadas(){
    this.options = {
      timeout: 10000,
      maximumAge: 3000,
      enableHighAccuracy: true
    };
    this.bavisom1=[];

    this.geolocation.getCurrentPosition(this.options).then(
      (pos: Geoposition) => {
        if(this.itemGPMain==null || this.itemGPMain.length<=0){
          this.storageService.additemGeoDefault().then(async t=>{
                
            let newItemsInsertGP=<Geolocaposicion>{};
            newItemsInsertGP.id=t.id
            newItemsInsertGP.lat=t.lat
            newItemsInsertGP.long=t.long
            newItemsInsertGP.ciudad=t.ciudad
            newItemsInsertGP.coddep=t.coddep
            newItemsInsertGP.codprov=t.codprov
            newItemsInsertGP.coddist=t.coddist
            this.storageService.additemGeoposition(newItemsInsertGP).then(async resl=>{
              this.itemGPMain=resl
              this.getCordenadasNew();
            })
          })
        }
        this.getCordenadasNew();
        
      }).catch(e=>{
        console.log(e);
        
        this.loadItemUbicaActEleg().then((a)=>{
          if(this.itemGPMain==null || this.itemGPMain.length<=0){
            this._androidpermision.gpsOntAlert().then(i=>{
              this.storageService.additemGeoDefault().then(t=>{
                
                let newItemsInsertGP=<Geolocaposicion>{};
                newItemsInsertGP.id=t.id
                newItemsInsertGP.lat=t.lat
                newItemsInsertGP.long=t.long
                newItemsInsertGP.ciudad=t.ciudad
                newItemsInsertGP.coddep=t.coddep
                newItemsInsertGP.codprov=t.codprov
                newItemsInsertGP.coddist=t.coddist
                this.storageService.additemGeoposition(newItemsInsertGP).then(resl=>{
                  this.itemGPMain=resl
                  this.getCordenadasNew()
                })
              })
            });
          }else{
            this.getCordenadasNew()
          }
        })
      }); 
  }

  doRefresh(e){
    this.getReloadCordenadas();
    e.target.complete();
  }

  videoSENAMHI(){
   this.api.getVideoEstacion().subscribe(et=>{
      let urlvideo=et.data
      if(urlvideo!=""){
        const browser = this.iab.create(urlvideo,'_blank',{location:'no'});
      }else{
        Swal.fire({
          title:'Aviso',
          text:'No se ha registrado el video de estaciones',
          backdrop:false
        });
      }      
   })
  }

  async presentPopover(ev: any, dep:any,prov:any,dist:any,distancia:any,unidad:any, latest:any,lngest:any, nombestacion:any) {
    let data = {dep:dep, prov:prov, dist:dist, distancia:distancia, unidad:unidad,latitud:latest,longitud:lngest,nombest:nombestacion};
    const popover = await this.popoverController.create({
      component: PopinfoComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps:data
    });
    await popover.present();

  }

  redirigiraBusqueda(){
    this.router.navigate(['/menu/search']);
  }

  toogleSectionA(index){
    this.flagAccordionA[index].open =!this.flagAccordionA[index].open;

    if(this.automaticCloseA && this.flagAccordionA[index].open){
      this.flagAccordionA
      .filter((item, itemIndex)=>itemIndex !=index)
      .map(item =>item.open = false);
    }
  }

  toogleSectionB(index){
    this.flagAccordionB[index].open =!this.flagAccordionB[index].open;

    if(this.automaticCloseB && this.flagAccordionB[index].open){
      this.flagAccordionB
      .filter((item, itemIndex)=>itemIndex !=index)
      .map(item =>item.open = false);
    }
  }

}
