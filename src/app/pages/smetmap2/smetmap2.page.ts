import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { Map, tileLayer, marker, control, icon, DomUtil, popup} from 'leaflet';
import { previous, iconmarker, radiacionUVLeg,
  urlMapaLealeft,urlIDESEPDepart,
  urlIDESEPProv,urlIDESEPRUV72 } from '../../globales';
import { WmssenamhiService } from '../../services/wmssenamhi.service';

@Component({
  selector: 'app-smetmap2',
  templateUrl: './smetmap2.page.html',
  styleUrls: ['./smetmap2.page.scss'],
})
export class Smetmap2Page {

  map: Map;
  control: any;
  tiles: any;
  propertyList = [];
  public data: any;
  options: GeolocationOptions;
  currentPost: Geoposition;

  constructor(private router: Router, private geolocation: Geolocation,
              public wmsenmRUV48:WmssenamhiService) { }

  previo=previous;
  titulo="Radiación 72 horas";

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

    const radiacion72 = tileLayer.wms(urlIDESEPRUV72, {
      layers: 'g_03_04:03_04_002_03_001_513_0000_00_00',
      format: 'image/png',
      transparent: true,
      detectRetina: true
    });


    const overlays = {
      /*Layer: capalayer,*/
      Radiacion72h: radiacion72,
      Departamentos: departamento,
      Provincias: provincia,
     
    };

   await this.geolocation.getCurrentPosition(this.options).then(
      (pos: Geoposition) => {
        
        this.map = new Map('radiacion72', {center: [ pos.coords.latitude, pos.coords.longitude ],
          zoom: 6,
          maxZoom: 100,
          minZoom: 6,
          layers: [routesmap, radiacion72, departamento, provincia]}
        ).setView([ pos.coords.latitude, pos.coords.longitude ], 10);
    
        //insert layer
        control.layers(null, overlays, {
          collapsed: true,
          position: 'topright'
        }).addTo(this.map);
        
         //POPUP EN EL MAPA AL PRESIONAR
         this.map.on('click',(e)=>{
          let tabalresul ="<table class='estilotabla'><tr><th>ÍNDICE DE RADIACIÓN UV</th></tr>";
          this.wmsenmRUV48.getInfoRUV(2,e.latlng.lat, e.latlng.lng)
          .subscribe((response)=>{
            let obj = JSON.parse(response.data);
           
            const data = obj['features'];
            data.forEach(element => {
              tabalresul+="<tr><td>"+element['properties'].indice+"</td></tr>";
            });
            
            tabalresul+="</table>";
               
            let dato= popup();
            dato=popup()
            .setLatLng(e.latlng)
            .setContent(tabalresul);
        
            dato.openOn(this.map);
          });
        });

        //Información de indice en mi posición
        this.wmsenmRUV48.getInfoRUV(2,pos.coords.latitude, pos.coords.longitude)
          .subscribe((response)=>{
            let cabresl ="<div>Índice de Radiación<br> en mi ubicación</div>"+
                         "<table class='estilotabla'><tr><th>ÍNDICE DE RADIACIÓN UV</th></tr>";
            let ob1j = JSON.parse(response.data);
           
            const data = ob1j['features'];
            data.forEach(element1 => {
              cabresl+="<tr><td>"+element1['properties'].indice+"</td></tr>";
            });
            
            cabresl+="</table>";

            let pop= popup();
            pop=popup().setLatLng([pos.coords.latitude, pos.coords.longitude ])
                        .setContent(cabresl);                          
            pop.openOn(this.map); 

          })  

        //ICONO DE posición   
        const markPoint = marker([pos.coords.latitude, 
          pos.coords.longitude ], {
            icon: icon(iconmarker)
          });
        this.map.addLayer(markPoint);

        //LEGENDA DEL MAPA
        const legend = control({ position: "bottomleft" });  
        legend.onAdd = () => {
          const div = DomUtil.create("div", "info legend");
          div.innerHTML = '<img src="'+radiacionUVLeg+'"/>';
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

}
