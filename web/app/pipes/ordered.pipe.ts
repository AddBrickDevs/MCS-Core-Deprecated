import {Pipe, PipeTransform} from "@angular/core"

@Pipe({name: 'orderBy'})
export class OrderedPipe implements PipeTransform {

    transform(array: Array<string>, args:string):Array<string> {
        return array;
    }

}