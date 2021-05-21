import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, LoadingController } from '@ionic/angular';
import { WmssenamhiService } from '../../services/wmssenamhi.service';
import { previous, MESESTIEMPO, DIASTIEMPO } from '../../globales';
import { Lugarafectado } from '../../models/lugarafectado.model';
import { AlertpopupmaphidroPage } from '../alertpopupmaphidro/alertpopupmaphidro.page';
import { StorageService, Geolocaposicion } from '../../services/storage.service';

@Component({
  selector: 'app-alertmaphidro',
  templateUrl: './alertmaphidro.page.html',
  styleUrls: ['./alertmaphidro.page.scss'],
})
export class AlertmaphidroPage implements OnInit {

  data : any;
  previo=previous;
  titulo='';
  aviso='';
  textoleyenda:string;
  public lugarAfectado:Array<Lugarafectado>=[];
  argFecha=[];
  cadenaidistritos:string;
  itemGP:  Geolocaposicion[]=[];
  ciudad;

  avisoHidro =
    {
      "codEsta": '',
      "nomEsta": '',
      "latEsta": '',
      "lonEsta": '',
      "altitudEsta": '',
      "depEsta": '',
      "provEsta": '',
      "distEsta": '',
      "distancia": '',
      "codAviso": '',
      "codNivel": '',
      "colorNivel": '',
      "colorHexa": '',
      "fecEmi": '',
      "hrEmi": '',
      "nomTitulo":'',
      "fecIni":'',
      "fecFin":'',
      "codPlazo":'',
      "nomPlazo":'',
      "descrip1":'',
      "descrip2":'',
      "rutaImg":'',
      "msgRojo":'',
      "msgNaranja":'',
      "msgAmarillo":'',
      "codTipoAviso":'',
      "nomTipoAviso":'',
    };
 

  constructor(private modalcontroler: ModalController,private route: ActivatedRoute,  public wmssenamhi:WmssenamhiService,
    private router: Router,   public loadingController: LoadingController, private storagese:StorageService) {
      
      this.storagese.hiddenButtonApp({
        main: true,
        search: true,
        share:true
      });

      this.route.queryParams.subscribe(params => {
        if (params && params.special){
          this.data = JSON.parse(params.special)
        }
      })
    }

 

