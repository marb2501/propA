import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { logosenamhidark, logosenamhiwhite, menuSlide } from '../../globales';
import { MenuappService } from '../../services/menuapp.service';
import { MenuApp } from '../../models/menu.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { StorageService } from '../../services/storage.service';
import Swal from 'sweetalert2';
import { from, of } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit{

  pages: MenuApp[]=[];
  public menuapp:MenuApp[]; 
  selectedTheme:String;


  constructor(public router: Router, public menuappService:MenuappService, 
    private storageService:StorageService,
              private openNativeSettings: OpenNativeSettings, private iab: InAppBrowser) { 

                this.storageService.getActiveTheme().subscribe(val=>{
                  this.storageService.getitemColor().then(a=>{if(a==null){
                    this.selectedTheme=val;
                  }else{
                    this.selectedTheme=a;}})
                })
    
  }

  ngOnInit() {
    this.loadMenu()

  }

  ionViewWillEnter(){
    this.loadMenu()

  }
  
  loadMenu(){
    //this.pages=menuSlide;
    this.menuappService.getMenu1().subscribe((response) =>{
      
      this.menuapp=JSON.parse(response.data);
     
       this.pages=this.menuapp;



    }, err=>{
      //alert(JSON.parse(err))
      this.pages=menuSlide;
    });
    
   /* this.menuappService.getMenu1()
    .pipe(catchError( data => of(JSON.stringify(data))))
    .subscribe((data)=>{
    
      alert('subscribe : ' + JSON.stringify(data));
    }
     )*/

    /*this.menuappService.getMenu().pipe(
      catchError(e => {
    
        this.pages=menuSlide; 

        return throwError(e)
        })
    ).subscribe(reponse => {
      if (reponse.body==null){
        this.pages=menuSlide;
         
      }else{
        
        if (reponse.body.length>0){
           this.pages= reponse.body; 
        }else{
          this.pages=menuSlide;
        }
      }
    })*/
  }

 
  doRefresh(event){
    setTimeout(() => {
      this.loadMenu();
      event.target.complete();
    }, 1500);
  }

  navegar(ruta: string, flagser: number, subchil: string, icon:string ) {
    if (flagser == 1) {
      const browser = this.iab.create(ruta,'_blank',{location:'no'});
    } else {

      let navigationExtras:NavigationExtras= {
        queryParams:{
          special:'assets/images/iconmenu/'+icon+'.svg'
        }
      }

      this.router.navigate([ruta],navigationExtras);
    }
  }

  

  abrirConfiguracion(setting){
    this.openNativeSettings.open(setting).then();
  }

  closeApp(){
      Swal.fire({
        title:'Aviso',
        text: '¿Desea cerrar el App Institucional SENAMHI?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: `Si`,
        cancelButtonText: `No`, 
        backdrop:false
      }).then((result) => {

        if (result.isConfirmed) {
          navigator["app"].exitApp();
        } else if (result.isDenied) {
          
        }
      })
  }
  
 getIcon(icon){
   return 'assets/images/iconmenu/'+icon+'.svg';
 }

 getimageLogo(){
  if(this.selectedTheme==='dark-theme'){
    return logosenamhiwhite ;
  }else{
    return logosenamhidark ;
  }

 }

}
