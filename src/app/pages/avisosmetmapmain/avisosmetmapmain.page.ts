import { Component, Input  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { NavParams } from '@ionic/angular';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { Map, tileLayer, marker, control, icon, DomUtil, popup} from 'leaflet';
import { previous, iconmarker, leyendaavisosmet,leyendarecavisosmet, urlMapaLealeft,
  urlIDESEPDepart,urlIDESEPProv , urlIDESEPServMet, mensajeShare1, mensajeShare2, niveltexto} from '../../globales';
import { TipoavisoService } from '../../services/tipoaviso.service';
import { TipoAviso } from '../../models/tipoaviso.model';
import { HttpResponse } from '@angular/common/http';
import { WmssenamhiService } from '../../services/wmssenamhi.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-avisosmetmapmain',
  templateUrl: './avisosmetmapmain.page.html',
  styleUrls: ['./avisosmetmapmain.page.scss'],
})
export class AvisosmetmapmainPage {

  map: Map;
  control: any;
  tiles: any;
  propertyList = [];
  private tipoAviso: TipoAviso[];
  public data: any;
  options: GeolocationOptions;
  currentPost: Geoposition;
  titulomodal:string;
  tituloaviso:string;
  etiqueta:string;
  previo=previous;
  fechareg;
  fechactualreg;
  anioref;
  dias;

  viewparams='';

  @Input() layer: string;
  @Input() numero: string;
  @Input() tituloA: string;
  @Input() fechainicio: string;
  @Input() fecharef: string;
  @Input() vigencia: number;
  @Input() lat: string;
  @Input() lng: string;
  @Input() variable: string;
  @Input() nivelaviso: string;
  @Input() nivelmapa: string;
  @Input() descripcionmapa: string;

  constructor(private modalcontroler: ModalController, private socialSharing: SocialSharing, 
    private screenshot: Screenshot, private geolocation: Geolocation, 
    public tavisomp1: TipoavisoService,
    public wmssenamhi:WmssenamhiService,
    private navParams: NavParams) {
     
      this.etiqueta=navParams.get('layer');
      this.titulomodal=navParams.get('numero');
      this.tituloaviso=navParams.get('tituloA');
      this.fechainicio=navParams.get('fechaini');
      this.vigencia=navParams.get('vigencia');
      this.fecharef=navParams.get('fecharef');
      this.lat=navParams.get('latapp');
      this.lng=navParams.get('longapp');

      this.fechareg=this.fecharef.split('-');

      let anioaviso=new Date(this.fechainicio);

      this.fechactualreg=this.fechareg[2]+'/'+this.fechareg[1]+'/'+this.fechareg[0];
      this.anioref=this.fechareg[0];

      this.anioref=anioaviso.getFullYear();
      this.variable=navParams.get('variable');
      this.nivelaviso=navParams.get('nivelaviso');
      this.nivelmapa=navParams.get('nivel');
      this.descripcionmapa=navParams.get('descripcion');

      this.tavisomp1.getTipoAviso(this.etiqueta)
      .subscribe(async (listataviso: HttpResponse<TipoAviso[]>) =>{
        this.tipoAviso=listataviso.body;
       
      }, (error)=>{console.log(error)});

     }

