import { Component, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { NavParams } from '@ionic/angular';
import { Map, tileLayer, marker, control, icon, DomUtil, popup} from 'leaflet';
import { iconmarker, leyendaavisoshidro, 
  iconEstacionA, iconEstacionN, iconEstacionR, urlIDESEPDist,
  sizepopuphidro,urlMapaLealeft,urlIDESEPDepart,urlIDESEPProv, mensajeShare1, mensajeShare2, stylesWMSDist } from '../../globales';
import { Lugarafectado } from '../../models/lugarafectado.model';
import { WmssenamhiService } from '../../services/wmssenamhi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alertpopupmaphidro',
  templateUrl: './alertpopupmaphidro.page.html',
  styleUrls: ['./alertpopupmaphidro.page.scss'],
})
export class AlertpopupmaphidroPage {

  fIni:string;
  fFin:string;
  cnivel:string;
  colnivel:string;
  latestac:string;
  lngestac:string;
  latMipos:string;
  lngMipso:string;
  lugafec:Lugarafectado[];
  csql_filter:string;

  map: Map;
  control: any;
  tiles: any;
  propertyList = [];
  public data: any;

  @Input() fecIni:string;
  @Input() fecFin:string;
  @Input() codNivel: string;
  @Input() colorNivel: string;
  @Input() latEsta:string;
  @Input() lonEsta:string;
  @Input() lat:string;
  @Input() lng:string;
  @Input() lugarafectado:Array<Lugarafectado>;

  constructor(private modalcontroler: ModalController, private socialSharing: SocialSharing, 
    private screenshot: Screenshot, private navParams: NavParams,  public loadingController: LoadingController,
    public wmssenamhi:WmssenamhiService,) {

      this.cnivel=navParams.get('codNivel');
      this.colnivel=navParams.get('colorNivel');
      this.fIni=navParams.get('fecIni');
      this.fFin=navParams.get('fecFin');
      this.latestac=navParams.get('latEsta');
      this.lngestac=navParams.get('lonEsta');
      this.latMipos=navParams.get('lat');
      this.lngMipso=navParams.get('lng');
      this.lugafec=navParams.get('lugarafectado');
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

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
    });



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
      stylo=stylesWMSDist[Number(this.cnivel)];
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
      Provincia:provincia,
      Distrito:distrito
    };

    this.map = new Map('alertHidro', {center: [  this.latMipos, this.lngMipso ],
      zoom: 9,
      maxZoom: 100,
      minZoom: 5,
      layers: [routesmap, departamento, provincia, distrito]}
    ).setView([  this.latMipos, this.lngMipso ], 1);

       //layer de etiquteas de mapa
       control.layers(null, overlays, {
        collapsed: true,
        position: 'topright'
      }).addTo(this.map);

      //layer posición estacion
      const markPoint = marker([ this.latMipos, this.lngMipso], {
          icon: icon(iconmarker)
        });
      this.map.addLayer(markPoint);

     await loading.present();
      
      let codigoProv;
      let codigoDep;
      let cabresl ="<div class='listapopup'>Lugares Afectados:<table class='tablavert'><thead><tr><th>DEPARTAMENTO</th><th>PROVINCIA</th><th>DISTRITO</th></tr></thead><tbody>";
      this.lugafec.forEach(datos=>{
        if(codigoProv=="" && codigoDep==""){
          codigoDep=datos.codDep
          codigoProv=datos.codProv
          cabresl +="<tr><td>"+datos.nomdep+"</td><td>"+datos.nomProv+"</td><td>"+datos.nomDist+"</td></tr>";
        }else{
          if(codigoDep!=datos.codDep){
            codigoDep=datos.codDep
            codigoProv=datos.codProv
            cabresl +="<tr><td>"+datos.nomdep+"</td><td>"+datos.nomProv+"</td><td>"+datos.nomDist+"</td></tr>";

          }else if(codigoProv!=datos.codProv) {
            codigoProv=datos.codProv
            cabresl +="<tr><td>&nbsp;</td><td>"+datos.nomProv+"</td><td>"+datos.nomDist+"</td></tr>";
          }else{
            cabresl +="<tr><td>&nbsp;</td><td>&nbsp;</td><td>"+datos.nomDist+"</td></tr>";
          }
        }
      })
      cabresl +="</tbody></table></div>";

      if(this.lugafec.length<=0){
        cabresl="<table class='estilotabla'><tr><td>No se ha registrado los lugares afectados</td></tr></table>";
      }

      let markercolor='';
      let colorMapa='';
      if(this.cnivel=="1"){
        markercolor=iconEstacionA;
        colorMapa='yellow';
      }else  if(this.cnivel=="2"){
        markercolor=iconEstacionN;
        colorMapa='#FFA500';
      }else  if(this.cnivel=="3"){
        markercolor=iconEstacionR;
        colorMapa='red';
      }

      this.map.addLayer(marker([ this.latestac,  this.lonEsta],{
        icon: icon(markercolor)})
        .bindPopup(cabresl,
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
         let periodo='Vigencia: Desde el '+this.fIni+' hasta el '+this.fFin
         
         labels.push("<div>AVISO HIDROLÓGICO DE ÚLTIMO MINUTO"+
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
         container.style.width = '29px';
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
        }
     
         return container;
       };
   
       botonMap2.addTo(this.map);

       await loading.dismiss();


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
