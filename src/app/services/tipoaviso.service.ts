import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TipoAviso } from '../models/tipoaviso.model';
import { Observable } from 'rxjs';
import { dominioAvisosJava, dominioTipoAvisoMet } from '../globales';
import { HTTP } from '@ionic-native/http/ngx';
import { from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoavisoService {

  private url = dominioAvisosJava;
  private urlmenu= dominioTipoAvisoMet;

  constructor(public httptaviso: HttpClient, private nativeHttp: HTTP) { }

  getTipoAviso(id):Observable<HttpResponse<TipoAviso[]>> {
        
    let urlEndPoint=this.url+'tipoaviso/'+id;
    return this.httptaviso.get<TipoAviso[]>(urlEndPoint,{ observe: 'response' });
  }

  /*getTipoAviso(id){
    this.nativeHttp.setRequestTimeout(120.0);
    let native=this.nativeHttp.get(this.urlmenu,{},{'Content-type':'application/json'})
    return from(native).pipe();
  }*/
}
