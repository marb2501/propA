
import { Lugarafectado } from './lugarafectado.model';
import { listaMapas } from './listamapasmet.model';

export class Avisosmethidg{
    constructor(
        //avisos  meteorologicos
       public anioAviso?: string,   
       public numero?: string,
       public titulo?: string,
       public codNivel?:string,
       public sedeAviso?:string,
       public etiqalerta?:string,
       public codunid?:string,
       public codenti?:string,
       public fechaEmision?:string,
       public fechaInicioEvento?:string,
       public fechaFinEvento?:string,
       public vaAlerta?:number,
       public descripcionGeneral?:string,
       public idAvisoc?:number,
       public flgEstado?:string,
       public flgTipoMod?:string,
        //avisos hidrologicos
       public codAviso?:number,
       public colorNivel?:string,
       public colorHexa?:string,
       public fecEmi?:string,
       public hrEmi?:string,
       public nomTitulo?:string,
       public fecIni?:string,
       public fecFin?:string,
       public estadoAviso?:string,
       public codPlazo?:number,
       public nomPlazo?:string,
       public codTipoAviso?: string,
       public nomTipoAviso?: string,
       public descrip1?:string,
       public descrip2?:string,
       public rutaImg?:string,
       public msgRojo?:string,
       public msgNaranja?:string,
       public msgAmarillo?:string,
       public codEsta?:string,
       public latEsta?:number,
       public lonEsta?:number,
       public altitudEsta?:number,
       public depEsta?:string,
       public provEsta?:string,
       public distEsta?:string,
       // array met
       public listaMapas:Array<listaMapas>=[],
       //array hid
       public lugarAfectado:Array<Lugarafectado>=[]
       ){}
 }




