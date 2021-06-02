import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService, FavoritosBR} from '../../services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { ToastController, IonList} from '@ionic/angular';
import { LocalnotiService } from '../../services/localnoti.service';
import { AndroidpermisionService } from '../../services/androidpermision.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit{

  itemFR:  FavoritosBR[]=[];
  selectedTheme:String;
  darkmode:boolean=false;
  public theme: BehaviorSubject<String>;
  titulolist="Configuración y Ajustes";
  //newitemFR:  FavoritosBR=<FavoritosBR>{};
  icono;
  enabledLocal: boolean;
  enabledExternal: boolean;
  flagvali;
  
  @ViewChild('myList3',{static:true})myList3:IonList;

  constructor(public settings:StorageService,  
              private toast:ToastController,
              private route: ActivatedRoute,
              private localSe:LocalnotiService, 
              public _androidpermision:AndroidpermisionService,
              private openNativeSettings: OpenNativeSettings) { 
    
    

    this.settings.getActiveTheme().subscribe(val=>{
      this.settings.getitemColor().then(a=>{if(a==null){
        this.selectedTheme=val;
        this.theme = new BehaviorSubject(val);
      }else{
       this.selectedTheme=a;this.theme = new BehaviorSubject(a);}})
    })

      // inject desde main a app.component
      this.settings.hiddenButtonApp({
        main: true,
        search: true,
        share:true
      });

    this.route.queryParams.subscribe(params => {
      if (params && params.special){
        this.icono = params.special
      }
    })

    this._androidpermision.ValidacionGPSLocation().then(r=>{
     this.flagvali=r;
      if(r==0){
      this._androidpermision.gpsOntAlert()
     }
    });

    this.reloadStatus();
  }

  ngOnInit(){
    //this.loadItemsFR();
    if(this.selectedTheme==='dark-theme'){
      this.darkmode=true
    }else{
      this.darkmode=false
    }
  }

  /*loadItemsFR(){
    this.settings.getitemFavoritos().then(items1=>{
       this.itemFR=items1;
    })
   }   */ 

  toogleAppTheme(){
    if(this.selectedTheme=='dark-theme'){
      this.settings.getitemColor().then((a)=>{
        if(a==null){
          this.settings.setActiveTheme('light-theme')
        }else{
          this.settings.setActiveTheme('light-theme')
        }
      })
    }else{
      this.settings.getitemColor().then((a)=>{
        if(a==null){
          this.settings.setActiveTheme('dark-theme')
        }else{
          this.settings.setActiveTheme('dark-theme')
        }
      })
    }
  }

  segmentChanged(ev){

    if(ev.detail.value==null || ev.detail.value=='' || ev.detail.value=='undefined'){
      this.settings.setActiveTheme('dark-theme')
    }else{
      this.settings.setActiveTheme(ev.detail.value)
    }
  }

 /* async deleteItemFavoritos(item2:FavoritosBR){
    this.settings.deleteitemFavoritos(item2.id).then(it1=>{
      this.showToast('Ubicación favorita eliminada');
      this.myList3.closeSlidingItems()
      this.loadItemsFR();
    })
  }*/

  async showToast(msg){
    const toast = await this.toast.create({
      message: msg,
      duration:2000
    });

    toast.present();

  }

  openModificaNot(){
    this.openNativeSettings.open('notification_id').then();
  }

  changeLocal(evt){
    this.settings.saveStatusLocalNotification(evt.detail.checked);
    this.showToast('Notificaciones Locales ' + (evt.detail.checked? 'Activadas' : 'Desactivadas'));
    this.localSe.callFunctions();
  }

  /*changeExternal(evt){
    this.settings.saveStatusExternalNotification(evt.detail.checked);
    this.showToast('Notificaciones Externas ' + (evt.detail.checked? 'Activadas' : 'Desactivadas'));
  }*/

  async reloadStatus(){
    this.enabledLocal = await this.settings.isActiveLocalNotifications();
    //this.enabledExternal = await this.settings.isActiveExternalNotifications();
  }

  ionViewWillEnter(){
     // inject desde main a app.component
     this.settings.hiddenButtonApp({
      main: true,
      search: true,
      share:true
    });
  } 
 
}
