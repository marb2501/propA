export class AvisoMeteoroIDESEP{
    constructor(public gid?: string,   
                public nroAviso?: number,
                public nroMapa?: number,
                public nivel?:number,
                public fechaEmision?:string,
                public codEvento?:string,
                public codFenomeno?:string,
                public fechaInicio?:string,
                public fechaFin?:string,
                public codSede?:string,
                public publica?:number
                ){}
 
 }