  async  closeModal() {
      await this.modalcontroler.dismiss();
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
          
          
        });
  }
  
  async ionViewDidEnter() {

    this.options = {
      enableHighAccuracy: true
    };

    this.etiqueta=this.tipoAviso['layer'];
    //obteniendo el layer correspondiente
   
    const routesmap = tileLayer(urlMapaLealeft, {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      detectRetina: true
    });

    const departamento = tileLayer.wms(urlIDESEPDepart, {
      layers: 'g_00_02:00_02_002_03_000_000_0000_00_00',
      format: 'image/png',
      transparent: true,
      detectRetina: true
    });

    const provincia = tileLayer.wms(urlIDESEPProv, {
      layers: 'g_00_02:00_02_003_03_000_000_0000_00_00',
      format: 'image/png',
      transparent: true,
      detectRetina: true
    });

    this.viewparams='viewparams=qry:' + this.titulomodal + '_' + this.variable + '_' + this.anioref;
    
    const etiquetaAvisoM = tileLayer.wms(urlIDESEPServMet+'?'+this.viewparams, {
      layers: this.etiqueta,
      format: 'image/png',
      transparent: true,
      detectRetina: true,
      opacity: 0.5
    });

    const overlays = {
      /*Layer: capalayer,*/
      AvisoMeterologico: etiquetaAvisoM,
      Departamento:departamento,
      Provincia:provincia
    };

          
        this.map = new Map('avisometeoro', {center: [ this.lat, this.lng ],
          zoom: 6,
          maxZoom: 100,
          minZoom: 6,
          layers: [routesmap, etiquetaAvisoM, departamento, provincia]}
        ).setView([ this.lat, this.lng ], 10);

        
    
        control.layers(null, overlays, {
          collapsed: true,
          position: 'topright'
        }).addTo(this.map);
    
        //Información de mi posición
        let containerPotin1  = this.map.latLngToContainerPoint([this.lat,this.lng], this.map.getZoom());
         let size1 = this.map.getSize();
         let bounds1 = this.map.getBounds();
         let sw1 = bounds1.getSouthWest();
         let ne1 = bounds1.getNorthEast();

        this.wmssenamhi.getInfoAvisosB(1,this.viewparams,this.etiqueta,this.lat,this.lng,this.lat,this.lng,size1.x, size1.y,containerPotin1.x ,containerPotin1.y)
        .subscribe((response)=>{
          let cabresl ="<table class='estilotabla'><tr><th>Información de Aviso</th></tr>";
          let ob1j = JSON.parse(response.data);
          let a=0;
          let data = ob1j['features'];
          let infotab=''
          data.forEach(element => {
            let dato=element['properties'].nivel;
            let niveli=dato.slice(-1);
            if(Number(niveli)){
              niveli=Number(niveli)-1
              a=1;
            }else{
              niveli=0
              dato="NORMAL";
            }
            infotab="<tr><td>"+niveltexto[niveli]+":"+leyendaavisosmet[niveli]+"</td></tr>";
            infotab+="<tr><td>Recomendación:"+leyendarecavisosmet[niveli]+"</td></tr>";
          });
          if(a==0){
            infotab="<tr><td>NORMAL:"+leyendaavisosmet[a]+"</td></tr>";
            infotab+="<tr><td>Recomendación:"+leyendarecavisosmet[a]+"</td></tr>";
          }

          cabresl+=infotab+"</table>";

          let pop= popup();
          pop=popup().setLatLng([this.lat, this.lng ])
                      .setContent(cabresl);                          
          pop.openOn(this.map); 

        });


        //POPUP EN EL MAPA AL PRESIONAR
        this.map.on('click',(e)=>{

          let containerPotin  = this.map.latLngToContainerPoint(e.latlng, this.map.getZoom());
         
          let bounds = this.map.getBounds();
          let sw = bounds.getSouthWest();
          let ne = bounds.getNorthEast();
          let size = this.map.getSize();
          
         
          let tabalresul ="<table class='estilotabla'><tr><th>Información de Aviso al "+ this.fechactualreg+" </th></tr>";
          this.wmssenamhi.getInfoAvisosB(1,this.viewparams,this.etiqueta,sw.lat,sw.lng,ne.lat,ne.lng,size.x, size.y,containerPotin.x ,containerPotin.y)
          .subscribe((response)=>{
            let obj = JSON.parse(response.data);
            let infotab=''
            const data = obj['features'];
            data.forEach(element => {
              let dato=element['properties'].nivel;
              let niveli=dato.slice(-1);
              if(Number(niveli)){
                niveli=Number(niveli)-1;
                dato=niveltexto[niveli];
              }else{
                niveli=0
                dato="NORMAL";
              }
  
              infotab="<tr><td>"+dato+":"+leyendaavisosmet[niveli]+"</td></tr>";
              infotab+="<tr><td>Recomendación:"+leyendarecavisosmet[niveli]+"</td></tr>";
            });
            
            tabalresul+=infotab+"</table>";
            infotab='';
               
            let dato= popup();
            dato=popup()
            .setLatLng(e.latlng)
            .setContent(tabalresul);
              
            dato.openOn(this.map);
          });
        }); 

        const markPoint = marker([this.lat, this.lng ], {
            icon: icon(iconmarker)
          });
        this.map.addLayer(markPoint);
 
         //insercion de boton info
         const botonMap2 = control({ position: "topleft" });  
      
         const datadesc=this.descripcionmapa;
         botonMap2.onAdd = () => {
           const container = DomUtil.create('input');
           container.type="button";
           container.title="No cat";
           container.value = "";
 
           container.style.backgroundColor = 'white';     
           container.style.backgroundSize = "25px 25px";
           container.style.backgroundImage = "url(../assets/images/loop.svg)";
           container.style.width = '30px';
           container.style.height = '29px';
           container.onmouseover = function(){
             container.style.backgroundColor = 'pink'; 
           }
           container.onmouseout = function(){
             container.style.backgroundColor = 'white'; 
           }
       
           container.onclick = function(){
            Swal.fire({
              title:'Aviso',
              text:datadesc,
              backdrop:false
            });
             
           }
       
           return container;
         };
     
         botonMap2.addTo(this.map);
    
  }

  ionViewWillLeave() {
    this.map.remove();
  }

  getColor(d){
    return d === 0
      ? "#ffffff"
      : d === 1 
      ? "#FFFF00"
      : d === 2
      ? "#ffa500"
      : d === 3 
      ? "#f53d3d"
      : "#ffc409";
  };

  textoNivel(d){
    return parseInt(d) === 0
    ? 'NORMAL' //muy alto
    : parseInt(d) === 1 
    ? 'LEVE' //alto
    : parseInt(d) === 2
    ? 'MODERADO' //medio
    : parseInt(d) === 3 
    ? 'ALTO' //bajo
    : 'NORMAL'; //vacio
  }

}
