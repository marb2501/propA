import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dominioAvisosJava } from '../globales';
import { MenuApp } from '../models/menu.model';


@Injectable({
  providedIn: 'root'
})
export class MenuappService {

  private url = dominioAvisosJava;
  dataMenu:MenuApp[];

  constructor(public httpMenuApp: HttpClient) { }

  getMenu():Observable<HttpResponse<MenuApp[]>> {
        
    let urlEndPoint=this.url+'menuapp';
    

    return this.httpMenuApp.get<MenuApp[]>(urlEndPoint,{ observe: 'response' });
  }

 

}
