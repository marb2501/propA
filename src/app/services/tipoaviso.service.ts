import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TipoAviso } from '../models/tipoaviso.model';
import { Observable } from 'rxjs';
import { dominioAvisosJava } from '../globales';

@Injectable({
  providedIn: 'root'
})
export class TipoavisoService {

  private url = dominioAvisosJava;

  constructor(public httptaviso: HttpClient) { }

  getTipoAviso(id):Observable<HttpResponse<TipoAviso[]>> {
        
    let urlEndPoint=this.url+'tipoaviso/'+id;
    return this.httptaviso.get<TipoAviso[]>(urlEndPoint,{ observe: 'response' });
  }
}
