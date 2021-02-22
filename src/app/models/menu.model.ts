import { SubmenuApp } from './submenu.model';

export class MenuApp{
    constructor(public id?: string,   
       public title?: string,
       public url?: string,
       public icon?:string,
       public status?:number,
       public tipoenlace?:number,
       public open?:boolean,
       public submenu:Array<SubmenuApp>=[]
       ){}
 }
