import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  urlGeoposionLocation
} from '../globales';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  

  constructor(public http: HttpClient) { }

  

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

  getEstaciones(latitude: any, longitud: any): Observable<any> {
    const urlEndPoint = dominioEstacionesWS+longitud+'/'+latitude;
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      }),
    };
    return this.http
      .get(urlEndPoint, httpOptions)
      .pipe(map(results => results));
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

 


}