import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TipoAlerta } from '../models/tipoalerta.model';
import { Observable } from 'rxjs';
import { dominioAvisosJava } from '../globales';

@Injectable({
  providedIn: 'root'
})
export class TipoalertaService {

  private url = dominioAvisosJava;

  constructor(public httptalerta: HttpClient) { }

  getTipoAlerta(id):Observable<HttpResponse<TipoAlerta[]>> {
        
    let urlEndPoint=this.url+'tipoalerta/'+id;
    return this.httptalerta.get<TipoAlerta[]>(urlEndPoint,{ observe: 'response' });
  }
}
