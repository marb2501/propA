import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Map, tileLayer, marker, control, icon, DomUtil, popup} from 'leaflet';
import { previous, iconmarker, leyendanotificaciones,
  urlMapaLealeft, urlIDESEPDepart, urlIDESEPProv, urlIDESEPServMet, urlIDESEP24Horas, urlIDESEPQuebrada, leyendaavisosmet } from '../../globales';
 import { WmssenamhiService } from '../../services/wmssenamhi.service';


@Component({
  selector: 'app-alertmap2',
  templateUrl: './alertmap2.page.html',
  styleUrls: ['./alertmap2.page.scss'],
})
export class Alertmap2Page {

  data : any;
  map: Map;
  control: any;
  tiles: any;
  propertyList = []; 
  webmap='';
  previo=previous;
  titulo='';
  aviso='';
  overlays:any;
  textoleyenda:string;
  viewparams='';
  urldat='';

  constructor(private route: ActivatedRoute,public wmssenamhi:WmssenamhiService,
              private router: Router) { 
                this.route.queryParams.subscribe(params => {
                  if (params && params.special){
                    this.data = JSON.parse(params.special)
                  }
                })
              }

  async ionViewDidEnter() {

    this.titulo='AVISO METEOROLÓGICO DE ÚLTIMO MINUTO : '+ this.data.tiempo ;
    this.aviso=this.data.tipoaviso;
    
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

    switch(Number(this.data.id)){
      case 1 : this.webmap=urlIDESEPServMet;break;
      case 2 : this.webmap=urlIDESEP24Horas;break;
      default : this.webmap=urlIDESEPQuebrada;break;
    }

    if(Number(this.data.id)==1){
      this.viewparams='viewparams=qry:' + Number(this.data.numeroaviso) + '_1_' + this.data.anioaviso ;
      this.urldat=this.webmap+'?'+this.viewparams;
    }else{
      this.urldat=this.webmap
    }

    const etiquetaAlerta = tileLayer.wms(this.urldat, {
      layers: this.data.layer,
      format: 'image/png',
      transparent: true,
      detectRetina: true,
      opacity: 0.5
    });

    const overlays = {
      Alerta: etiquetaAlerta,
      Departamento:departamento,
      Provincia:provincia
    };

    if(Number(this.data.id)==1){
      this.overlays = {
        /*Layer: capalayer,*/
        AvisoMeteorologico: etiquetaAlerta,
        Departamento:departamento,
        Provincia:provincia
      };
  
    }

    if(Number(this.data.id)==2){
      this.overlays = {
        /*Layer: capalayer,*/
        AvisoLluvia24H: etiquetaAlerta,
        Departamento:departamento,
        Provincia:provincia
      };
    }

    if(Number(this.data.id)==3){
      this.overlays = {
        /*Layer: capalayer,*/
        AvisoQuebrada: etiquetaAlerta,
        Departamento:departamento,
        Provincia:provincia
      };
    }

    this.map = new Map('alertaUltimoM', {center: [ this.data.lat, this.data.lng ],
      zoom: 6,
      maxZoom: 100,
      minZoom: 6,
      layers: [routesmap, etiquetaAlerta, departamento, provincia]}
    ).setView([ this.data.lat, this.data.lng ], 10);

    control.layers(null, this.overlays, {
      collapsed: true,
      position: 'topright'
    }).addTo(this.map);

    
    const markPoint = marker([this.data.lat, this.data.lng], {
        icon: icon(iconmarker)
      });
    this.map.addLayer(markPoint);

    //POPUP EN EL MAPA AL PRESIONAR
    this.map.on('click',(e)=>{

      let containerPotin  = this.map.latLngToContainerPoint(e.latlng, this.map.getZoom());
      let bounds = this.map.getBounds();
      let sw = bounds.getSouthWest();
      let ne = bounds.getNorthEast();
      let size = this.map.getSize();
      
      if(Number(this.data.id)==1){
        let tabalresul ="<table class='estilotabla'><tr><th>Información de Aviso </th></tr>";
          this.wmssenamhi.getInfoAvisosB(1,this.viewparams,this.data.layer,sw.lat,sw.lng,ne.lat,ne.lng,size.x, size.y,containerPotin.x ,containerPotin.y)
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

              infotab="<tr><td>"+dato+":"+leyendaavisosmet[niveli]+"</td></tr>";
            });
            
            tabalresul+=infotab+"</table>";
            infotab='';
              
            let dato= popup();
            dato=popup()
            .setLatLng(e.latlng)
            .setContent(tabalresul);
        
            dato.openOn(this.map);
          });
      }else{
        let tabalresul ="<table class='estilotabla'><tr><th>Información de Aviso </th></tr>";
          this.wmssenamhi.getInfoAvisosA(this.data.id,this.data.layer,sw.lat,sw.lng,ne.lat,ne.lng,size.x, size.y,containerPotin.x ,containerPotin.y)
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

              infotab="<tr><td>"+dato+":"+leyendaavisosmet[niveli]+"</td></tr>";
            });
            
            tabalresul+=infotab+"</table>";
            infotab='';
              
            let dato= popup();
            dato=popup()
            .setLatLng(e.latlng)
            .setContent(tabalresul);
        
            dato.openOn(this.map);
          });
      }
    });   

    //mapa
    const legend = control({ position: "bottomleft" });  
    legend.onAdd = () => {
    const div = DomUtil.create("div", "info legend");
      
    const grades = [1, 2, 3, 4];
    let contenido =leyendanotificaciones;
    let labels = [];
    labels.push("<div>"+this.titulo+"</BR>Tipo de Aviso:"+this.aviso+"</BR>Nivel del Aviso:</div>"); 
    
    for (let i = 0; i < grades.length; i++) {
      let a=i+1;
        labels.push('<i style="background:'+this.getColor(i)+'">&nbsp;&nbsp;&nbsp;&nbsp;</i> '+a+':'+contenido[i]);
      }
      div.innerHTML = labels.join("<br>");
      return div;
    };

    legend.addTo(this.map);


  }   

  gotoMain() {
    this.router.navigate(['/menu/main']);
  }

  ionViewWillLeave() {
    
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
