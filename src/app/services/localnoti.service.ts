import { Injectable } from '@angular/core';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { ApiService } from './api.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { StorageService } from './storage.service';
import { AudioManagement } from '@ionic-native/audio-management/ngx';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LocalnotiService {

  options: GeolocationOptions;
  currentPost: Geoposition;
  listado2: any[];
  cont: any = 0;
  public back:              any;

  constructor(private localNot:LocalNotifications,
    private geolocation: Geolocation,
    public api:ApiService,
    private backgroundMode : BackgroundMode,
    private storageS : StorageService,
    public audioman: AudioManagement ) { }

    initialBackMode(){
      this.callFunctions();
    }
  
    public callFunctions(): void{
      this.showNotification();
      this.callInterval();
      //this.background();  
    }

    public callInterval(): void{
      this.background()
      setInterval(()=>{
        this.cont++;
        //console.log(this.cont);
        this.showNotification()
      },3600000)//3600000
    }

    showNotification () {
  
      this.options = {
        maximumAge: 3000,
        enableHighAccuracy: true
      };
      this.geolocation.getCurrentPosition(this.options).then(
        (pos: Geoposition) => {
  
          this.api.getEstaciones(pos.coords.latitude, pos.coords.longitude).subscribe((dato) => {
            let obj2 = dato as any;
            this.listado2=obj2;
            let data=this.listado2[0];
            let icono ='';
            let texto='';
            let titulo=''; 
            let valor;
            
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
           
            this.localNotification(titulo,texto, icono)
          })
        }).catch((error)=>{
          console.log(error)
        })
    }

    async localNotification(titulo, texto, icono){
      let active = await this.storageS.isActiveLocalNotifications();
      if(!active){
        console.log('Las notificaciones locales están desactivadas');
        this.localNot.clearAll();
        this.localNot.cancelAll();
        return true;
      }else{
        this.setAudioMode();
        this.localNot.setDefaults({
          vibrate: false,
          sticky:true,
          lockscreen:true,
          foreground:true,
          sound: false, 
          silent: false,
          priority: 0,
          wakeup: true
        });

        this.localNot.schedule({
          text:   texto,
          icon: "file://assets/senamhilogo.png",
          smallIcon: icono,
          sticky:true,
          lockscreen:true,
          foreground:true,
          vibrate: false,
          priority: 2,
          sound: '',
          wakeup: false,
          trigger: {
            every:ELocalNotificationTriggerUnit.SECOND
          }
        });
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
