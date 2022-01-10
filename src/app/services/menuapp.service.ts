import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dominioAvisosJava, dominioMenuApp } from '../globales';
import { MenuApp } from '../models/menu.model';
import { HTTP } from '@ionic-native/http/ngx';
import { from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuappService {

  private url = dominioAvisosJava;
  private urlmenu= dominioMenuApp;
  dataMenu:MenuApp[];

  constructor(public httpMenuApp: HttpClient, private nativeHttp: HTTP) { }

  getMenu():Observable<HttpResponse<MenuApp[]>> {
        
    let urlEndPoint=this.url+'menuapp';
    

    return this.httpMenuApp.get<MenuApp[]>(urlEndPoint,{ observe: 'response' });
  }

  getMenu1(){
    this.nativeHttp.setRequestTimeout(120.0);
    let native=this.nativeHttp.get(this.urlmenu,{},{'Content-type':'application/json'})
    return from(native).pipe();

  }

 

}
