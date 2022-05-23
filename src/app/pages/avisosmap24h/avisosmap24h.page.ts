import { Component,Input } from '@angular/core';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { Map, tileLayer, marker, control, icon, DomUtil, popup} from 'leaflet';
import { iconmarker, leyenda24horas,urlMapaLealeft,urlIDESEPDepart,urlIDESEPProv,urlIDESEP24Horas, mensajeShare1, mensajeShare2 } from '../../globales';
import { WmssenamhiService } from '../../services/wmssenamhi.service';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-avisosmap24h',
  templateUrl: './avisosmap24h.page.html',
  styleUrls: ['./avisosmap24h.page.scss'],
})
export class Avisosmap24hPage {

  map: Map;
  control: any;
  tiles: any;
  propertyList = [];
  public data: any;
  options: GeolocationOptions;
  currentPost: Geoposition;
  nivelaviso:any;
  fechaemision:any;
  latMipos:number;
  lngMipos:number;

  @Input() latapp:number;
  @Input() longapp:number;

  constructor(private modalcontroler: ModalController,private geolocation: Geolocation, public wmssenamhiavisoService:WmssenamhiService,
    private navParams: NavParams,
    private socialSharing: SocialSharing, 
    private screenshot: Screenshot) { 
      this.latMipos=Number(navParams.get('latapp'));
      this.lngMipos=Number(navParams.get('longapp'));
    }

  async ionViewDidEnter() {

    this.options = {
      enableHighAccuracy: true
    };

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

    const etiquetaAviso24H = tileLayer.wms(urlIDESEP24Horas, {
      layers: 'g_prono_pp_24h:view_aviso24h',
      format: 'image/png',
      transparent: true,
      detectRetina: true,
      opacity: 0.5
    });
    
    const overlays = {
      /*Layer: capalayer,*/
      AvisoLluvia24h: etiquetaAviso24H,
      Departamento:departamento,
      Provincia:provincia
    };
  

   /*await this.geolocation.getCurrentPosition(this.options).then(
      (pos: Geoposition) => {*/
        
        this.map = new Map('aviso24h', {center: [ this.latMipos,  this.lngMipos ],
          zoom: 6,
          maxZoom: 100,
          minZoom: 6,
          layers: [routesmap, etiquetaAviso24H, departamento, provincia]}
        ).setView([ this.latMipos,  this.lngMipos ], 10);

        //layer de etiquteas de mapa
        control.layers(null, overlays, {
          collapsed: true,
          position: 'topright'
        }).addTo(this.map);

        //layer posiciones
        const markPoint = marker([this.latMipos,  this.lngMipos], {
            icon: icon(iconmarker)
          });
        this.map.addLayer(markPoint);

          //Información de indice en mi posición
         let containerPotin1  = this.map.latLngToContainerPoint([this.latMipos,this.lngMipos], this.map.getZoom());
         let size1 = this.map.getSize();
         let bounds1 = this.map.getBounds();
         let sw1 = bounds1.getSouthWest();
         let ne1 = bounds1.getNorthEast();

          //this.wmssenamhiavisoService.getInfoAvisos(2,'g_prono_pp_24h:view_aviso24h',this.latMipos,  this.lngMipos)
        this.wmssenamhiavisoService.getInfoAvisosA(2,'g_prono_pp_24h:view_aviso24h',sw1.lat,sw1.lng,ne1.lat,ne1.lng,size1.x, size1.y,containerPotin1.x ,containerPotin1.y)
        .subscribe((response)=>{
          let cabresl ="<table class='estilotabla'><tr><th>Información de Aviso</th></tr>";
          let obj = JSON.parse(response.data);
            let infotab='';
            let a=0;
            let data = obj['features'];
            let fecha;
            let nivel='';
            data.forEach(element => {
              let dato=element['properties'].nivel;
              fecha=element['properties'].fecha;
              let niveli=dato.slice(-1);
              if(Number(niveli)){
                a=1
                niveli=Number(niveli)-1;
                  
              }else{
                niveli=0
                dato="Nivel 1";
              }

              if(dato=="Nivel 1"){
                nivel='BLANCO';
              }

              if(dato=="Nivel 2"){
                nivel='AMARILLO';
              }

              if(dato=="Nivel 3"){
                nivel='NARANJA';
              }

              if(dato=="Nivel 4"){
                nivel='ROJO';
              }
              
              infotab="<tr><td>"+dato+":"+leyenda24horas[niveli]+"</td></tr>";
            });
            
            if(a==0){
              infotab="<tr><td>Nivel 1:"+leyenda24horas[a]+"</td></tr>";
            }
  
            cabresl+=infotab+"</table>";
               
            
          let pop= popup();
          pop=popup().setLatLng([this.latMipos,  this.lngMipos ])
                      .setContent(cabresl);                          
          pop.openOn(this.map); 

            //mapa
            const legend = control({ position: "bottomleft" });  
            legend.onAdd = () => {
              const div = DomUtil.create("div", "info legend");
            
              const grades = [1, 2, 3, 4];
              let contenido = leyenda24horas;
              let labels = [];
              
              
              let fechmod=moment(fecha).toDate();
              let fechn= fechmod.getDate()+'/'+(fechmod.getMonth()+1)+'/'+fechmod.getFullYear();
              
              
              labels.push("<div>AVISO LLUVIA 24 HORAS"+
              "</BR>Nivel de Aviso:"+nivel+"</BR>Fecha de Inicio:"+fechn+"</br>Vigencia: 24 Horas</div>");

              for (let i = 0; i < grades.length; i++) {
                let a=i+1;
                labels.push('<i style="background:'+this.getColor(i)+'">&nbsp;&nbsp;&nbsp;&nbsp;</i> '+a+':'+contenido[i]);
              }
              div.innerHTML = labels.join("<br>");
              return div;
            };
        
            legend.addTo(this.map);


        });

        //POPUP EN EL MAPA AL PRESIONAR
        this.map.on('click',(e)=>{

          let containerPotin  = this.map.latLngToContainerPoint(e.latlng, this.map.getZoom());
         
          let bounds = this.map.getBounds();
          let sw = bounds.getSouthWest();
          let ne = bounds.getNorthEast();
          let size = this.map.getSize();
          
          let tabalresul ="<table class='estilotabla'><tr><th>Información de Aviso</th></tr>";
          this.wmssenamhiavisoService.getInfoAvisosA(2,'g_prono_pp_24h:view_aviso24h',sw.lat,sw.lng,ne.lat,ne.lng,size.x, size.y,containerPotin.x ,containerPotin.y)
          .subscribe((response)=>{
            let obj = JSON.parse(response.data);
            let infotab=''
            let data = obj['features'];
            data.forEach(element => {
              let dato=element['properties'].nivel;
              let niveli=dato.slice(-1);
              if(Number(niveli)){
                niveli=Number(niveli)-1;
                
              }else{
                niveli=0
                dato="Nivel 1";
              }
  
              infotab="<tr><td>"+dato+":"+leyenda24horas[niveli]+"</td></tr>";
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
        //alert(mensajeShare1);
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

}



