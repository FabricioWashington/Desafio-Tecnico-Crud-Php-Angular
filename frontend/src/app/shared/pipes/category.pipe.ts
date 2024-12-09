import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: ''
})
export class CategoryPipe implements PipeTransform {

  transform(value: string): string {
    switch(value){

    }
    return '';
  }

}
