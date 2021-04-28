import { Component, ViewChild } from '@angular/core';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ApiService } from '../../services/api.service';
import { NominatimResponse } from '../../models/nominatimresponse.model';
import { LoadingController, Platform, ToastController, IonList} from '@ionic/angular';
import { StorageService, Geolocaposicion, FavoritosBR, BusquedaR } from '../../services/storage.service';
import { iMgsearchA, iMgsearchB } from '../../globales';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {

  itemGP:  Geolocaposicion[]=[];
  itemFR:  FavoritosBR[]=[];
  itemBR:  BusquedaR[]=[]; 

  newitemGP:  Geolocaposicion=<Geolocaposicion>{};
  newitemFR:  FavoritosBR=<FavoritosBR>{};
  newitemBR:  BusquedaR=<BusquedaR>{}; 

  titulolist="Búsqueda"
  selectedAddress=null;
  searchResults: NominatimResponse[];

  options: GeolocationOptions;
  optionsNative: NativeGeocoderOptions;
  currentPost: Geoposition;

  indiceData:number=0;
  selectedTheme:String;
  locacionactual:string;

  databack : any;
  rutaback='';
 
  @ViewChild('myList1',{static:true})myList1:IonList;
  @ViewChild('myList2',{static:true})myList2:IonList;
  @ViewChild('myList3',{static:true})myList3:IonList;

  constructor(private api: ApiService, 
              private storageService:StorageService,
              private plat:Platform,
              public router: Router, 
              private toast:ToastController,
              private geolocation: Geolocation,
              private route: ActivatedRoute,
              public loadingController: LoadingController) { 

                this.storageService.getActiveTheme().subscribe(val=>{
                  this.storageService.getitemColor().then(a=>{if(a==null){
                    this.selectedTheme=val;
                  }else{
                    this.selectedTheme=a;}})
                })

                // inject desde main a app.component
            this.storageService.hiddenButtonApp({
                main: true,
                search: false,
                share:false
            });
             

            this.route.queryParams.subscribe(params => {
              this.databack = JSON.parse(params.special);
              this.rutaback=this.databack.urlback
            })

                this.plat.ready().then(()=>{
                   this.loadItemsBR(); 
                   this.loadItemsFR();
                   this.loadItemUbicaActEleg();
                })
              }
   //carga de listas favoritos y recientes          
   loadItemsFR(){
    this.storageService.getitemFavoritos().then(items1=>{
 
      this.itemFR=items1;
    })
   }        

   loadItemsBR(){
    this.storageService.getitemBusquedaR().then(items2=>{
      this.itemBR=items2;
    })
   }

  async loadItemUbicaActEleg(){
    this.storageService.getitemGeoposition().then(async items0=>{
      this.itemGP=items0;
      if(this.itemGP[0]!=undefined){
        if(this.itemGP[0].ciudad=="" || this.itemGP[0].ciudad=='undefined' || this.itemGP[0].ciudad==undefined){
          
          Swal.fire({
            title:'Aviso',
            text:"Requiere actualizar su posición actual.",
            backdrop:false
          });
        }else{
          this.locacionactual=this.itemGP[0].ciudad;
        }
      }
      
    })
   }


  /***************************************************************/
   //agrega datos a la lista de favoritos y busquedas recientes
  async addItemFavoritos(lat,long,ciudad, depart,prov,dist){
    this.newitemFR=null;
    this.newitemFR=<FavoritosBR>{};
     this.newitemFR.id=Date.now();
     this.newitemFR.lat=lat;
     this.newitemFR.long=long;
     this.newitemFR.ciudad=ciudad;
     this.newitemFR.coddep=depart;
     this.newitemFR.codprov=prov;
     this.newitemFR.coddist=dist;

     this.storageService.additemFavoritos(this.newitemFR).then(it=>{
      this.newitemFR=<FavoritosBR>{};
      this.showToast('Se agregó a favoritos.');
      this.loadItemsFR()
     })

   }

  async addItemBusquedaR(lat,long,ciudad, depart,prov,dist){

    this.storageService.deleteallitemBusquedaR();

    this.newitemBR=null;
    this.newitemBR=<BusquedaR>{};
    this.newitemBR.id=Date.now();
    this.newitemBR.lat=lat;
    this.newitemBR.long=long;
    this.newitemBR.ciudad=ciudad;
    this.newitemBR.coddep=depart;
    this.newitemBR.codprov=prov;
    this.newitemBR.coddist=dist;    

    this.storageService.additemBusquedaR(this.newitemBR).then(it=>{
      this.newitemBR=null;
      this.showToast('Se registró como nueva ubicación actual.');
      this.loadItemsBR()
     })
  }

  async addItemUbicaActEleg(lat,long,ciudad, depart,prov,dist){
    this.newitemGP=null;
    this.newitemGP=<Geolocaposicion>{};
    this.newitemGP.id=Date.now();
    this.newitemGP.lat=lat;
    this.newitemGP.long=long;
    this.newitemGP.ciudad=ciudad;
    this.newitemGP.coddep=depart;
    this.newitemGP.codprov=prov;
    this.newitemGP.coddist=dist;

     this.storageService.additemGeoposition(this.newitemGP).then(it=>{
      this.newitemGP=<Geolocaposicion>{};
      this.showToast('Se registró la nueva ubicación.');
      this.loadItemUbicaActEleg();
     })
  }

  /****************************eliminacion de registros**************************/
 async deleteItemUbicaActEleg(item1:Geolocaposicion){
  
    this.storageService.deleteitemGeoposition(item1.id).then(it1=>{
      this.showToast('Cargando...');
      //this.myList1.closeSlidingItems()
      this.loadItemUbicaActEleg();
    })
  }


  
 async deleteItemFavoritos(item2:FavoritosBR){
    this.storageService.deleteitemFavoritos(item2.id).then(it1=>{
      this.showToast('Ubicación favorita eliminada');
      this.myList3.closeSlidingItems()
      this.loadItemsFR();
    })
  }

  async deleteItemBusquedaR(item3:BusquedaR){
    this.storageService.deleteitemBusquedaR(item3.id).then(it1=>{
      this.showToast('Cargando...');
      this.myList2.closeSlidingItems()
      this.loadItemsBR();
    })
  }

  /*************************************************************************/

  async agregaraFavoritos(item:BusquedaR){

    this.newitemFR=null;
    this.newitemFR=<FavoritosBR>{};
    this.newitemFR.id=Date.now();
    this.newitemFR.lat=item.lat;
    this.newitemFR.long=item.long;
    this.newitemFR.ciudad=item.ciudad;
    this.newitemFR.coddep=item.coddep;
    this.newitemFR.codprov=item.codprov;
    this.newitemFR.coddist=item.coddist;

    this.newitemBR=null;
    this.newitemBR=<BusquedaR>{};
    this.newitemBR.id=item.id;
    this.newitemBR.lat=item.lat;
    this.newitemBR.long=item.long;
    this.newitemBR.ciudad=item.ciudad;
    this.newitemBR.coddep=item.coddep;
    this.newitemBR.codprov=item.codprov;
    this.newitemBR.coddist=item.coddist;

    this.storageService.additemFavoritos(this.newitemFR).then(it=>{
      this.newitemFR=<FavoritosBR>{};
      this.showToast('Se agregó a favoritos');
      this.loadItemsFR()
      this.myList3.closeSlidingItems()
     })

    //this.deleteItemBusquedaR(this.newitemBR);
}

selecFavinMiUbicacion(itemFAV:FavoritosBR){
  this.storageService.getitemGeoposition().then((items0:Geolocaposicion[])=>{
    if(items0!=null && items0.length>0){
      this.deleteItemUbicaActEleg(items0[0]);
    }
    
    setTimeout(()=>{

      this.storageService.deleteallitemBusquedaR();

      this.storageService.additemGeoposition(itemFAV).then(it=>{
      this.showToast('Se actualizó la ubicación actual.');
      this.loadItemUbicaActEleg();
    });

    this.storageService.additemBusquedaR(itemFAV).then(it1=>{
      this.loadItemsBR()
     })
  },3000)
   
  })
}

selecBusqinMiUbicacion(itemBR:BusquedaR){
  this.storageService.getitemGeoposition().then((items0:Geolocaposicion[])=>{
    if(items0!=null && items0.length>0){
      this.deleteItemUbicaActEleg(items0[0]);
    }
    
    setTimeout(()=>{this.storageService.additemGeoposition(itemBR).then(it=>{
      this.showToast('Se actualizó la ubicación actual.');
      this.loadItemUbicaActEleg();
    })},3000)
    
  })
}

async retaurarposicion(){

  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Cargando...',
    //duration: 4000
  });
  await loading.present();
  this.options = {
    maximumAge: 3000,
    enableHighAccuracy: true
  };

  this.optionsNative = {
    useLocale: true,
    maxResults: 5
  };

  this.geolocation.getCurrentPosition(this.options).then(
    (pos: Geoposition) => {

      

      this.newitemGP=null;
      this.newitemGP=<Geolocaposicion>{};
      this.newitemGP.id=Date.now();
      this.newitemGP.lat=pos.coords.latitude;
      this.newitemGP.long=pos.coords.longitude;

      this.api.getUbicacionCoordLatLong(pos.coords.latitude, pos.coords.longitude).subscribe((infodata1)=>{
        let data1=infodata1;
        
        this.newitemGP.ciudad=data1[0].display_name;
      })
      
      this.api.getDepProvDist(pos.coords.latitude, pos.coords.longitude).subscribe((datow) => {
        let obj = JSON.parse(datow.data);
        const data = obj['features'];
  
        data.map(element => {
          let nivl=element['properties'].iddist;
          let ubig=nivl;
          let dep=ubig.substr(0,2);
          let prov=ubig.substr(2,2);
          let dist=ubig.slice(-2);
  
          this.newitemGP.coddep= dep;
          this.newitemGP.codprov= prov;
          this.newitemGP.coddist= dist;
        })
      })

      this.storageService.getitemGeoposition().then((items0:Geolocaposicion[])=>{
        if(items0!=null && items0.length>0){
          this.storageService.deleteAllGeoposition();
        }
      })

      setTimeout(()=>{
        this.storageService.deleteallitemBusquedaR();

        this.storageService.additemGeoposition(this.newitemGP).then(it=>{
        this.newitemGP=<Geolocaposicion>{};
        this.showToast('Se restauró la ubicación actual.');
        this.loadItemUbicaActEleg();
       });

       this.storageService.additemBusquedaR(this.newitemGP).then(it1=>{
        this.loadItemsBR()
       })
      

      
      },2000)

       // this.addItemBusquedaR(latinueva,longnueva,ciudad,dep,prov,dist);


    }); 

    await loading.dismiss();
}

  /**/
   //cuadno seleccionar una ubicacion desde el search
   async getNuevasCordenadas(latinueva, longnueva, omsid, nombredata) {
     //elimino mi ubicacion actual
  
    this.api.getInfoSearchOMS(omsid).subscribe((infodata)=>{
      let data=infodata;
      let ubigeo=data.extratags['pe:ubigeo'];
      let ciudad=data.address[1].localname+'/'+data.extratags['wikipedia'].slice(3);
      let dep = ubigeo.slice(0,2);
      let prov = ubigeo.slice(2).slice(0,2);
      let dist = ubigeo.slice(-2);
      this.addItemUbicaActEleg(latinueva,longnueva,ciudad,dep,prov,dist);
      this.addItemBusquedaR(latinueva,longnueva,ciudad,dep,prov,dist);


    },(error)=>{
     let ciudad=nombredata;
     this.api.getDepProvDist(latinueva, longnueva).subscribe((datow) => {
      let obj = JSON.parse(datow.data);
      const data = obj['features'];

      data.map(element => {
        let nivl=element['properties'].iddist;
        let ubig=nivl;
        let dep=ubig.substr(0,2);
        let prov=ubig.substr(2,2);
        let dist=ubig.slice(-2);

        this.addItemUbicaActEleg(latinueva,longnueva,ciudad,dep,prov,dist);
        this.addItemBusquedaR(latinueva,longnueva,ciudad,dep,prov,dist);
      })
    })

      /*this.api.getCurrentTemperature( latinueva, longnueva).subscribe((dato) => {
        let obj = dato as any;
        let data = obj['data'][0];
        let dep= data.COD_DEP;
        let prov= data.COD_PROV;
        let dist= data.COD_DIST;
        this.addItemUbicaActEleg(latinueva,longnueva,ciudad,dep,prov,dist);
        this.addItemBusquedaR(latinueva,longnueva,ciudad,dep,prov,dist);
      })*/

    })
  }

  /****OK***/

  selectAddress(address:any){
    //this.selectedAddress=address.displayName;
    this.searchResults = null;
    this.storageService.getitemGeoposition().then((items0:Geolocaposicion[])=>{
      if(items0!=null && items0.length>0){
        this.deleteItemUbicaActEleg(items0[0]);
      }
    })
    this.loadItemUbicaActEleg(); 
    this.getNuevasCordenadas(address.latitude, address.longitude, address.omsid, address.displayName)   
  }

  addressSearch(event:any) {
    let searchTerm=event.detail.value.toLowerCase();
    if(this.selectedAddress!=searchTerm){
      if(searchTerm && searchTerm.length>0){
        this.api.addressLookup(searchTerm).subscribe(results => {
          this.searchResults = results;
        });
      }else{
        this.searchResults = null;
      }
    }else{
      this.searchResults = null;
    }
  }
 
  async showToast(msg){
    const toast = await this.toast.create({
      message: msg,
      duration:2000
    });

    toast.present();

  }

  //elimina todos lo registros almacenados en al app (drop store)
  borrartodo(){
    this.storageService.borrartodo();
  }
  //
  getimageBoton(){
    if(this.selectedTheme==='dark-theme'){
      return iMgsearchB ;
    }else{
      return iMgsearchA ;
    }
  }
  
  //retorno anterior
  retornoPaginaAnterior(){
    let infor=this.rutaback.substr(0, this.rutaback.indexOf('?')); 

    if(infor==''){
      this.router.navigate(['/menu/main']);
    }else{
      if(infor=='/menu/avisosinfo1'){
        this.router.navigate(['/menu/avisosdetail1']);
      }else if(infor=='/menu/avisosinfo4'){
        this.router.navigate(['/menu/avisosdetail4']);
      }else if(infor=='/menu/avisometinfomain' || infor=='/menu/avisohidinfomain'){
        this.router.navigate(['/menu/main']);  
      }else{
        this.router.navigate([infor]);
      }
    }

    
  }

}
