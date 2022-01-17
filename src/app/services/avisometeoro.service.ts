import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { AvisoMeteoro } from '../models/avisomet.model';
import { Observable } from 'rxjs';
import { urlWSAvisosHidrologicos, dominioAvisosMeteorologicos, dominioAvisoMetHidroPageMain, 
        urlIDESEPAvisoMetLatLong  } from '../globales';

import { AvisoHidroEstacion } from '../models/avisoshidroestacion.model';


@Injectable({
  providedIn: 'root'
})
export class AvisometeoroService {

  private url = dominioAvisosMeteorologicos;
  private ulrmainapp= dominioAvisoMetHidroPageMain;
  dataAviso:AvisoMeteoro[];
  dataAvisoH:AvisoHidroEstacion[];

  constructor(public httpAvisoMete: HttpClient, private nativeHttp: HTTP) { }

  getListaAvisoMeteoro() {
    let urlEndPoint=this.url+'avisometeoroHoy';
    this.nativeHttp.setRequestTimeout(120.0);
    let native=this.nativeHttp.get(urlEndPoint,{},{'Content-type':'application/json'})
    return from(native).pipe();
  }

  //se obtiene para el banner (met)
  getListaAvisoMeteoroGeoposicion(dep, prov, dist) {
    let urlEndPoint=this.url+'avisometeorodepprovdist/'+dep+'/'+prov;
    this.nativeHttp.setRequestTimeout(120.0);
    let native=this.nativeHttp.get(urlEndPoint,{},{'Content-type':'application/json'})
    return from(native).pipe();
  }

  getListaAvisoMeteoroDepGeoposicion(dep) {
    let urlEndPoint=this.url+'avisometeorodep/'+dep;
    this.nativeHttp.setRequestTimeout(120.0);
    let native=this.nativeHttp.get(urlEndPoint,{},{'Content-type':'application/json'})
    return from(native).pipe();
  }

  //se va a corregir este aviso, se va a concatenar dos 
  getListaAvisoMetHidGeoposicion(dep, prov, dist) {
    let urlEndPoint=this.ulrmainapp+dep+'/'+prov;
    this.nativeHttp.setRequestTimeout(120.0);
    let native=this.nativeHttp.get(urlEndPoint,{},{'Content-type':'application/json'})
    return from(native).pipe();
  }

  //avisos hidrologicos
  getListaAvisoHidrologicos() {
    let urlEndPoint=this.url+'avisohidroHoy';
    this.nativeHttp.setRequestTimeout(120.0);
    let native=this.nativeHttp.get(urlEndPoint,{},{'Content-type':'application/json'})
    return from(native).pipe();
  }

  getListaAvisoHidroGeoposicion(dep, prov, dist) {
    let urlEndPoint=this.url+'avisohidrodepprovdist/'+dep+'/'+prov;
    this.nativeHttp.setRequestTimeout(120.0);
    let native=this.nativeHttp.get(urlEndPoint,{},{'Content-type':'application/json'})
    return from(native).pipe();
  }

  getListaAvisoHidroDepGeoposicion(dep) {
    let urlEndPoint=this.url+'avisohidrodep/'+dep;
    this.nativeHttp.setRequestTimeout(120.0);
    let native=this.nativeHttp.get(urlEndPoint,{},{'Content-type':'application/json'})
    return from(native).pipe();
  }

  //obtiene para el banner (hid) 
  getAvisosHidrologicosLatLong(latitude: any, longitud: any) {
    const urlEndPoint = urlWSAvisosHidrologicos+longitud+'/'+latitude;
    this.nativeHttp.setRequestTimeout(120.0);
    let native=this.nativeHttp.get(urlEndPoint,{},{'Content-type':'application/json'})
    return from(native).pipe();
  }

  getAvisosHidrologicos() {
    const urlEndPoint = urlWSAvisosHidrologicos;
    this.nativeHttp.setRequestTimeout(120.0);
    let native=this.nativeHttp.get(urlEndPoint,{},{'Content-type':'application/json'})
    return from(native).pipe();
  }

  getAvisoMetIDESEPLatLon(latitude: any, longitud: any){
    const urlEndPoint=urlIDESEPAvisoMetLatLong+longitud+','+latitude;
    this.nativeHttp.setRequestTimeout(120.0);
    let native=this.nativeHttp.get(urlEndPoint,{},{'Content-type':'application/json'})
    return from(native).pipe();

  }

}
