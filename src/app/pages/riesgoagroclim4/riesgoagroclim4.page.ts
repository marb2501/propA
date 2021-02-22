import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { Map, tileLayer, marker, control, icon, DomUtil, popup} from 'leaflet';
import { previous, iconmarker, leyendariesgo, urlMapaLealeft,
  urlIDESEPDepart,urlIDESEPProv ,urlIDESEPriesgo4} from '../../globales';
import { WmssenamhiService } from '../../services/wmssenamhi.service';

@Component({
  selector: 'app-riesgoagroclim4',
  templateUrl: './riesgoagroclim4.page.html',
  styleUrls: ['./riesgoagroclim4.page.scss'],
})
export class Riesgoagroclim4Page  {

  map: Map;
  control: any;
  tiles: any;
  propertyList = [];
  public data: any;
  options: GeolocationOptions;
  currentPost: Geoposition;

  constructor(private router: Router, private geolocation: Geolocation,  public wmsenmRiesgo:WmssenamhiService) { }

  previo=previous;
  titulo="Riesgo Agroclimático - Cacao";

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

    const riesgocacao = tileLayer.wms(urlIDESEPriesgo4, {
      layers: 'g_11_04:11_04_001_03_001_531_0000_00_00',
      format: 'image/png',
      transparent: true,
      detectRetina: true
    });
    
    const overlays = {
      /*Layer: capalayer,*/
      Departamentos: departamento,
      Provincias: provincia,
      RiesgoCacao: riesgocacao
    };

   await this.geolocation.getCurrentPosition(this.options).then(
      (pos: Geoposition) => {
        
        this.map = new Map('riesgocacao', {center: [ pos.coords.latitude, pos.coords.longitude ],
          zoom: 6,
          maxZoom: 100,
          minZoom: 6,
          layers: [routesmap, riesgocacao, departamento, provincia]}
        ).setView([ pos.coords.latitude, pos.coords.longitude ], 10);
    
        control.layers(null, overlays, {
          collapsed: true,
          position: 'topright'
        }).addTo(this.map);
    
        //POPUP EN EL MAPA AL PRESIONAR
        this.map.on('click',(e)=>{
          
          let containerPotin  = this.map.latLngToContainerPoint(e.latlng, this.map.getZoom());
          
          let bounds = this.map.getBounds();
          let sw = bounds.getSouthWest();
          let ne = bounds.getNorthEast();
          let size = this.map.getSize();
         
          this.wmsenmRiesgo.getInfoRiesgoClimatologico(4,containerPotin.x ,containerPotin.y,sw.lat,sw.lng,ne.lat,ne.lng, size.x, size.y)
          .subscribe((response)=>{
            let obj = JSON.parse(response.data);
            let tabalresul="<div class='listapopup'>"
            tabalresul +="<table class='estilotabla'><thead><tr><th>NIVEL</th><th>AREA</th><th>PERÍMETRO</th></tr></thead><tbody>";
            const data = obj['features'];
            data.forEach(element => {
              tabalresul+="<tr><td>"+element['properties'].nivel+"</td><td> "+element['properties'].area+" </td><td> "+element['properties'].perimetro+" </td></tr>";
            });
            
            tabalresul+="</tbody></table></div>";
               
            let dato= popup();
            dato=popup()
            .setLatLng(e.latlng)
            .setContent(tabalresul);
        
            dato.openOn(this.map);
          });

        });

        const markPoint = marker([pos.coords.latitude, 
          pos.coords.longitude ], {
            icon: icon(iconmarker)
          });
        this.map.addLayer(markPoint);

        //mapa
        const legend = control({ position: "bottomleft" });  
        legend.onAdd = () => {
          const div = DomUtil.create("div", "info legend");
         
          const grades = [1, 2, 3, 4, 5];
          let contenido = leyendariesgo;
          let labels = [];
          labels.push("<div>Niveles de Riesgo: Cacao</div>");
          for (let i = 0; i < grades.length; i++) {
            labels.push('<i style="background:'+this.getColor(i)+'">&nbsp;&nbsp;&nbsp;&nbsp;</i> '+contenido[i]);
          }
          div.innerHTML = labels.join("<br>");
          return div;
        };
    
        legend.addTo(this.map); 

        //insercion de boton salir
        const botonMap = control({ position: "topleft" });  
        botonMap.onAdd = () => {
          const container = DomUtil.create('input');
          container.type="button";
          container.title="No cat";
          container.value = "";

          container.style.backgroundColor = 'white';     
          container.style.backgroundSize = "25px 25px";
          container.style.backgroundImage = "url(../assets/images/home.svg)";
          container.style.width = '30px';
          container.style.height = '30px';
          container.onmouseover = function(){
            container.style.backgroundColor = 'pink'; 
          }
          container.onmouseout = function(){
            container.style.backgroundColor = 'white'; 
          }
      
          container.onclick = function(){
            document.getElementById("salir").click();
          }
      
          return container;
        };
    
        botonMap.addTo(this.map); 

    });
  }

  ionViewWillLeave() {
    this.map.remove();
  } 

 

  gotoMain() {
    this.router.navigate(['/menu/main']);
  }

  getColor(d){
    return d === 0
      ? "#f53d3d" //muy alto
      : d === 1 
      ? "#ffa500" //alto
      : d === 2
      ? "#FFFF00" //medio
      : d === 3 
      ? "#2dd36f" //bajo
      : d === 4 
      ? "#186938" //muybajo
      : "#ffffff"; //vacio
  };

}
