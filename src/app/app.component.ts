import { Component } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { PushnotiService } from './services/pushnoti.service';
import { PopinfoComponent } from './components/popinfo/popinfo.component';
import { AvisoMeteoro } from './models/avisomet.model';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';
import { LocalnotiService } from './services/localnoti.service';
import { NetworkService } from './services/network.service';
import Swal from 'sweetalert2';
import { mensajeShare1, mensajeShare2 } from '../app/globales';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public avisoMetCount: AvisoMeteoro[];
  subscribe:any;
  conteo:number=0;
  selectedTheme:String;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private socialSharing: SocialSharing, 
    private screenshot: Screenshot,
    public _pushProvider: PushnotiService,
    public popoverController: PopoverController,
    public setting: StorageService,
    private router:Router,
    public _localNotifi: LocalnotiService,
    public networks:NetworkService
    
  ) {
    
    this.initializeApp();
  }

  initializeApp() {

    this.setting.getActiveTheme().subscribe(val=>{
      this.setting.getitemColor().then(a=>{if(a==null){this.selectedTheme=val}else{this.selectedTheme=a}})
    })

  
    this.platform.ready().then(() => {
      //this.cargaListadoAvisoMeteoro();
      this.statusBar.styleDefault();
      this.networks.verificarNetwork();
      this._localNotifi.initialBackMode();
      this._pushProvider.init_notification();
      this.splashScreen.hide();
    });
  }


  share(){
    this.screenshot.save('jpg', 80, 'myscreenshot.jpg').then(
       async (res:any)=>{
         let fecha = new Date();
         Swal.fire({
          title:'Aviso',
          text:mensajeShare1,
          backdrop:false
        });
        //alert("La aplicación ha hecho una captura de su pantalla para que pueda compartirla en sus redes sociales.");
         await this.socialSharing.shareWithOptions({
            message: "App Institucional SENAMHI",
            subject: "Imagen capturada a las "+fecha.getDate().toString()
        }).then((result) => {
              
        }, (err) => {
          
        });
         
        }, 
        ()=>{
          Swal.fire({
            title:'Aviso',
            text:mensajeShare2,
            backdrop:false
          });
          //alert("No se habilitó la opción.")
        });
  } 


  async mostrarPopOver(e) {
    const popover = await this.popoverController.create({
      component: PopinfoComponent,
      cssClass: 'my-custom-class',
      event: e,
      mode:"ios",
      
      translucent: true
    });
    return await popover.present();
  }

  gotoMain() {
    this.router.navigate(['/menu/main']);
  }

  gotoSearch() {
    this.router.navigate(['/menu/search']);
  }
  
}
