import { Component, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { NavParams } from '@ionic/angular';
import { Map, tileLayer, marker, control, icon, DomUtil, popup} from 'leaflet';
import { iconmarker, leyendaavisoshidro, 
  iconEstacionA, iconEstacionN, iconEstacionR, MESESTIEMPO,urlIDESEPDist,
  sizepopuphidro,urlMapaLealeft,urlIDESEPDepart,urlIDESEPProv, mensajeShare1, mensajeShare2, stylesWMSDist } from '../../globales';
import { Lugarafectado } from '../../models/lugarafectado.model';
import Swal from 'sweetalert2';
import { WmssenamhiService } from '../../services/wmssenamhi.service';
import * as moment from 'moment';

@Component({
  selector: 'app-avisosmap4',
  templateUrl: './avisosmap4.page.html',
  styleUrls: ['./avisosmap4.page.scss'],
})
export class Avisosmap4Page  {

  caviso:string;
  cnivel:string;
  colnivel:string;
  coloHexa:string;
  fEmi:string;
  hEmi:string;
  nTitulo:string;
  fIni:string;
  fFin:string;
  cPlazo:string;
  nPlazo:string;
  desc1:String;
  desc2:String;
  rutaimg:String;
  mgrojo:String;
  mgnaranja:String;
  mgamarillo:String;
  cestac:string;
  latestac:string;
  lngestac:string;
  altestac:string;
  depestac:string;
  provestac:string;
  distestac:string;
  latMipos:string;
  lngMipso:string;
  lugafec:Lugarafectado[];
  csql_filter:string;
  colorubica:string;

  latubica:string;
  lngubica:string;

  map: Map;
  control: any;
  tiles: any;
  propertyList = [];
  public data: any;

  nivelaviso:any;
  fechaemision:any;


  @Input() codAviso: string;
  @Input() codNivel: string;
  @Input() colorNivel: string;
  @Input() colorHexa: string;
  @Input() fecEmi:string;
  @Input() hrEmi:string;
  @Input() nomTitulo:string;
  @Input() fecIni:string;
  @Input() fecFin:string;
  @Input() codPlazo:string;
  @Input() nomPlazo:string;
  @Input() descrip1:string;
  @Input() descrip2:string;
  @Input() rutaImg:string;
  @Input() msgRojo:string;
  @Input() msgNaranja:string;
  @Input() msgAmarillo:string;
  @Input() codEsta:string;
  @Input() latEsta:string;
  @Input() lonEsta:string;
  @Input() altitudEsta:string;
  @Input() depEsta:string;
  @Input() provEsta:string;
  @Input() distEsta:string;
  @Input() lat:string;
  @Input() lng:string;
  @Input() lugarafectado:Array<Lugarafectado>;
  @Input() csqlfilter:string;
  @Input() cubica:string;



  constructor(private modalcontroler: ModalController, private socialSharing: SocialSharing, 
    private screenshot: Screenshot, private navParams: NavParams,  public loadingController: LoadingController,
    public wmssenamhi:WmssenamhiService) { 

      this.caviso=navParams.get('codAviso');
      this.cnivel=navParams.get('codNivel');
      this.colnivel=navParams.get('colorNivel');
      this.coloHexa=navParams.get('colorHexa');
      this.fEmi=navParams.get('fecEmi');
      this.hEmi=navParams.get('hrEmi');
      this.nTitulo=navParams.get('nomTitulo');
      this.fIni=navParams.get('fecIni');
      this.fFin=navParams.get('fecFin');
      this.cPlazo=navParams.get('codPlazo');
      this.nPlazo=navParams.get('nomPlazo');
      this.desc1=navParams.get('descrip1');
      this.desc2=navParams.get('descrip2');
      this.rutaimg=navParams.get('rutaImg');
      this.mgrojo=navParams.get('msgRojo');
      this.mgnaranja=navParams.get('msgNaranja');
      this.mgamarillo=navParams.get('msgAmarillo');
      this.cestac=navParams.get('codEsta');
      this.latestac=navParams.get('latEsta');
      this.lngestac=navParams.get('lonEsta');
      this.altestac=navParams.get('altitudEsta');
      this.depestac=navParams.get('depEsta');
      this.provestac=navParams.get('provEsta');
      this.distestac=navParams.get('distEsta');
      this.latMipos=navParams.get('lat');
      this.lngMipso=navParams.get('lng');
      this.lugafec=navParams.get('lugarafectado');
      this.csql_filter=navParams.get('cql_filter');
      this.colorubica=navParams.get('colorubica');
    }



  async  closeModal() {
    await this.modalcontroler.dismiss();
  }

 

  share(){
    this.screenshot.save('jpg', 80, 'myscreenshot.jpg').then(
       async (res:any)=>{
         let fecha = moment().toDate();
         
        //alert(mensajeShare1);
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

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      //duration: 5000
    });

    if(parseInt(this.colorubica)==0){
      this.latubica=this.latestac
      this.lngubica=this.lonEsta
    }else{
      this.latubica=this.latMipos
      this.lngubica=this.lngMipso
    }
   
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
      Distritos:distrito
    };

    this.map = new Map('avisoHidro', {center: [  this.latMipos, this.lngMipso ],
      zoom: 6,
      maxZoom: 100,
      minZoom: 6,
      layers: [routesmap, distrito]}
    ).setView([ this.latubica, this.lngubica], 10);

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
         
         
          let fi=moment(this.fIni).toDate();
          let ff=moment(this.fFin).toDate();
          let periodo='Vigencia: Desde el '+fi.getDate()+' de '+MESESTIEMPO[fi.getMonth()]+' del '+fi.getFullYear()+' hasta el '+
                  ff.getDate()+' de '+MESESTIEMPO[ff.getMonth()]+' del '+ff.getFullYear()
        
         
         labels.push("<div style='color:black'>AVISO HIDROLÓGICO"+
         "</BR>"+periodo+"</BR>Niveles del Aviso:</div>");

         for (let i = 0; i < grades.length; i++) {
           let a=i+1;
           labels.push('<i style="background:'+this.getColor(i)+'">&nbsp;&nbsp;&nbsp;&nbsp;</i> <span style="color:black">'+a+':'+contenido[i]+"</span>");
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
