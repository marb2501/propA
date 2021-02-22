import { listaMapas } from './listamapasmet.model';

export class AvisoMeteoro{
   constructor(public numero?: string,   
               public titulo?: string,
               public codnivel?: string,
               public fecha?:string,
               public anioaviso?:string,
               public etiqalerta?:string,
               public fechaalerta?:string,
               public fechainialerta?:string,
               public horaemi?:string,
               public horaini?:string,
               public vaalerta?:number,
               public estadoaviso?:string,
               public descripcion1?:string,
               public descripcion2?:string,
               public codigoestacion?:string,
               public codNivel?: string,
               public descripcionGeneral?: string,
               public fechaEmision?: string,
               public fechaInicioEvento?: string,
               public fechaFinEvento?: string,
               public vaAlerta?:number,
               public listaMapas:Array<listaMapas>=[]
               ){}

}