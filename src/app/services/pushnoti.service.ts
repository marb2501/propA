import { Injectable, EventEmitter } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { IdFireBaseGoogle, IdOneSignal } from '../globales';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { WmssenamhiService } from './wmssenamhi.service';
import { ApiService } from './api.service';
import { Lugarafectado } from '../models/lugarafectado.model';
import { AvisoMeteoroIDESEP } from '../models/avisometidesep.model';

@Injectable({
  providedIn: 'root'
})
export class PushnotiService {

  mensajes: OSNotificationPayload[] = [];
  userId: string;
  pushListener = new EventEmitter<OSNotificationPayload>();
  options: GeolocationOptions;
  currentPost: Geoposition;
  flagapertura=0;
  lafectado: Lugarafectado[] = [];

  public ametideseptemp:AvisoMeteoroIDESEP[];
  public ametidesep:AvisoMeteoroIDESEP[];

  constructor(private oneSignal: OneSignal,
              public platform: Platform,
              private storage: Storage,
              private alertCtrl: AlertController, 
              private router: Router,
              private geolocation: Geolocation,
              public serviciowmsSenamhi: WmssenamhiService,
              private api: ApiService, 
              public http: HttpClient) { }
  
  locations = 
  {
    "lat": '',
    "lng": ''
  };

  async getMensajes() {
    await this.cargarMensajes();
    return [...this.mensajes];
  }

  async AlertMessage(idflagdata, layerflag, titulo, mensaje, tiempoflag, tipoaviso, numeroaviso, anioaviso){
      let idflag= idflagdata;
      let layer= layerflag;
      let aviso=tipoaviso;
      this.ametidesep=[];

      let parametros={ id : idflag, 
                     layer : layer, 
                     lat: this.locations.lat, 
                     lng: this.locations.lng,
                     tipoaviso: aviso,
                     numeroaviso : numeroaviso,
                     anioaviso:anioaviso,
                     tiempo: tiempoflag};

      let navigationExtra: NavigationExtras = {
        queryParams:{
          special : JSON.stringify(parametros)
        }
      }
      this.router.navigate(['menu/alertmap2'],navigationExtra);

      /*let alert = this.alertCtrl.create({
        header: titulo,
        subHeader: mensaje,
        buttons : [{
          text: 'OK', 
          handler: () => {
            this.router.navigate(['menu/alertmap2'],navigationExtra);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },]
       });
      
       (await alert).present();*/
  }

  async AlertMessageHidro(idflagdata, layerflag, titulo, mensaje, tiempoflag, tipoaviso, numeroaviso, codtipaviso){
    let idflag= idflagdata;
    let layer= layerflag;
    let aviso=tipoaviso;
    let numaviso=numeroaviso;
    let sigla=codtipaviso;

    let parametros={ id : idflag, 
                   layer : layer, 
                   lat: this.locations.lat, 
                   lng: this.locations.lng,
                   tipoaviso: aviso,
                   numeroaviso: numaviso,
                   siglaaviso:sigla,
                   tiempo: tiempoflag};

    let navigationExtra: NavigationExtras = {
      queryParams:{
        special : JSON.stringify(parametros)
      }
    }

    this.router.navigate(['menu/alertmaphidro'],navigationExtra);
    /*let alert = this.alertCtrl.create({
      header: titulo,
      subHeader: mensaje,
      buttons : [{
        text: 'OK', 
        handler: () => {
          this.router.navigate(['menu/alertmaphidro'],navigationExtra);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
        
        }
      },]
     });
    
     (await alert).present();*/
}


