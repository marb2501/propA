import { Injectable } from '@angular/core';
import { Network} from '@ionic-native/network/ngx';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(public network:Network) { }

  verificarNetwork(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      Swal.fire({
        title:'Aviso',
        text:'No cuenta con una señal internet conectada para el funcionamiento del APP.',
        backdrop:false
      });
    });

    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('Conectado!');
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('Conexión wifi!');
        }
        if (this.network.type === 'ethernet') {
          console.log('Conexión ethernet!');
        }
        if (this.network.type === 'none') {
          console.log('No cuenta con conexión!');
        }
      }, 3000);
    });

  }

}
