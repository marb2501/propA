import { Component, OnInit, Input } from '@angular/core';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { Map, tileLayer, marker, control, icon, DomUtil, popup} from 'leaflet';
import { previous, iconmarker, leyendaquebrada,urlMapaLealeft,urlIDESEPDepart,urlIDESEPProv,urlIDESEPQuebrada,
  mensajeShare1,mensajeShare2  } from '../../globales';
import { WmssenamhiService } from '../../services/wmssenamhi.service';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-avisosmapquebra',
  templateUrl: './avisosmapquebra.page.html',
  styleUrls: ['./avisosmapquebra.page.scss'],
})
export class AvisosmapquebraPage {

  map: Map;
  control: any;
  tiles: any;
  propertyList = [];
  public data: any;
  options: GeolocationOptions;
  currentPost: Geoposition;
  titulomodal:string;
  tituloaviso:string;
  nivelaviso:string;
  fechaemision:string;
  etiqueta:string;
  previo=previous;
  latMipos:number;
  lngMipos:number;

  @Input() latapp:number;
  @Input() longapp:number;


  constructor(private modalcontroler: ModalController,private geolocation: Geolocation, 
    public wmssenamhiavisoService:WmssenamhiService, private navParams: NavParams,
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

    const etiquetaAvisoQuebrada = tileLayer.wms(urlIDESEPQuebrada, {
      layers: 'g_acti_quebrada:view_av_activ_qdra',
      format: 'image/png',
      transparent: true,
      detectRetina: true,
      opacity: 0.5
    });

   

    const overlays = {
      /*Layer: capalayer,*/
      AvisoQuebrada: etiquetaAvisoQuebrada,
      Departamento:departamento,
      Provincia:provincia
    };

   /*await this.geolocation.getCurrentPosition(this.options).then(
      (pos: Geoposition) => {*/
        
        this.map = new Map('avisoQuebrada', {center: [ this.latMipos, this.lngMipos ],
          zoom: 6,
          maxZoom: 100,
          minZoom: 6,

          layers: [routesmap, etiquetaAvisoQuebrada, departamento, provincia]}
        ).setView([ this.latMipos, this.lngMipos  ], 10);

          
        control.layers(null, overlays, {
          collapsed: true,
          position: 'topright'
        }).addTo(this.map);
   
        
        const markPoint = marker([this.latMipos, this.lngMipos ], {
            icon: icon(iconmarker)
          });
        this.map.addLayer(markPoint);

        //Información de indice en mi posición
        this.wmssenamhiavisoService.getInfoAvisos(3,'g_acti_quebrada:av_activ_qdra',this.latMipos, this.lngMipos )
        .subscribe((response)=>{
          let cabresl ="<div>Nivel de Aviso<br> en mi ubicación</div>"+
                       "<table class='estilotabla'><tr><th>Nivel</th></tr>";
          let ob1j = JSON.parse(response.data);
         
          let data = ob1j['features'];
          data.forEach(element1 => {
            cabresl+="<tr><td>"+element1['properties'].nivel+"</td></tr>";
          });
          
          cabresl+="</table>";

          let pop= popup();
          pop=popup().setLatLng([this.latMipos, this.lngMipos  ])
                      .setContent(cabresl);                          
          pop.openOn(this.map); 

        }); 

        //mapa
        const legend = control({ position: "bottomleft" });  
        legend.onAdd = () => {
          const div = DomUtil.create("div", "info legend");
         
          const grades = [1, 2, 3, 4];
          let contenido = leyendaquebrada;
          let labels = [];
          labels.push("<div>AVISO ACTIVACIÓN DE QUEBRADAS</BR>Nivel de Aviso:</div>");
          for (let i = 0; i < grades.length; i++) {
            let a=i+1;
        labels.push('<i style="background:'+this.getColor(i)+'">&nbsp;&nbsp;&nbsp;&nbsp;</i> '+a+':'+contenido[i]);
          }
          div.innerHTML = labels.join("<br>");
          return div;
        };
    
        legend.addTo(this.map);
  
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

}







 

   

  