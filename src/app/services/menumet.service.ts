import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dominioAvisosJava } from '../globales';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MenuMetApp } from '../models/menumet.model';

@Injectable({
  providedIn: 'root'
})
export class MenumetService {

  private url = dominioAvisosJava;
  dataMenuMetApp:MenuMetApp[];

  constructor(public httpMenuMetApp: HttpClient) { }

  getMenuMetApp():Observable<HttpResponse<MenuMetApp[]>> {
        
    let urlEndPoint=this.url+'menumetapp';
    

    return this.httpMenuMetApp.get<MenuMetApp[]>(urlEndPoint,{ observe: 'response' });
  }
}
