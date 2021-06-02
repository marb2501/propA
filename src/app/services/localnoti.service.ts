import { Injectable } from '@angular/core';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { ApiService } from './api.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { StorageService } from './storage.service';
import { AudioManagement } from '@ionic-native/audio-management/ngx';
import { Avisosmethidg } from '../models/avisosmethidg.model';
import { AvisoMeteoroIDESEP } from '../models/avisometidesep.model';
import { locationsMain} from '../models/locationmain.model';
import { AvisometeoroService } from '../services/avisometeoro.service';
import { LocalNtifAVM } from '../models/localntifavm.model';

@Injectable({
  providedIn: 'root'
})
export class LocalnotiService {

  options: GeolocationOptions;
  currentPost: Geoposition;
  listado2: any[];
  cont: any = 0;
  public back:any;
  indiceData:number=0;

  public bavisom1:Avisosmethidg[];
  public bavisom2:Avisosmethidg[];
  public bavisom1temp:Avisosmethidg[];
  public bavisom2temp:Avisosmethidg[];
  public avisosmethidg:Avisosmethidg[];

  public ametideseptemp:AvisoMeteoroIDESEP[];
  public ametidesep:AvisoMeteoroIDESEP[];

  locations = new locationsMain;
  public datListNoti:LocalNtifAVM;
  public argLisNoti=[]
  ideni:number=0;
 
  constructor(private localNot:LocalNotifications,
    private geolocation: Geolocation,
    public api:ApiService,
    private backgroundMode : BackgroundMode,
    private storageS : StorageService,
    public audioman: AudioManagement,
    private amet: AvisometeoroService ) { }

    initialBackMode(){
      this.callFunctions();
    }
  
    public callFunctions(): void{
      this.showNotification();
      this.callInterval();
    }

    public callInterval(): void{
      this.background()
      setInterval(()=>{
        this.cont++;
        //console.log(this.cont);
        this.showNotification()
      },3600000)//3600000
    }

