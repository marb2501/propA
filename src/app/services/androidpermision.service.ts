import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AndroidpermisionService {

  constructor(
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private diagnostic: Diagnostic) { }

    async GPSOn() {
      this.diagnostic
        .getLocationMode()
        .then(state => {
          if (state === this.diagnostic.locationMode.LOCATION_OFF) {
            this.gpsOntAlert();
          } else {
            //alert('GPS habilitado');
          }
        })
        .catch(e => alert(e));
    }

    async gpsOntAlert() {
      Swal.fire({
        title:'Aviso',
        text:"GPS inhabilitado. Active el GPS desde la sección de ajustes. Caso contrario, definir en la opción de Búsqueda su ubicación referenciada.",
        backdrop:false
      });


      /*const alert = await this.alertController.create({
        backdropDismiss: false,
        header: 'GPS Inhabilitado',
        message:
          'Su <strong>GPS</strong> está desactivado, por favor <strong>actívelo</strong>!',
        buttons: [
          {
            text: 'IR A LA CONFIGURACIÓN',
            handler: () => {
              this.diagnostic.switchToLocationSettings();
            },
          },
        ],
      });
      await alert.present();*/
    }


    /*chckAppGpsPermission() {

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
                
        result => {
            if (result.hasPermission) {
            this.requestToSwitchOnGPS();
          } else {
            this.askGPSPermission();
          }
        },
        err => {
          Swal.fire({
            title:'Aviso',
            text:"Se recomienda activar su GPS desde su dispositivo o en la sección de ajustes. Caso contrario, definir en la opción de Búsqueda su ubicación referenciada.",
            backdrop:false
          });
        }
      );
    }

    askGPSPermission() {
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        if (canRequest) {
        } else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
            .then(
              (data) => {
                this.requestToSwitchOnGPS();
              },
              error => {
                
              }
            );
        }
      });
    }


    consultingAppGpsPermission(){
      let info=this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        if (canRequest) {
          return 1
        } else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
            .then(
              (data) => {
                return 1
              },
              error => {
                return 0
              }
            );
        }
      });
      alert("A");
      alert(info);
      return info
    }

    requestToSwitchOnGPS() {
      
      this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
        (data) => {
          alert("Accesso otorgado")
        },
        error => {
          alert("Acceso denegado3")
        }
      );
    }*/

}
