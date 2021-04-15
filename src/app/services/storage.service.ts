import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { PushnotiService } from './pushnoti.service';


export interface Geolocaposicion{
  id:number,
  lat:number,
  long:number,
  ciudad:string,
  coddep:string,
  codprov:string,
  coddist:string
}

export interface FavoritosBR{
  id:number,
  lat:number,
  long:number,
  ciudad:string,
  coddep:string,
  codprov:string,
  coddist:string
}

export interface BusquedaR{
  id:number,
  lat:number,
  long:number,
  ciudad:string,
  coddep:string,
  codprov:string,
  coddist:string
}



const ITEM_KEY_GP='itemKeyGP';
const ITEM_KEY_BFV='itemKeyBFV';
const ITEM_KEY_BR='itemKeyBR';
const ITEM_KEY_NCF='itemKeyNFondo';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public theme: BehaviorSubject<String>
  private fooSubject = new Subject<any>();

  constructor(private storage:Storage,  private plt:Platform, private pushNot:PushnotiService) { 
    this.theme = new BehaviorSubject('dark-theme');
  }

  //seccion dato para cambio de infomracion en el app
  async additemGeoposition(itemGPST:Geolocaposicion):Promise<any>{
    return await this.storage.get(ITEM_KEY_GP).then((items1:Geolocaposicion[])=>{
      if(items1){
        let newItemsInsertGP:Geolocaposicion[] = [];
        for(let i1 of items1){
          newItemsInsertGP.push(i1);
        }
        newItemsInsertGP.push(itemGPST);
        return this.storage.set(ITEM_KEY_GP,newItemsInsertGP)
      }else{
        return this.storage.set(ITEM_KEY_GP,[itemGPST])
      }
    });
  }

  async getitemGeoposition():Promise<Geolocaposicion[]>{
    return await this.storage.get(ITEM_KEY_GP);
  }

  updateitemGeoposition(itemGPST:Geolocaposicion):Promise<any>{
    return this.storage.get(ITEM_KEY_GP).then((items1:Geolocaposicion[])=>{
      if(!items1 || items1.length===0){
          return null;
      }

      let newItemsA:Geolocaposicion[] = [];
      for(let i1 of items1){
        if(i1.id === itemGPST.id){
          newItemsA.push(itemGPST);
        } else{
          newItemsA.push(i1);
        }
      }

      return this.storage.set(ITEM_KEY_GP,newItemsA);
    });
  }

  async deleteitemGeoposition(id:number):Promise<Geolocaposicion>{
    return await this.storage.get(ITEM_KEY_GP).then((items1:Geolocaposicion[])=>{
      if(!items1 || items1.length===0){
        return null;
      }

      let toKeep: Geolocaposicion[] = [];

      for (let i of items1){
        if(i.id!==id){
          toKeep.push(i)
        }
      }

      return this.storage.set(ITEM_KEY_GP,toKeep);

    });
  }

  async deleteAllGeoposition():Promise<Geolocaposicion>{
    return await this.storage.get(ITEM_KEY_GP).then(()=>{
      let toKeep: Geolocaposicion[] = [];
      return this.storage.set(ITEM_KEY_GP,toKeep);
    });
  }
  
  /***********************************************************************************/

  //seccion datos de favoritos almacenados
  additemFavoritos(itemFavST:FavoritosBR):Promise<any>{
    return this.storage.get(ITEM_KEY_BFV).then((items2:FavoritosBR[])=>{
      if(items2){
        let newItemsInsertFV:FavoritosBR[] = [];
        for(let i1 of items2){
          newItemsInsertFV.push(i1);
        }
        newItemsInsertFV.push(itemFavST);
        return this.storage.set(ITEM_KEY_BFV,newItemsInsertFV)
      }else{
        return this.storage.set(ITEM_KEY_BFV,[itemFavST])
      }
    });
  }

  getitemFavoritos():Promise<FavoritosBR[]>{
    return this.storage.get(ITEM_KEY_BFV);
  }
  

  updateitemFavoritos(itemFavST:FavoritosBR):Promise<any>{
    return this.storage.get(ITEM_KEY_BFV).then((items2:FavoritosBR[])=>{
      if(!items2 || items2.length===0){
          return null;
      }

      let newItemsB:FavoritosBR[] = [];
      for(let i1 of items2){
        if(i1.id === itemFavST.id){
          newItemsB.push(itemFavST);
        } else{
          newItemsB.push(i1);
        }
      }

      return this.storage.set(ITEM_KEY_BFV,newItemsB);
    });
  }

  deleteitemFavoritos(id:number):Promise<FavoritosBR>{
    return this.storage.get(ITEM_KEY_BFV).then((items2:FavoritosBR[])=>{
      if(!items2 || items2.length===0){
        return null;
      }

      let toKeep: FavoritosBR[] = [];

      for (let i of items2){
        if(i.id!==id){
          toKeep.push(i)
        }
      }

      return this.storage.set(ITEM_KEY_BFV,toKeep);

    });
  }

  /***********************************************************************************/
  //seccion datos de busqedas almacenados
  additemBusquedaR(itemRST:BusquedaR):Promise<any>{
    return this.storage.get(ITEM_KEY_BR).then((items3:BusquedaR[])=>{
      if(items3){
        let newItemsInsert:BusquedaR[] = [];
        for(let i1 of items3){
          newItemsInsert.push(i1);
        }
        newItemsInsert.push(itemRST);
        return this.storage.set(ITEM_KEY_BR,newItemsInsert)
      }else{
        return this.storage.set(ITEM_KEY_BR,[itemRST])
      }
    });
  }

  getitemBusquedaR():Promise<BusquedaR[]>{
    return this.storage.get(ITEM_KEY_BR);
  }
  

  updateitemBusquedaR(itemRST:BusquedaR):Promise<any>{
    return this.storage.get(ITEM_KEY_BR).then((items3:BusquedaR[])=>{
      if(!items3 || items3.length===0){
          return null;
      }

      let newItemsC:BusquedaR[] = [];
      for(let i1 of items3){
        if(i1.id === itemRST.id){
          newItemsC.push(itemRST);
        } else{
          newItemsC.push(i1);
        }
      }

      return this.storage.set(ITEM_KEY_BR,newItemsC);
    });
  }
 
  deleteitemBusquedaR(id:number):Promise<BusquedaR>{
    return this.storage.get(ITEM_KEY_BR).then((items3:BusquedaR[])=>{
      if(!items3 || items3.length===0){
        return null;
      }

      let toKeep: BusquedaR[] = [];

      for (let i of items3){
        if(i.id!==id){
          toKeep.push(i)
        }
      }

      return this.storage.set(ITEM_KEY_BR,toKeep);

    });
  }


  deleteallitemBusquedaR():Promise<BusquedaR>{
   return this.storage.remove(ITEM_KEY_BR)
  }




  /*******************************************************************************/
  //seccion datos de colordatos
  async setActiveTheme(val){
    this.additemColorFondo(val).then((w)=>{
       this.theme.next(w);
    });
  } 
  
  getActiveTheme(){
    return this.theme.asObservable();
  }

  async additemColorFondo(itemRST:String):Promise<string>{
    return this.storage.set(ITEM_KEY_NCF,itemRST);
  }

  getitemColor():Promise<string>{
     return this.storage.get(ITEM_KEY_NCF)
  }

  borrartodo(){
    this.storage.clear();
  }

  //activacion y desactivacion de notificaciones
  async isActiveLocalNotifications() {
    let value =  await this.storage.get('localNotificationsEnabled') || [];
    return value === '1';
  }

  async isActiveExternalNotifications() {
    let value =  await this.storage.get('externalNotificationsEnabled') || [];
    return value === '1';
  }

  saveStatusLocalNotification(enabled:boolean) {
    this.storage.set('localNotificationsEnabled', enabled? '1' : '0' );
  }

  async saveStatusExternalNotification(enabled:boolean) {
    this.storage.set('externalNotificationsEnabled', enabled? '1' : '0' );
    await this.pushNot.toggleOneSignalNotifications(enabled);
  }

  //ocultamiento botones
  hiddenButtonApp(data: any) {
    this.fooSubject.next(data);
  }

  getObservable(): Subject<any> {
    return this.fooSubject;
  }

}
