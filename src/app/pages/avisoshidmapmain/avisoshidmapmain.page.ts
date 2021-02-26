import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { NavParams } from '@ionic/angular';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { Map, tileLayer, marker, control, icon, DomUtil, popup} from 'leaflet';
import { previous, iconmarker, leyendaavisoshidro, iconEstacionN, iconEstacionA, iconEstacionR, sizepopuphidro, MESESTIEMPO,
  urlMapaLealeft, urlIDESEPDepart, urlIDESEPProv,mensajeShare1,mensajeShare2, urlIDESEPDist, stylesWMSDist } from '../../globales';
import { TipoavisoService } from '../../services/tipoaviso.service';
import { WmssenamhiService } from '../../services/wmssenamhi.service';
import { Lugarafectado } from '../../models/lugarafectado.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-avisoshidmapmain',
  templateUrl: './avisoshidmapmain.page.html',
  styleUrls: ['./avisoshidmapmain.page.scss'],
})
export class AvisoshidmapmainPage {

  map: Map;
  control: any;
  tiles: any;
  propertyList = [];
  private lafect: Lugarafectado[];
  public data: any;
  options: GeolocationOptions;
  currentPost: Geoposition;
  titulomodal:number;
  tituloaviso:string;
  etiqueta:string;
  previo=previous;
  csql_filter:string;

  @Input() layer: string;
  @Input() numero: string;
  @Input() tituloA: string;
  @Input() fechainicio: string;
  @Input() fechafin: string;
  @Input() fechaemision: string;
  @Input() lat: string;
  @Input() lng: string;
  @Input() latEsta: string;
  @Input() lonEsta: string;
  @Input() colorNivel: string;

