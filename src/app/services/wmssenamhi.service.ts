import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { urlWSAvisosHidrologicos, urlIDESEPServMet, urlIDESEP24Horas,urlIDESEPDist,
  urlIDESEPQuebrada, urlIDESEPriesgo1, urlIDESEPriesgo2, urlIDESEPriesgo3, 
  urlIDESEPriesgo4, urlIDESEPriesgo5, urlIDESEPriesgo6, urlIDESEPRUV48, urlIDESEPRUV72, urlIDESEPAvisoMetLatLong} from '../globales';

@Injectable({
  providedIn: 'root'
})
export class WmssenamhiService {

  constructor(private nativeHttp: HTTP) { }

  getInfoAvisos(id,layeralerta,coordX, coordY){
        
    let url=this.getURLWMSAvisos(id);
   
    
    let coordXMin=coordX;
    let coordYMin=coordY;

    let coordXMax=0;
    let coordYMax=0;

    coordXMax=Number(coordX)+0.0000005;
    coordYMax=Number(coordY)+0.0000005;
    
    let wmsurl="";

    
    wmsurl=url+'?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS='+layeralerta+'&LAYERS='+layeralerta+'&INFO_FORMAT=application/json&I=206&J=326&WIDTH=412&HEIGHT=652&CRS=EPSG%3A4326&STYLES=&BBOX='+coordXMin+'%2C'+coordYMin+'%2C'+coordXMax+'%2C'+coordYMax;
    let native=this.nativeHttp.get(wmsurl,{},{'Content-type':'application/json'})

    return from(native).pipe();

  }


  getInfoAvisosPush(id,layeralerta,numeroaviso,fechainiaviso, coordX, coordY){
        
    let url='';

    if (id!=1){
      url=this.getURLWMSAvisos(id);

    }else{
      let auxh=fechainiaviso.substring(0,4)
      url=this.getURLWMSAvisos(id)+'?viewparams=qry:'+Number(numeroaviso)+"_1_"+auxh;
     // 'viewparams=qry:' + this.titulomodal + '_' + this.variable + '_' + this.anioref;
    }
   
    
    let coordXMin=coordX;
    let coordYMin=coordY;

    let coordXMax=0;
    let coordYMax=0;

    coordXMax=Number(coordX)+0.0000005;
    coordYMax=Number(coordY)+0.0000005;
    
    let wmsurl="";

    
    wmsurl=url+'?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS='+layeralerta+'&LAYERS='+layeralerta+'&INFO_FORMAT=application/json&I=206&J=326&WIDTH=412&HEIGHT=652&CRS=EPSG%3A4326&STYLES=&BBOX='+coordXMin+'%2C'+coordYMin+'%2C'+coordXMax+'%2C'+coordYMax;
   
    let native=this.nativeHttp.get(wmsurl,{},{'Content-type':'application/json'})
    return from(native).pipe();

  }


  getInfoAvisosA(id,layeralerta, coordX, coordY,coordmaxX, coordmaxY,ancho, alto, ejex,ejey){
    let url=this.getURLWMSAvisos(id);
    
    let coordXMin=coordX;
    let coordYMin=coordY;

    let coordXMax=0;
    let coordYMax=0;

    coordXMax=Number(coordmaxX)+0.0000005;
    coordYMax=Number(coordmaxY)+0.0000005;
    
    let wmsurl="";

    wmsurl=url+'?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS='+layeralerta+'&LAYERS='+layeralerta+'&INFO_FORMAT=application/json&I='+ejex.toFixed(0)+'&J='+ejey.toFixed(0)+'&WIDTH='+ancho+'&HEIGHT='+alto+'&CRS=EPSG%3A4326&STYLES=&BBOX='+coordXMin+'%2C'+coordYMin+'%2C'+coordXMax+'%2C'+coordYMax;
    let native=this.nativeHttp.get(wmsurl,{},{'Content-type':'application/json'})

    return from(native).pipe();

  }