  async ngOnInit() {

    this.storagese.getitemGeoposition().then((items0)=>{
      this.itemGP=items0;
      this.ciudad=this.itemGP[0].ciudad;
    })



    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      //duration: 4000
    });

    await loading.present();

    this.argFecha=[];
    let fecha=new Date();
    this.argFecha.push(fecha);

    this.titulo='AVISO DE ÚLTIMO MINUTO : '+ this.data.tiempo ;
    this.aviso=this.data.tipoaviso;

    this.wmssenamhi.getAvisosHidrologicosVigentes(this.data.lat, this.data.lng)
    .subscribe((response)=>{
      let data = JSON.parse(response.data);
      data.map(element => {
        if(this.data.numeroaviso==element.codAviso){

           //LET VARIABLES AUXILIARES
          let auxtiempoemi;
          let auxtiempoini;
          let auxtiempofin;

          this.avisoHidro.codEsta=element.codEsta;
          this.avisoHidro.nomEsta=element.nomEsta;
          this.avisoHidro.latEsta=element.latEsta;
          this.avisoHidro.lonEsta=element.lonEsta;
          this.avisoHidro.altitudEsta=element.altitudEsta;
          this.avisoHidro.depEsta=element.depEsta;
          this.avisoHidro.provEsta=element.provEsta;
          this.avisoHidro.distEsta=element.distEsta;
          
          //aviso hidorlogico
          this.avisoHidro.codAviso=element.codAviso;
          this.avisoHidro.codNivel=element.codNivel;
          this.avisoHidro.colorNivel=element.colorNivel;
          this.avisoHidro.colorHexa=element.colorHexa;
          auxtiempoemi=new Date(element.fecEmi);
          this.avisoHidro.fecEmi=DIASTIEMPO[auxtiempoemi.getDay()]+', '+auxtiempoemi.getDate()+' de '+MESESTIEMPO[auxtiempoemi.getMonth()]+' del '+auxtiempoemi.getFullYear();
          this.avisoHidro.hrEmi=element.hrEmi+' hrs.';
          this.avisoHidro.nomTitulo=element.nomTitulo;
          //cast fecha de inicio
          auxtiempoini=new Date(element.fecIni);
          let hrs='0'+auxtiempoini.getHours()
          let mns='0'+auxtiempoini.getMinutes()

          this.avisoHidro.fecIni=DIASTIEMPO[auxtiempoini.getDay()]+', '+auxtiempoini.getDate()+' de '+MESESTIEMPO[auxtiempoini.getMonth()]
                  +' del '+auxtiempoini.getFullYear()+' a las '+hrs.slice(-2)+':'+mns.slice(-2)+' hrs.';              
          //cast fecha fin
          auxtiempofin=new Date(element.fecFin);
          let hrs2='0'+auxtiempofin.getHours()
          let mns2='0'+auxtiempofin.getMinutes()

          this.avisoHidro.fecFin=DIASTIEMPO[auxtiempofin.getDay()]+', '+auxtiempofin.getDate()+' de '+MESESTIEMPO[auxtiempofin.getMonth()]
                  +' del '+auxtiempofin.getFullYear()+' a las '+hrs2.slice(-2)+':'+mns2.slice(-2)+' hrs.';
                  
          this.avisoHidro.codPlazo=element.codPlazo;
          this.avisoHidro.nomPlazo=element.nomPlazo;
          this.avisoHidro.descrip1=element.descrip1;
          this.avisoHidro.descrip2=element.descrip2;
          this.avisoHidro.rutaImg=element.rutaImg;
          this.avisoHidro.msgRojo=element.msgRojo;
          this.avisoHidro.msgNaranja=element.msgNaranja;
          this.avisoHidro.msgAmarillo=element.msgAmarillo;
          this.avisoHidro.codTipoAviso= (element.codTipoAviso==null)?'Sin clasificación':element.codTipoAviso;
          this.avisoHidro.nomTipoAviso= (element.nomTipoAviso=="-")?'Sin descripción':element.nomTipoAviso;
          
          this.lugarAfectado=element.lugarAfectado;

          return true;
        }})

    })

    await loading.dismiss();

  }

  colorAviso(d){
    return parseInt(d) === 0
    ? 'blanco' //muy alto
    : parseInt(d) === 1 
    ? 'bannerAvisoAmarillo' //alto
    : parseInt(d) === 2
    ? 'bannerAvisoNaranja' //medio
    : parseInt(d) === 3 
    ? 'bannerAvisoRojo' //bajo
    : 'blanco'; //vacio
  }

  colortextoCuadro(d){
    return parseInt(d) != 0
    ? 'negro' //muy alto
    : 'datamain2'; //vacio
  }

  getProvDistAfectados(){
    let codigoProv='';
    let codigoDep='';
    this.cadenaidistritos="";
    let tabalresul ="<table class='tablavert'><thead><tr><th>DEPARTAMENTO</th><th>PROVINCIA</th><th>DISTRITO</th></tr></thead><tbody>";
    this.lugarAfectado.forEach(datos=>{
      if(codigoProv=="" && codigoDep==""){
        codigoDep=datos.codDep
        codigoProv=datos.codProv
        this.cadenaidistritos+="iddist='"+datos.codDep+datos.codProv+datos.codDist+"'";
        tabalresul +="<tr><td>"+datos.nomdep+"</td><td>"+datos.nomProv+"</td><td>"+datos.nomDist+"</td></tr>";
      }else{
        if(codigoDep!=datos.codDep){
          codigoDep=datos.codDep
          codigoProv=datos.codProv
          this.cadenaidistritos+=" or iddist='"+datos.codDep+datos.codProv+datos.codDist+"'";
          tabalresul +="<tr><td>"+datos.nomdep+"</td><td>"+datos.nomProv+"</td><td>"+datos.nomDist+"</td></tr>";

        }else if(codigoProv!=datos.codProv) {
          codigoProv=datos.codProv
          this.cadenaidistritos+=" or iddist='"+datos.codDep+datos.codProv+datos.codDist+"'";
          tabalresul +="<tr><td>&nbsp;</td><td>"+datos.nomProv+"</td><td>"+datos.nomDist+"</td></tr>";
        }else{
          this.cadenaidistritos+=" or iddist='"+datos.codDep+datos.codProv+datos.codDist+"'";
          tabalresul +="<tr><td>&nbsp;</td><td>&nbsp;</td><td>"+datos.nomDist+"</td></tr>";
        }
      }
    })
    tabalresul +="</tbody></table>";

    if(this.lugarAfectado.length<=0){
      tabalresul="No se ha registrado los lugares afectados";
    }

    return tabalresul;
  }

  async openModal(fecha) {

    const modal = await this.modalcontroler.create({
      component: AlertpopupmaphidroPage ,
      componentProps: {
        'codNivel': this.avisoHidro.codNivel,
        'colorNivel': this.avisoHidro.colorNivel,
        'fecIni': this.avisoHidro.fecIni,
        'fecFin':this.avisoHidro.fecFin,
        'latEsta': this.avisoHidro.latEsta,
        'lonEsta':this.avisoHidro.lonEsta,
        'lugarafectado':this.lugarAfectado,
        'lat':this.data.lat, 
        'lng':this.data.lng,
        'fechactual':fecha,
        'cql_filter': this.cadenaidistritos
        }
    });
    return await modal.present();
  }

  ionViewWillEnter(){
    this.storagese.hiddenButtonApp({
      main: true,
      search: true,
      share:true
    });
  }

}
