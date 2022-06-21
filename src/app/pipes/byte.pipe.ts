import { Pipe, PipeTransform } from '@angular/core';


abstract class Information{
  public static Gigabyte : {size : number , symbol : string} = {size : 1073741824 , symbol : 'GB'};
  public static Megabyte : {size : number , symbol : string} = {size : 1048576 , symbol : 'MB'};
  public static Kilobyte : {size : number , symbol : string} = {size : 1024 , symbol : 'KB'};
}



@Pipe({
  name: 'byte'
})
export class BytePipe implements PipeTransform {

  transform(value: number): string {
    let size : number = 0;
    let symb : string = 'B';



    if(value +  1 >  Information.Gigabyte.size){
      size = value  / Information.Gigabyte.size;
      symb = Information.Gigabyte.symbol;
    }else if(value + 1 > Information.Megabyte.size){
      size = value / Information.Megabyte.size;
      symb = Information. Megabyte.symbol;
    }else if(value + 1> Information.Kilobyte.size ){
      size = value / Information.Kilobyte.size;
      symb = Information. Kilobyte.symbol;
    }else{
      size = value;
    }

  

    return `${size.toFixed(2)} ${symb}`;
  }

}