  async showNotification () {

    let active = await this.storageS.isActiveLocalNotifications();

    if(!active){
      console.log('Las notificaciones locales están desactivadas');
      this.localNot.clearAll();
      this.localNot.cancelAll();
      this.argLisNoti=[];
      return true;
    }else{
      this.setAudioMode();
      this.localNot.clearAll();
      this.localNot.cancelAll();
      
      this.localNot.setDefaults({
        vibrate: false,
        sticky:false,
        lockscreen:false,
        foreground:false,
        sound: false, 
        silent: false,
        priority: 2,
        wakeup: true
      });  

      this.options = {
        maximumAge: 3000,
        enableHighAccuracy: true
      };
      this.geolocation.getCurrentPosition(this.options).then(
        (pos: Geoposition) => {
  
          this.api.getEstaciones(pos.coords.latitude, pos.coords.longitude).subscribe(async (dato) => {
            let obj2 = dato as any;
            this.listado2=obj2;
            let data=this.listado2[0];
            let icono:string ='';
            let texto:string='';
            let titulo:string=''; 
            let valor;
            this.argLisNoti=[]
            let hora=new Date(data.fecha);
            let minuto='0'+hora.getMinutes();
            let tiempo=''
            let datoampm=''
            if(hora.getHours()>12){
              datoampm=' pm'
              let cambiotiempo=hora.getHours()-12;
              tiempo=cambiotiempo+datoampm;
            }else{
              datoampm=' am'
              tiempo=hora.getHours()+datoampm;
            }
            
            //let tiempo=hora.getHours()+':'+minuto.slice(-2);

            if(Number(data.temperatura)){
              texto='La temperatura a las '+tiempo+' es: '+Math.round(data.temperatura).toString()+"°C\n"+data.nomDep+'/'+data.nomProv+'/'+data.nomDist+'/'+data.nomEsta+"\n";
              valor=(Math.round(data.temperatura));
              if(valor<0){
                valor=(Math.round(data.temperatura)*-1);
                icono='res://ic_stat__'+valor;
              }else{
                icono='res://ic_stat_'+valor;
              }
              
            }else{
              icono='res://ic_stat___';
              texto="--°C";
            }
  
            titulo='';

            let idf=new Date()
           
            console.log("temperatura")
            this.localNot.schedule({
              id:100,
              text:   texto,
              icon: "file://assets/senamhilogo.png",
              smallIcon: icono,
              title:titulo,
              sticky:true,
              lockscreen:true,
              foreground:true,
              vibrate: false,
              priority: 2,
              sound: 'null',
              silent:false,
              wakeup: false,
              group:'temp'
            
            })
            //this.argLisNoti.push(this.datListNoti)
            //console.log(this.argLisNoti)

            //this.api.getDepProvDist('-3.4999926','-73.0439406').subscribe(async (datow) => {
            this.api.getDepProvDist(pos.coords.latitude, pos.coords.longitude).subscribe((datow) => {
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
    
                })
            })

            //inicializacion de variables para obtener los avisos meteorologicos
            this.bavisom1=[];
            this.bavisom2=[];
            this.avisosmethidg=[];
            //avisos meteorologicos filtrados segun mi posicion -5.291513,-76.2829837
            //this.amet.getAvisoMetIDESEPLatLon('-3.4999926','-73.0439406').subscribe(async (dato) => {
            this.amet.getAvisoMetIDESEPLatLon(pos.coords.latitude, pos.coords.longitude).subscribe((dato) => {
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

                        console.log("ingresando a avisos meteorlogicos")    
                        this.bavisom1.map(fi=>{
                          this.datListNoti=new LocalNtifAVM()
                          let imagen:string="file://assets/senamhinivel"+fi.codNivel.toString()+".png"
                          let nivel:string='';
                          if(fi.codNivel=='1'){
                            nivel="NIVEL AMARILLO:"
                          }

                          if(fi.codNivel=='2'){
                            nivel="NIVEL NARANJA:"
                          }

                          if(fi.codNivel=='3'){
                            nivel="NIVEL ROJO:"
                          }
                      
                          this.datListNoti.text=nivel+' '+fi.nomTitulo
                          this.datListNoti.icon=imagen
                          this.datListNoti.smallIcon='res://ic_notaviso'
                          this.datListNoti.sticky=false
                          this.datListNoti.lockscreen=false
                          this.datListNoti.foreground=false
                          this.datListNoti.vibrate=false
                          this.datListNoti.priority=0
                          this.datListNoti.sound='null'
                          this.datListNoti.silent=false
                          this.datListNoti.wakeup=false
                          this.datListNoti.group='aviso'
                          
                          console.log("aviso meteorolgico")
                          this.localNot.schedule(this.datListNoti)
                          //this.argLisNoti.push(this.datListNoti)
                        })    
                 
                    }
                      
                    }, (error)=>{this.indiceData=0; console.log(error)});
    
                    }
                }
              })

              //avisos hidrologicos filtados segun mi ubicacion -5.291513,-76.2829837
            //this.amet.getAvisosHidrologicosLatLong('-3.4999926','-73.0439406')
            this.amet.getAvisosHidrologicosLatLong(pos.coords.latitude, pos.coords.longitude)
                .subscribe(async (listaavisohid) =>{
                    
                  if(listaavisohid.data!=null){
                    this.bavisom2temp=[];
                    this.bavisom2temp=JSON.parse(listaavisohid.data);
                    let infor=this.bavisom2temp.filter(function(filtr) {
                      return filtr.lugarAfectado.length>0;
                    });
  
                    let llave= this.locations.COD_DEP+this.locations.COD_PROV + this.locations.COD_DIST;
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

                       console.log("ingresando a avisos hidrologicos")     

                    this.bavisom2.map(fi=>{
                      this.datListNoti=new LocalNtifAVM()
                      let imagen:string="file://assets/senamhinivel"+fi.codNivel.toString()+".png"
                      let nivel:string='';
                      if(fi.codNivel=='1'){
                        nivel="NIVEL AMARILLO:"
                      }

                      if(fi.codNivel=='2'){
                        nivel="NIVEL NARANJA:"
                      }

                      if(fi.codNivel=='3'){
                        nivel="NIVEL ROJO:"
                      }
                      
                      this.datListNoti.text=nivel+' '+fi.nomTitulo
                      this.datListNoti.icon=imagen
                      this.datListNoti.smallIcon='res://ic_notaviso'
                      this.datListNoti.sticky=false
                      this.datListNoti.lockscreen=false
                      this.datListNoti.foreground=false
                      this.datListNoti.vibrate=false
                      this.datListNoti.priority=0
                      this.datListNoti.sound='null'
                      this.datListNoti.silent=false
                      this.datListNoti.wakeup=false
                      this.datListNoti.group='aviso'
                      console.log("aviso hidrologico")
                      this.localNot.schedule(this.datListNoti)
                      //this.argLisNoti.push(this.datListNoti)
                    })    
                    this.bavisom2temp=[];
                    this.bavisom1temp=[];   
                 }
                  
            }, (error)=>{this.indiceData=0; console.log(error)});
            //this.localNotification(titulo, texto, icono,this.argLisNoti)
          })
        }).catch((error)=>{
          console.log(error)
          this.bavisom1=[];
          this.bavisom2=[];
          this.bavisom2temp=[];
          this.bavisom1temp=[]; 
          this.avisosmethidg=[]
          this.indiceData=0
        })
      }
    }

    public background(): void{
      this.backgroundMode.enable();
      this.backgroundMode.disableWebViewOptimizations();
      this.backgroundMode.disableBatteryOptimizations();
      this.backgroundMode.setDefaults({ hidden: true, silent: true });
      this.backgroundMode.wakeUp();
      this.back = this.backgroundMode.on("activate").subscribe((data)=>{
      this.backgroundMode.disableWebViewOptimizations();
      this.backgroundMode.disableBatteryOptimizations();
      })
    }

    setAudioMode() {
      this.audioman.setAudioMode(AudioManagement.AudioMode.SILENT)
        .then(() => {
         console.log('Device audio mode is now SILENT');
        })
        .catch((reason) => {
          console.log(reason);
        });
     }


}
