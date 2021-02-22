import { Lugarafectado } from './lugarafectado.model';
export class AvisoHidroEstacion{
    constructor(public codAviso?:number,
        public codNivel?:number,
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
        public lugarAfectado:Array<Lugarafectado>=[]
       ){}
 }
 