import { Component, OnInit } from '@angular/core';
import { AvisometeoroService } from '../../services/avisometeoro.service';
import { AvisoMeteoro } from '../../models/avisomet.model';
import { HttpResponse } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { AvisosmetmapmainPage } from '../../pages/avisosmetmapmain/avisosmetmapmain.page';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss'],
})
export class PopinfoComponent implements OnInit {

  public avisoMetoro: AvisoMeteoro[];
  constructor(public avisoMeteoro: AvisometeoroService,
              private modalcontrollerMain: ModalController) { }

  ngOnInit() {
    this.cargaListadoAvisoMeteoro();
  }

  async cargaListadoAvisoMeteoro(){



    this.avisoMeteoro.getListaAvisoMeteoro()
      .subscribe(async (listaavisomet) =>{
        this.avisoMetoro=JSON.parse(listaavisomet.data);
      }, (error)=>{this.avisoMetoro=[];console.log(error)});
  }

  async openModal(layer, numero, titulo, fechaaviso, vigencia) {
    const modal = await this.modalcontrollerMain.create({
      component: AvisosmetmapmainPage,
      componentProps: {
        'layer': layer,
        'numero': numero,
        'tituloA': titulo,
        'fechaini': fechaaviso,
        'vigencia': vigencia
      }
    });
    return await modal.present();
  }

  getColor(d){
    return parseInt(d) === 0
      ? 'blanco' //muy alto
      : parseInt(d) === 1 
      ? 'amarillo' //alto
      : parseInt(d) === 2
      ? 'naranja' //medio
      : parseInt(d) === 3 
      ? 'rojo' //bajo
      : 'blanco'; //vacio
  };

}
