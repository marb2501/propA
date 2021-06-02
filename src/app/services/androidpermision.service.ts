import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AndroidpermisionService {

  options: GeolocationOptions;
  optionsNative: NativeGeocoderOptions;
  currentPost: Geoposition;

  constructor(
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private geolocation: Geolocation,
    private diagnostic: Diagnostic) { }

    async ValidacionGPSLocation() {
      this.options = {
        timeout: 10000,
        maximumAge: 3000,
        enableHighAccuracy: true
      };
    
      this.optionsNative = {
        useLocale: true,
        maxResults: 5
      };

      let info;

      await this.geolocation.getCurrentPosition(this.options).then(
        async (pos: Geoposition) => {
            info=1        
         }).catch(e=>{
            info=0
        })

        return info
    }

    async gpsOntAlert() {
      Swal.fire({
        title:'Aviso',
        text:"GPS inhabilitado. Active el GPS desde su dispositivo. Caso contrario, definir en la opción de Búsqueda su ubicación referenciada.",
        backdrop:false
      });
    }

   

}
