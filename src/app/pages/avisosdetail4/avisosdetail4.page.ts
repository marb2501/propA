import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { AvisometeoroService } from '../../services/avisometeoro.service';
import { StorageService, Geolocaposicion } from '../../services/storage.service';
import { AvisoHidroEstacion } from '../../models/avisoshidroestacion.model';
import { MESESTIEMPO, accordionposiciontotal, accordionpaistotal} from '../../globales';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AndroidpermisionService } from '../../services/androidpermision.service';

@Component({
  selector: 'app-avisosdetail4',
  templateUrl: './avisosdetail4.page.html',
  styleUrls: ['./avisosdetail4.page.scss'],
})
export class Avisosdetail4Page {

  public avisoHidro: AvisoHidroEstacion[];
  public avisoHidroAll: AvisoHidroEstacion[];
  public avisoHidroTemp: AvisoHidroEstacion[];
  public variab:AvisometeoroService;
  titulolist="Avisos Hidrológicos";
  
  itemGP:  Geolocaposicion[]=[];
  ciudad;
  icono;
  lat;
  lng;
  dep;
  prov;
  distr;
  flagAccordionA;
  flagAccordionB;
  automaticCloseA = false;
  automaticCloseB = false;
  recomendacion;
  //datacheck=[{name:'Mostrar los avisos hidrológicos del país', selected:false}]
  //datacheck=[{name:'Ver avisos del país', selected:false}]

  constructor(private modalcontroller: ModalController, 
    private storageService:StorageService,
    private router:Router,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    public _androidpermision:AndroidpermisionService,
    public avisosHidro: AvisometeoroService ) {

      this.route.queryParams.subscribe(params => {
        if (params && params.special){
          this.icono = params.special
        }else{
          this.icono='assets/images/iconmenu/hidro_sena.svg'
        }
      })

      // inject desde main a app.component
        this.storageService.hiddenButtonApp({
          main: true,
          search: true,
          share:true
        });

        this.flagAccordionA = accordionposiciontotal['items'];
        this.flagAccordionA[0].open=true;
        
        this.flagAccordionB = accordionpaistotal['items'];
        this.flagAccordionB[0].open=true;

        this.variab=avisosHidro;

     }
  
    

    /* checkControlEvent(check){
      if(check['selected']){
        this.storageService.getitemGeoposition().then((items0)=>{
          this.itemGP=items0;
          if(this.itemGP==null || this.itemGP.length<=0){
            this._androidpermision.gpsOntAlert()
          }else{
            this.cargaListadoAvisoHidrolo();
          }
        })
        
      }else{
        this.cargaMisListadoAvisoHidro();
      }
    }*/

  // ngOnInit(){
    //this.datacheck=[{name:'Mostrar los avisos hidrológicos del país', selected:false}]
   // this.datacheck=[{name:'Ver avisos del país', selected:false}]
   /* this.storageService.getitemGeoposition().then((items0)=>{
      this.itemGP=items0;
      if(this.itemGP==null || this.itemGP.length<=0){
        this._androidpermision.gpsOntAlert()
      }else{
        this.cargaListadoAvisoHidrolo();
        this.cargaMisListadoAvisoHidro();
        
      }
    })*/

  // } 


