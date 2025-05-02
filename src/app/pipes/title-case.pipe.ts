import { Pipe, PipeTransform } from '@angular/core'
import { startCase } from 'lodash-es'

@Pipe({
    name: 'titleCase',
})
export class TitleCasePipe implements PipeTransform {
    transform(value: string): unknown {
        return startCase(value)
    }
}