  constructor(private modalcontroler: ModalController, private socialSharing: SocialSharing, 
    private screenshot: Screenshot, private geolocation: Geolocation, 
    public tavisomp1: TipoavisoService,
    public wmssenamhi:WmssenamhiService,
    private navParams: NavParams) {
     
      this.etiqueta=navParams.get('layer');
      this.titulomodal=navParams.get('numero');
      this.tituloaviso=navParams.get('tituloA');
      this.fechainicio=navParams.get('fechainihid');
      this.fechaemision=navParams.get('fechaemisionhid');
      this.fechafin=navParams.get('fechafinhid');
      this.lafect=navParams.get('lugarAfectado');
      this.colorNivel=navParams.get('colorNivel');
      this.lat=navParams.get('lat');
      this.lng=navParams.get('long');
      this.latEsta=navParams.get('latEsta');
      this.lonEsta=navParams.get('lonEsta');
      this.csql_filter=navParams.get('cql_filter');
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

    const liter=this.csql_filter;
    let stylo='';
    if(liter==""){
      stylo=stylesWMSDist[0];
    }else{
      stylo=stylesWMSDist[Number(this.titulomodal)];
    }
 
    const stylesWMS=stylo;
    const layer='g_carto_fundamento:distritos';

    const distrito = tileLayer.wms(urlIDESEPDist, {
      layers: layer,
      cql_filter: liter,
      styles: stylesWMS,
      format: 'image/png',
      transparent: true,
      detectRetina: true
    });

    const overlays = {
      //Formato:
      //Layer: la capa del layer
      Departamento:departamento,
      Provincia:provincia
    };
    

      this.map = new Map('avisoHidro', {center: [ this.lat, this.lng ],
        zoom: 9,
        maxZoom: 100,
        minZoom: 5,
        layers: [routesmap, departamento, provincia]}
      ).setView([ this.lat, this.lng ], 1);

        //layer de etiquteas de mapa
        control.layers(null, overlays, {
        collapsed: true,
        position: 'topright'
      }).addTo(this.map);

      //layer posiciones
      const markPoint = marker([this.lat, this.lng ], {
          icon: icon(iconmarker)
        });
      this.map.addLayer(markPoint);
        

        //insercion distriso en mapa. popup deistritos afectados
      let markercolor='';
      let colorMapa='';
      if(this.colorNivel=="NARANJA"){
        markercolor=iconEstacionN;
        colorMapa='#FFA500';
      }else if(this.colorNivel=="AMARILLO"){
        markercolor=iconEstacionA;
        colorMapa='yellow';
      }else if(this.colorNivel=="ROJO"){
        markercolor=iconEstacionR;
        colorMapa='red';
      }


      let distritosafechtml='';
      if (this.lafect.length<=0){
        distritosafechtml="No se ha registrado los lugares afectados";
      }else{
        let codigoProv;
        let codigoDep;
        distritosafechtml ="Lugares Afectados:<table class='tablavert'><thead><tr><th>DEPARTAMENTO</th><th>PROVINCIA</th><th>DISTRITO</th></tr></thead><tbody>";
        
        this.lafect.forEach(elementla=>{
          if(codigoProv=="" && codigoDep==""){
            codigoDep=elementla.codDep
            codigoProv=elementla.codProv
            distritosafechtml +="<tr><td>"+elementla.nomdep+"</td><td>"+elementla.nomProv+"</td><td>"+elementla.nomDist+"</td></tr>";
          }else{
            if(codigoDep!=elementla.codDep){
              codigoDep=elementla.codDep
              codigoProv=elementla.codProv
              distritosafechtml +="<tr><td>"+elementla.nomdep+"</td><td>"+elementla.nomProv+"</td><td>"+elementla.nomDist+"</td></tr>";
  
            }else if(codigoProv!=elementla.codProv) {
              codigoProv=elementla.codProv
              distritosafechtml +="<tr><td>&nbsp;</td><td>"+elementla.nomProv+"</td><td>"+elementla.nomDist+"</td></tr>";
            }else{
              distritosafechtml +="<tr><td>&nbsp;</td><td>&nbsp;</td><td>"+elementla.nomDist+"</td></tr>";
            }
          }
        }); 

        distritosafechtml +="</tbody></table>";
      }
      
      let consolidadoDIV=distritosafechtml;
      this.map.addLayer(marker([ this.latEsta, this.lonEsta],{
        icon: icon(markercolor)})
        .bindPopup(consolidadoDIV,
         sizepopuphidro));

      //al presionar el mapa revisa que distrito es ubicado
      this.map.on('click',(e)=>{

        let containerPotin  = this.map.latLngToContainerPoint(e.latlng, this.map.getZoom());
       
        let bounds = this.map.getBounds();
        let sw = bounds.getSouthWest();
        let ne = bounds.getNorthEast();
        let size = this.map.getSize();
        
        let tabalresul ="<table class='estilotabla'>";
        this.wmssenamhi.getDistritoAvisoHidrologico(layer,sw.lat,sw.lng,ne.lat,ne.lng,size.x, size.y,containerPotin.x ,containerPotin.y)
        .subscribe((response)=>{
          let obj = JSON.parse(response.data);
          let infotab=''
          let data = obj['features'];
          data.forEach(element => {
            let dato=element['properties'].distrito;
            infotab+="<tr><th>"+dato+"</th></tr>";
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


      //mapa
      const legend = control({ position: "bottomleft" });  
      legend.onAdd = () => {
        const div = DomUtil.create("div", "info legend");
       
        const grades = [1, 2, 3, 4];
        let contenido = leyendaavisoshidro;
        let labels = [];
        
        let auxtiempoini=new Date(this.fechaemision);
        let auxtiempofin=new Date(this.fechafin);
        
        let periodo='Vigencia: Desde el '+auxtiempoini.getDate()+' de '+MESESTIEMPO[auxtiempoini.getMonth()]+' del '+auxtiempoini.getFullYear()+' hasta el '+
        auxtiempofin.getDate()+' de '+MESESTIEMPO[auxtiempofin.getMonth()]+' del '+auxtiempofin.getFullYear()
        
        labels.push("<div>AVISO HIDROLÓGICO"+
                "</BR>"+periodo+"</BR>Niveles del Aviso:</div>");
        
        for (let i = 0; i < grades.length; i++) {
          let a=i+1;
          labels.push('<i style="background:'+this.getColor(i)+'">&nbsp;&nbsp;&nbsp;&nbsp;</i> '+a+':'+contenido[i]);
        }
        div.innerHTML = labels.join("<br>");
        return div;
      };
  
      legend.addTo(this.map);


      //insercion de boton info
      const botonMap2 = control({ position: "topleft" });  
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
            text:'Presione la estación para vizualizar los distritos afectados.',
            backdrop:false
          });
          //alert('Presione la estación para vizualizar los distritos afectados');
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

}