   //carga losa visos vigentes que me correspoende por departameto y provincia
   async cargaMisListadoAvisoHidro(){

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
    });
 

    await loading.present();

   await this.storageService.getitemGeoposition().then(items0=>{
      this.itemGP=items0;
      this.lat=this.itemGP[0].lat;
      this.lng=this.itemGP[0].long;
      this.ciudad=this.itemGP[0].ciudad;
      this.dep=this.itemGP[0].coddep;
      this.prov=this.itemGP[0].codprov;
      this.distr=this.itemGP[0].coddist;
      this.avisoHidro=[];
      this.avisoHidroTemp=[];
  
      this.variab.getAvisosHidrologicosLatLong(this.lat,this.lng)
        .subscribe(async (result) =>{
          this.avisoHidroTemp=JSON.parse(result.data);
          let infor=this.avisoHidroTemp.filter(function(filtr) {
            return filtr.lugarAfectado.length>0;
          });

          let llave=this.dep+this.prov+this.distr;
          infor.map(async element => {
            let info=element.lugarAfectado;
            let a=0;
            for (let i = 0; i < info.length; i++) {
              let llaveabt=info[i].codDep+info[i].codProv+info[i].codDist;
              if(llaveabt===llave){
                  a=1;
                  break;
              }
            }
    
            if(a==1){
              this.avisoHidro.push(element);
              a=0;
            }
    
          });

          if( this.avisoHidro.length>1){
            this.avisoHidro.reduce((unique,item)=>{
              return unique.includes(item)?unique : [...unique,item]
            },[])
          }
          this.dep='';
          this.prov='';
          this.distr='';
          this.avisoHidroTemp=[];

      }, (error)=>{console.log(error)});         
    }).catch(e=>{
      this._androidpermision.gpsOntAlert();
    })
    await loading.dismiss();
  }

  ionViewWillEnter(){

      // inject desde main a app.component
      this.storageService.hiddenButtonApp({
        main: true,
        search: true,
        share:true
      });

      this.avisoHidro=[];
      this.avisoHidroAll=[];
      this.avisoHidroTemp=[];

    //this.datacheck=[{name:'Mostrar los avisos hidrológicos del país', selected:false}]
    //this.datacheck=[{name:'Ver avisos del país', selected:false}]
    this.storageService.getitemGeoposition().then((items0)=>{
      this.itemGP=items0;
      if(this.itemGP==null || this.itemGP.length<=0){
        this._androidpermision.gpsOntAlert()
      }else{
      
        

        this.cargaListadoAvisoHidrolo();
        
        this.cargaMisListadoAvisoHidro();

      }
    })

  }

  //carga todos los avisos vigentes a nivel nacional
  async cargaListadoAvisoHidrolo(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      //duration: 2000
    });
    
    await loading.present();

    this.avisoHidroAll=[];
    this.variab.getAvisosHidrologicos().subscribe(async (result) =>{
        this.avisoHidroAll=JSON.parse(result.data);
        }, (error)=>{console.log(error)});
      await loading.dismiss();
    
  }

  async openAvisoTextInfo(codAviso, codNivel, colorNivel, colorHexa, fecEmi,
    hrEmi, nomTitulo, fecIni, fecFin,codPlazo, nomPlazo, descrip1,
    descrip2,rutaImg, msgRojo, msgNaranja,msgAmarillo, lugarafectado, codEsta,latEsta, lonEsta, altitudEsta, 
    depEsta, provEsta, distEsta){

      let parametros={'codAviso': codAviso,
                      'codNivel': codNivel,
                      'colorNivel': colorNivel,
                      'colorHexa': colorHexa,
                      'fecEmi':fecEmi,
                      'hrEmi':hrEmi,
                      'nomTitulo':nomTitulo,
                      'fecIni':fecIni,
                      'fecFin':fecFin,
                      'codPlazo':codPlazo,
                      'nomPlazo':nomPlazo,
                      'descrip1':descrip1,
                      'descrip2':descrip2,
                      'rutaImg':rutaImg,
                      'msgRojo':msgRojo,
                      'msgNaranja':msgNaranja,
                      'msgAmarillo':msgAmarillo,
                      'lugarafectado':lugarafectado,
                      'codEsta':codEsta,
                      'latEsta':latEsta,
                      'lonEsta':lonEsta,
                      'altitudEsta':altitudEsta,
                      'depEsta':depEsta,
                      'provEsta':provEsta,
                      'distEsta':distEsta,
                      'lat':this.lat,
                      'lng':this.lng
                   };
  
      let navigationExtra: NavigationExtras = {
        queryParams:{
          special : JSON.stringify(parametros)
        }
      }
 
      this.router.navigate(["menu/avisosinfo4"],navigationExtra);
     
    
  }


  getColor(d){
    return parseInt(d) === 0
      ? 'blanco' //muy alto
      : parseInt(d) === 1 
      ? 'amarillo' //alto
      : parseInt(d) === 2
      ? 'naranja' //medio
      : parseInt(d) === 3 
      ? 'rojo' //bajo
      : 'blanco'; //vacio
  };

  fechacat(fecha1, fecha2){
    let fi=new Date(fecha1);
    let ff=new Date(fecha2);
    return 'Desde el '+fi.getDate()+' de '+MESESTIEMPO[fi.getMonth()]+' del '+fi.getFullYear()+' hasta el '+
            ff.getDate()+' de '+MESESTIEMPO[ff.getMonth()]+' del '+ff.getFullYear()
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
