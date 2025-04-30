import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'abbreviateAbility',
})
export class AbbreviateAbilityPipe implements PipeTransform {
    transform(value: string, capitalise: boolean): unknown {
        return capitalise ? value.substring(0, 3).toUpperCase() : value.substring(0, 3).toLowerCase()
    }
}
