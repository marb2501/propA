import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs';
import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NominatimResponse } from '../models/nominatimresponse.model';
import {
  wslmainpronostico,
  dominioEstacionesWS,
  schemamain,
  pkgubicac,
  pkgresumen,
  urlSearchLocation,
  urlGeoposionLocation,
  urlIDESEPDist,
  dominioAvisosJava, urlIDESEPVerificaPeru
} from '../globales';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlvideo = dominioAvisosJava;
  

  constructor(public http: HttpClient, private nativeHttp: HTTP) { }

  

  getCurrentTemperature(latitude: any, longitud: any): Observable<any> {

    let body = "p_schema=" + schemamain +
      "&p_pkg=" + pkgubicac +
      "&p_param=" + '[\"' + latitude + '\",\"' + longitud + '\"]';
    const urlEndPoint = wslmainpronostico;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }),
    };

    return this.http
      .post(urlEndPoint, body, httpOptions)
      .pipe(map(results => results));
  }

  getCurrentDataTime(latitude: any, longitud: any): Observable<any> {

    let body = "p_schema=" + schemamain +
      "&p_pkg=" + pkgresumen +
      "&p_param=" + '[\"' + latitude + '\",\"' + longitud + '\"]';

    const urlEndPoint = wslmainpronostico;
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }),
    };

    return this.http
      .post(urlEndPoint, body, httpOptions)
      .pipe(map(results => results));
  }

    /*getEstaciones(latitude: any, longitud: any): Observable<any> {
    const urlEndPoint = dominioEstacionesWS+longitud+'/'+latitude;
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      }),
    };
    return this.http
      .get(urlEndPoint, httpOptions)
      .pipe(map(results => results));
  }*/

  getEstaciones(latitude: any, longitud: any): Observable<any> {
    const urlEndPoint = dominioEstacionesWS+longitud+'/'+latitude;
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      }),
    };
    return this.http
      .get(urlEndPoint, httpOptions)
      .pipe(map(function (results){
                const list=results as any;
                
                list.map(function(dat){
                  const myDate = moment(dat.fecha,'YYYY-MM-DD hh:mm a').toDate();
                  let hrsaux=myDate.getHours();
                  let mns='0'+myDate.getMinutes();
                  let ampm = hrsaux >= 12 ? 'pm' : 'am';
                  let hrsn = hrsaux > 12 ? hrsaux-12 : hrsaux;
                  let hrs='0'+hrsn;
                  dat.fecha=hrs.slice(-2)+":"+mns.slice(-2)+" "+ampm;
                })
                
                return list;
              })
           );
  }


  addressLookup(req?: any): Observable<NominatimResponse[]> {
    let urlEndPoint='';
    urlEndPoint=urlSearchLocation+req;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      }),
    };

    return this.http
      .get(urlEndPoint, httpOptions).pipe(
        map((data: any[]) => data.map((item: any) => new NominatimResponse(
          item.lat,
          item.lon,
          item.display_name,
          item.osm_id
          ))
        )
      )

  }

  getInfoSearchOMS(omsid): Observable<any> {
    const urlEndPoint = urlGeoposionLocation+omsid
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      }),
    };

    return this.http
      .get(urlEndPoint, httpOptions)
      .pipe(catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        return throwError(e)
      }));
  }

  getUbicacionCoordLatLong(lat,long){
    const urlEndPoint = urlSearchLocation+lat+'%2C'+long
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      }),
    };

    return this.http
      .get(urlEndPoint, httpOptions)
      .pipe(catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        return throwError(e)
      }));

  }


  getDepProvDist(lat,long){
    let url=urlIDESEPDist;
    let coordXMin=lat;
    let coordYMin=long;

    let coordXMax=0;
    let coordYMax=0;

    coordXMax=Number(coordXMin)+0.0000005;
    coordYMax=Number(coordYMin)+0.0000005;
    
    let wmsurl="";

    
    wmsurl=url+'?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=g_carto_fundamento:distritos&LAYERS=g_carto_fundamento:distritos&INFO_FORMAT=application/json&I=122&J=314&WIDTH=412&HEIGHT=652&CRS=EPSG%3A4326&STYLES=&BBOX='+coordXMin+'%2C'+coordYMin+'%2C'+coordXMax+'%2C'+coordYMax;
   
    let native=this.nativeHttp.get(wmsurl,{},{'Content-type':'application/json'})
    return from(native).pipe();

  }

  getVideoEstacion(){
    let urlvideo=this.urlvideo+'getvideoapp';
    let native=this.nativeHttp.get(urlvideo,{},{'Content-type':'application/json'})
    return from(native).pipe();
  }

  getVerificaTerritorioPeru(lat,long){
    let urlver=urlIDESEPVerificaPeru+long+'/'+lat;
    let native=this.nativeHttp.get(urlver,{},{'Content-type':'application/json'})
    return from(native).pipe();
  }

}