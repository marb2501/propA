import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AvisoApp } from '../models/avisosapp.model';
import { Observable } from 'rxjs';
import { dominioAvisosJava } from '../globales';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AvisosappService {

  private url = dominioAvisosJava;
  dataAviso:AvisoApp[];

  constructor(public httpAvisoApp: HttpClient) { }

  getListaAvisosAppActual(id):Observable<HttpResponse<AvisoApp[]>> {
    let dt= moment().toDate();
    let anio=dt.getFullYear();
    
    let urlEndPoint=this.url+'avisosappAnio/'+id+'/'+anio;
    return this.httpAvisoApp.get<AvisoApp[]>(urlEndPoint,{ observe: 'response' });
  }

}