  getInfoAvisosB(id,viewparam,layeralerta, coordX, coordY,coordmaxX, coordmaxY,ancho, alto, ejex,ejey){
    let url=this.getURLWMSAvisos(id)+'?';
    
    let coordXMin=coordX;
    let coordYMin=coordY;

    let coordXMax=0;
    let coordYMax=0;

    coordXMax=Number(coordmaxX)+0.0000005;
    coordYMax=Number(coordmaxY)+0.0000005;
    
    let wmsurl="";

    wmsurl=url+viewparam+'&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS='+layeralerta+'&LAYERS='+layeralerta+'&INFO_FORMAT=application/json&I='+ejex.toFixed(0)+'&J='+ejey.toFixed(0)+'&WIDTH='+ancho+'&HEIGHT='+alto+'&CRS=EPSG%3A4326&STYLES=&BBOX='+coordXMin+'%2C'+coordYMin+'%2C'+coordXMax+'%2C'+coordYMax;
    let native=this.nativeHttp.get(wmsurl,{},{'Content-type':'application/json'})

    

    return from(native).pipe();

  }

  getInfoAvisosNiveles(id,viewparam, layeralerta, coordX, coordY){//usando para filtrar los avisos por nivel segun posicion
    
    let url=this.getURLWMSAvisos(id)+'?';
    
    let coordXMin=coordX;
    let coordYMin=coordY;

    let coordXMax=0;
    let coordYMax=0;

    coordXMax=Number(coordX)+0.0000005;
    coordYMax=Number(coordY)+0.0000005;
    
    let wmsurl="";

    wmsurl=url+viewparam+'&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS='+layeralerta+'&LAYERS='+layeralerta+'&INFO_FORMAT=application/json&I=206&J=326&WIDTH=412&HEIGHT=652&CRS=EPSG%3A4326&STYLES=&BBOX='+coordXMin+'%2C'+coordYMin+'%2C'+coordXMax+'%2C'+coordYMax;
    let native=this.nativeHttp.get(wmsurl,{},{'Content-type':'application/json'})

    return from(native).pipe();

  }


   getInfoRUV(id,coordX, coordY){
    
    let url=this.getURLWMSRUV(id);
     
    let coordXMax=coordX+3;
    let coordYMax=coordY+3;

    let native=this.nativeHttp.get(url+coordX+'%2C'+coordY+'%2C'+coordXMax+'%2C'+coordYMax,{},{'Content-type':'application/json'})

    return from(native).pipe();

  }

  getInfoRiesgoClimatologico(id,ejex, ejey,minlan, minlng,maxlan, maxlng, ancho, alto){
    
    let url=this.getURLWMSRIESGOCLIMA(id);
    let wmsurl=url+"WIDTH="+ancho+"&HEIGHT="+alto+"&I="+ejex.toFixed(0)+'&J='+ejey.toFixed(0)+'&BBOX='+minlan+'%2C'+minlng+'%2C'+maxlan+'%2C'+maxlng;
    let native=this.nativeHttp.get(wmsurl,{},{'Content-type':'application/json'})

    return from(native).pipe();
  }
  

  private getURLWMSAvisos(id):string{
    switch(Number(id)){
      case 1 : return urlIDESEPServMet;break;
      case 2 : return urlIDESEP24Horas;break;
      default : return urlIDESEPQuebrada;break;
    }
  }

  private getURLWMSRUV(id):string{
    switch(Number(id)){
      case 1 : return urlIDESEPRUV48+'?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=g_03_04%3A03_04_001_03_001_513_0000_00_00&LAYERS=g_03_04%3A03_04_001_03_001_513_0000_00_00&INFO_FORMAT=application/json&FEATURE_COUNT=50&I=159&J=120&WIDTH=256&HEIGHT=256&CRS=EPSG%3A4326&STYLES=&BBOX=';break;
      default : return urlIDESEPRUV72+'?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=g_03_04%3A03_04_002_03_001_513_0000_00_00&LAYERS=g_03_04%3A03_04_002_03_001_513_0000_00_00&INFO_FORMAT=application/json&FEATURE_COUNT=50&I=240&J=194&WIDTH=256&HEIGHT=256&CRS=EPSG%3A4326&STYLES=&BBOX=';break;
    }
  }