  async init_notification(){

      if (this.platform.is('cordova')){

        await this.geolocation.getCurrentPosition(this.options).then(
          (pos: Geoposition) => {
            this.locations.lat=pos.coords.latitude.toString();
            this.locations.lng=pos.coords.longitude.toString();
            //this.locations.lat='-7.350462';
            //this.locations.lng='-75.009061';
          });

          this.oneSignal.startInit(IdOneSignal,IdFireBaseGoogle);

          this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

          this.oneSignal.handleNotificationReceived().subscribe((noti) => {
          let idflag= noti.payload.additionalData.flag;
          let layer= noti.payload.additionalData.layer;
          let tiempo = noti.payload.additionalData.time;
          let header= noti.payload.title;
          let subheader = noti.payload.body;
          let fechainiaviso=noti.payload.additionalData.fechainiaviso;
          let vigenciaaviso=noti.payload.additionalData.vigenciaaviso;
          let titulopersavisoesp=noti.payload.additionalData.titulopersavisoesp;
          let titulopersavisoeng=noti.payload.additionalData.titulopersavisoeng;
          let contenidoperesp=noti.payload.additionalData.contenidoperesp;
          let contenidopereng=noti.payload.additionalData.contenidopereng;
          let tipoaviso=noti.payload.additionalData.tipoaviso;
          let siglaaviso=noti.payload.additionalData.siglaaviso;
          let numeroaviso=noti.payload.additionalData.numeroaviso;
          this.flagapertura=1; 

          let auxh=fechainiaviso.substring(0,4);

          //this.notificacionRecibida( noti ); graba la notificaion

          if(siglaaviso!="HI"){
            if(idflag==1){
              this.serviciowmsSenamhi.getAvisoMetIDESEPLatLon(this.locations.lat,this.locations.lng).subscribe((dato) => {
                this.ametideseptemp=JSON.parse(dato.data);
                if(this.ametideseptemp.length>0  && this.ametideseptemp!=null){
                  this.ametidesep=this.ametideseptemp.filter(function(filtr) {
                    let fechini= new Date(filtr.fechaInicio);
                    let fecact= new Date();
                    let dat='0'+(Number(fecact.getMonth())+1);
                    let dat2='0'+(Number(fechini.getMonth())+1);
          
                    let fechiniAv=fechini.getFullYear()+'-'+dat2.slice(-2)+'-'+fechini.getDate();
                    let fechAc=fecact.getFullYear()+'-'+dat.slice(-2)+'-'+fecact.getDate();
         
                    return (filtr.nivel>1 && (fechiniAv==fechAc));}) 
                    this.ametideseptemp=[];
                    this.ametidesep=Array.from(new Set(this.ametidesep));
                    if(this.ametidesep.length>0){
                      this.ametidesep.map(rest=>{
                        if(Number(rest.nroAviso)==numeroaviso){
                          this.AlertMessage(idflag, layer, titulopersavisoesp, contenidoperesp, tiempo, tipoaviso, numeroaviso, auxh);
                          return true;
                        }
                      })
                      
                    }
                }
              })
            }else{
              this.serviciowmsSenamhi.getInfoAvisosPush(idflag,layer,numeroaviso,fechainiaviso,this.locations.lat,this.locations.lng)
              .subscribe((response)=>{
                 let obj = JSON.parse(response.data);
                 const data = obj['features'];
                  data.map(element => {
                    let nivl=element['properties'].nivel;
                    if(Number(nivl.slice(-1))>1){
                      this.AlertMessage(idflag, layer, titulopersavisoesp, contenidoperesp, tiempo, tipoaviso, numeroaviso, auxh);
                      return true;
                    }
                });
               })
            }
          }else{     
           /*this.api.getCurrentTemperature(this.locations.lat,this.locations.lng).subscribe((dato) => {
              let obj = dato as any;
              let data = obj['data'][0];
              let dep= data.COD_DEP;
              let prov= data.COD_PROV;
              let dist= data.COD_DIST;*/
              this.api.getDepProvDist(this.locations.lat,this.locations.lng).subscribe((datow) => {
                let obj = JSON.parse(datow.data);
                const data = obj['features'];
          
                data.map(element => {
                  let llave=element['properties'].iddist;

                  this.serviciowmsSenamhi.getAvisosHidrologicosVigentes(this.locations.lat,this.locations.lng)
                .subscribe((response)=>{
                  let data = JSON.parse(response.data);
                  data.map(element => {
                      if(numeroaviso==element.codAviso){
                        let a=0;
                        let lafectado=element.lugarAfectado;
                        for (let i = 0; i < lafectado.length; i++) {
                          if(lafectado[i].codDep+lafectado[i].codProv+lafectado[i].codDist===llave){
                             a=1;
                              break;
                          }
                        }
                        if(a==1){
                          this.AlertMessageHidro(idflag, layer, titulopersavisoesp, contenidoperesp, tiempo, tipoaviso, numeroaviso, siglaaviso);
                          return true;
                        }
                      }
                  })
                })
              })
            })
          }
         });

        this.oneSignal.handleNotificationOpened().subscribe( async(noti) => {
          // do something when a notification is opened
         //await this.notificacionRecibida( noti.notification ); graba la notificaion

         let idflag= noti.notification.payload.additionalData.flag;
         let layer= noti.notification.payload.additionalData.layer;
         let tiempo = noti.notification.payload.additionalData.time;
         let header= noti.notification.payload.title;
         let subheader = noti.notification.payload.body;
         let fechainiaviso= noti.notification.payload.additionalData.fechainiaviso;
         let vigenciaaviso= noti.notification.payload.additionalData.vigenciaaviso;
         let titulopersavisoesp= noti.notification.payload.additionalData.titulopersavisoesp;
         let titulopersavisoeng= noti.notification.payload.additionalData.titulopersavisoeng;
         let contenidoperesp= noti.notification.payload.additionalData.contenidoperesp;
         let contenidopereng= noti.notification.payload.additionalData.contenidopereng;
         let tipoaviso=noti.notification.payload.additionalData.tipoaviso;
         let siglaaviso=noti.notification.payload.additionalData.siglaaviso;
         let numeroaviso=noti.notification.payload.additionalData.numeroaviso;

         let auxh=fechainiaviso.substring(0,4);
                 

          if (siglaaviso!="HI"){
            if(idflag==1){
              this.serviciowmsSenamhi.getAvisoMetIDESEPLatLon(this.locations.lat,this.locations.lng).subscribe((dato) => {
                this.ametideseptemp=JSON.parse(dato.data);
                if(this.ametideseptemp.length>0  && this.ametideseptemp!=null){
                  this.ametidesep=this.ametideseptemp.filter(function(filtr) {
                    let fechini= new Date(filtr.fechaInicio);
                    let fecact= new Date();
                    let dat='0'+(Number(fecact.getMonth())+1);
                    let dat2='0'+(Number(fechini.getMonth())+1);
          
                    let fechiniAv=fechini.getFullYear()+'-'+dat2.slice(-2)+'-'+fechini.getDate();
                    let fechAc=fecact.getFullYear()+'-'+dat.slice(-2)+'-'+fecact.getDate();
         
                    return (filtr.nivel>1 && (fechiniAv==fechAc));}) 
                    this.ametideseptemp=[];
                    this.ametidesep=Array.from(new Set(this.ametidesep));
                    if(this.ametidesep.length>0){
                      this.ametidesep.map(rest=>{
                        if(Number(rest.nroAviso)==numeroaviso){
                          if ( this.flagapertura==0){
                            this.AlertMessage(idflag, layer, titulopersavisoesp, contenidoperesp, tiempo, tipoaviso, numeroaviso, auxh);
                            return true;
                          }
                        }
                      })
                    }
                }
              })
            }else{
              this.serviciowmsSenamhi.getInfoAvisosPush(idflag,layer,numeroaviso,fechainiaviso,this.locations.lat,this.locations.lng)
              .subscribe((response)=>{
                 let obj = JSON.parse(response.data);
                 const data = obj['features'];
                  data.map(element => {
                    let nivl=element['properties'].nivel;
                    if(Number(nivl.slice(-1))>1){
                      if(this.flagapertura==0){
                        this.AlertMessage(idflag, layer, titulopersavisoesp, contenidoperesp, tiempo, tipoaviso, numeroaviso, auxh);
                        return true;
                      }
                    }
                });
               })
            }
            
          }else{
            this.api.getDepProvDist(this.locations.lat,this.locations.lng).subscribe((datow) => {
              let obj = JSON.parse(datow.data);
              const data = obj['features'];
        
              data.map(element => {
                let llave=element['properties'].iddist;
           /*this.api.getCurrentTemperature(this.locations.lat,this.locations.lng).subscribe((dato) => {
            let obj = dato as any;
            let data = obj['data'][0];
            let dep= data.COD_DEP;
            let prov= data.COD_PROV;
            let dist= data.COD_DIST;
            let llave=dep+prov+dist;*/

            this.serviciowmsSenamhi.getAvisosHidrologicosVigentes(this.locations.lat,this.locations.lng)
              .subscribe((response)=>{
                let data = JSON.parse(response.data);
                data.map(element => {

                    if(numeroaviso==element.codAviso){
                      let a=0;
                      let lafectado=element.lugarAfectado;
                      for (let i = 0; i < lafectado.length; i++) {
                        if(lafectado[i].codDep+lafectado[i].codProv+lafectado[i].codDist===llave){
                         
                           a=1;
                            break;
                        }
                      }
                      
                      if(a==1){
                     
                        if (this.flagapertura==0){
                          this.AlertMessageHidro(idflag, layer, titulopersavisoesp, contenidoperesp, tiempo, tipoaviso, numeroaviso, siglaaviso);
                          return true;
                        }
                        
                      }

                       
                    }
                })
              })
            })
              
          })
   
          }
         });

          this.oneSignal.endInit();
      }else{
        return false;
      }
      return true;
  }  

  async getUserIdOneSignal() {
    console.log('Cargando userId');
    // Obtener ID del suscriptor
    const info = await this.oneSignal.getIds();
    this.userId = info.userId;
    return info.userId;
  }

  async notificacionRecibida( noti: OSNotification ) {

    await this.cargarMensajes();

    const payload = noti.payload;

    const existePush = this.mensajes.find( mensaje => mensaje.notificationID === payload.notificationID );

    if ( existePush ) {
      return;
    }

    this.mensajes.unshift( payload );
    this.pushListener.emit( payload );

    await this.guardarMensajes();

  }

  guardarMensajes() {
    this.storage.set('mensajes', this.mensajes );
  }

  
  async cargarMensajes() {

    this.mensajes =  await this.storage.get('mensajes') || [];

    return this.mensajes;

  }

  async borrarMensajes() {
    await this.storage.clear();
    this.mensajes = [];
    this.guardarMensajes();
  }

  async toggleOneSignalNotifications(activate: boolean) {
    this.oneSignal.deleteTag('disabledtoggle');
    if(!activate){
      this.oneSignal.sendTag('disabledtoggle', '1');
      this.oneSignal.clearOneSignalNotifications();
    }
  }

}
