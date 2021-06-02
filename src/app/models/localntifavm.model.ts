export class LocalNtifAVM{
    constructor( 
       public title?: string,
       public text?: string,
       public icon?:string,
       public smallIcon?:string,
       public sticky?:boolean,
       public lockscreen?:boolean,
       public foreground?:boolean,
       public vibrate?:boolean,
       public priority?:number,
       public sound?:string,
       public silent?:boolean,
       public wakeup?:boolean,
       public group?: string
       ){}
 }