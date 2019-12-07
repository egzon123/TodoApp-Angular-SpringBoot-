import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'toString'})
export class ToString implements PipeTransform{
    transform(value){
        return value ? "Yes" : "No";
    }
}