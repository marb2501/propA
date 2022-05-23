import { Component, Input  } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { Map, tileLayer, marker, control, icon, DomUtil, popup} from 'leaflet';
import { previous, iconmarker, leyendaavisosmet,leyendarecavisosmet,urlMapaLealeft,
  urlIDESEPDepart,urlIDESEPProv , urlIDESEPServMet, mensajeShare1, mensajeShare2, niveltexto} from '../../globales';
import { TipoavisoService } from '../../services/tipoaviso.service';
import { TipoAviso } from '../../models/tipoaviso.model';
import { HttpResponse } from '@angular/common/http';
import { WmssenamhiService } from '../../services/wmssenamhi.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-avisosmap1',
  templateUrl: './avisosmap1.page.html',
  styleUrls: ['./avisosmap1.page.scss'],
})
export class Avisosmap1Page {

  map: Map;
  control: any;
  tiles: any;
  propertyList = [];
  /*tipoAviso: TipoAviso[]=[];
  public tipoAvisotemp: TipoAviso[];*/
  public tipoAviso: TipoAviso[]=[];
    
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
 
  viewparams='';

  @Input() layer: string;
  @Input() numero: string;
  @Input() tituloA: string;
  @Input() fechainicio: string;
  @Input() vigencia: number;
  @Input() latUb: number;
  @Input() lngUb: number;
  @Input() fecharef: string;
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
      this.latUb=Number(navParams.get('latapp'));
      this.lngUb=Number(navParams.get('longapp'));
      this.fecharef=navParams.get('fecharef');
      this.nivelaviso=navParams.get('nivelaviso');

      this.fechareg=this.fecharef.split('-');

      let anioaviso=moment(this.fechainicio, "YYYY-MM-DD hh:mm:ss a ").toDate();

      this.fechactualreg=this.fechareg[2]+'/'+this.fechareg[1]+'/'+this.fechareg[0];
      
      this.anioref=anioaviso.getFullYear();
      this.variable=navParams.get('variable');

      this.nivelmapa=navParams.get('nivel');
      this.descripcionmapa=navParams.get('descripcion');

      this.tavisomp1.getTipoAviso(this.etiqueta)
      .subscribe(async (listataviso: HttpResponse<TipoAviso[]>) =>{
        console.log(listataviso.body);
        this.tipoAviso=listataviso.body;//g_aviso:view_aviso
       
      }, (error)=>{console.log(error)});

     /* this.tavisomp1.getTipoAviso(this.etiqueta)
      .subscribe((response) =>{
         this.tipoAvisotemp=JSON.parse(response.data);
         this.tipoAviso=this.tipoAvisotemp
      }, err=>{
        console.log(err)

      });*/

     }


  async  closeModal() {
    await this.modalcontroler.dismiss();
  }

  share(){
    this.screenshot.save('jpg', 80, 'myscreenshot.jpg').then(
       async (res:any)=>{
         let fecha = moment().toDate();
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
          
          //alert(mensajeShare2)
        });
  }  

  async ionViewDidEnter() {
    
    this.options = {
      enableHighAccuracy: true
    };

    //obteniendo marca si concatena o no
    //this.etiqueta=this.tipoAviso['layer'];
    this.etiqueta="g_aviso:view_aviso";

        
    //obteniendo el layer correspondiente
   
    const routesmap = tileLayer(urlMapaLealeft, {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      detectRetina: false,
      maxZoom: 16
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
    
    let url=urlIDESEPServMet+'?'+this.viewparams;

    const etiquetaAvisoM = tileLayer.wms(url, {
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

    

   await this.geolocation.getCurrentPosition(this.options).then(
      (pos: Geoposition) => {
        this.map = new Map('avisometeoro', {center: [ this.latUb, this.lngUb ],
          zoom: 6,
          maxZoom: 100,
          minZoom: 6,
          layers: [routesmap, etiquetaAvisoM, departamento, provincia]}
        ).setView([ this.latUb, this.lngUb ], 10);
        
    
        control.layers(null, overlays, {
          collapsed: true,
          position: 'topright'
        }).addTo(this.map);
    
          const markPoint = marker([this.latUb, this.lngUb ], {
            icon: icon(iconmarker)
          });
        this.map.addLayer(markPoint);

        //Información de mi posición
         let containerPotin1  = this.map.latLngToContainerPoint([this.latUb,this.lngUb], this.map.getZoom());
         let size1 = this.map.getSize();
         let bounds1 = this.map.getBounds();
         let sw1 = bounds1.getSouthWest();
         let ne1 = bounds1.getNorthEast();

                
        this.wmssenamhi.getInfoAvisosB(1,this.viewparams,this.etiqueta,this.latUb,this.lngUb,this.latUb,this.lngUb,size1.x, size1.y,containerPotin1.x ,containerPotin1.y)
        .subscribe((response)=>{
          let cabresl ="<table class='estilotabla'><tr><th>Información de Aviso al "+ this.fechactualreg+"</th></tr>";
          let ob1j = JSON.parse(response.data);
          let a=0;
          let data = ob1j['features'];
          let infotab=''
          data.forEach(element => {
            let dato=element['properties'].nivel;
            let niveli=dato.slice(-1);
            if(Number(niveli)){
              a=1
              niveli=Number(niveli)-1;
            }else{
              niveli=0
              dato="NORMAL";
            }
           infotab="<tr><td>"+niveltexto[niveli]+":"+leyendaavisosmet[niveli]+"</td></tr>";
           infotab+="<tr><td>Recomendación:"+leyendarecavisosmet[niveli]+"</td></tr>";
          });
          if(a==0){
            infotab="<tr><td>NORMAL:"+leyendaavisosmet[a]+"</td></tr>";
            infotab+="<tr><td>Recomendación:"+leyendarecavisosmet[0]+"</td></tr>";
          }

          cabresl+=infotab+"</table>";

          let pop= popup();
          pop=popup().setLatLng([this.latUb, this.lngUb ])
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
            let data = obj['features'];
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


    });
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