  private getURLWMSRIESGOCLIMA(id):string{
    switch(Number(id)){
      //arroz//
      case 1 : return urlIDESEPriesgo1+'?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=g_11_01%3A11_01_001_03_001_531_0000_00_00&LAYERS=g_11_01%3A11_01_001_03_001_531_0000_00_00&INFO_FORMAT=application/json&FEATURE_COUNT=50&CRS=EPSG%3A4326&STYLES=&';break;
      //maiz//
      case 2 : return urlIDESEPriesgo2+'?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=g_11_02%3A11_02_001_03_001_531_0000_00_00&LAYERS=g_11_02%3A11_02_001_03_001_531_0000_00_00&INFO_FORMAT=application/json&FEATURE_COUNT=50&CRS=EPSG%3A4326&STYLES=&';break;
      //papa//
      case 3 : return urlIDESEPriesgo3+'?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=g_11_03%3A11_03_001_03_001_531_0000_00_00&LAYERS=g_11_03%3A11_03_001_03_001_531_0000_00_00&INFO_FORMAT=application/json&FEATURE_COUNT=50&CRS=EPSG%3A4326&STYLES=&';break;
      //cacao//
      case 4 : return urlIDESEPriesgo4+'?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=g_11_04%3A11_04_001_03_001_531_0000_00_00&LAYERS=g_11_04%3A11_04_001_03_001_531_0000_00_00&INFO_FORMAT=application/json&FEATURE_COUNT=50&CRS=EPSG%3A4326&STYLES=&';break;
      //cafe//
      case 5 : return urlIDESEPriesgo5+'?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=g_11_05%3A11_05_001_03_001_531_0000_00_00&LAYERS=g_11_05%3A11_05_001_03_001_531_0000_00_00&INFO_FORMAT=application/json&FEATURE_COUNT=50&CRS=EPSG%3A4326&STYLES=&';break;
      //pasto
      case 6 : return urlIDESEPriesgo6+'?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=g_11_06%3A11_06_001_03_001_531_0000_00_00&LAYERS=g_11_06%3A11_06_001_03_001_531_0000_00_00&INFO_FORMAT=application/json&FEATURE_COUNT=50&CRS=EPSG%3A4326&STYLES=&';break;
      default : return '';
    }
  }
  

  getAvisosHidrologicosVigentes(latitude: any, longitud: any) {
    const urlEndPoint = urlWSAvisosHidrologicos+longitud+'/'+latitude;
    let native=this.nativeHttp.get(urlEndPoint,{},{'Content-type':'application/json'})
    return from(native).pipe();
  }

  getAvisoMetIDESEPLatLon(latitude: any, longitud: any){
    const urlEndPoint=urlIDESEPAvisoMetLatLong+longitud+','+latitude;
    let native=this.nativeHttp.get(urlEndPoint,{},{'Content-type':'application/json'})
    return from(native).pipe();

  }

  getDistritoAvisoHidrologico(etiqueta,coordXMin, coordYMin,coordXMax, coordYMax,ancho, alto, ejex,ejey){
    const urlEndPoint=urlIDESEPDist+'?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS='+etiqueta+'&LAYERS='+etiqueta+'&INFO_FORMAT=application/json&I='+ejex.toFixed(0)+'&J='+ejey.toFixed(0)+'&WIDTH='+ancho+'&HEIGHT='+alto+'&CRS=EPSG%3A4326&STYLES=&BBOX='+coordXMin+'%2C'+coordYMin+'%2C'+coordXMax+'%2C'+coordYMax;
    let native=this.nativeHttp.get(urlEndPoint,{},{'Content-type':'application/json'})
    return from(native).pipe();
  }

}
