import { CharacterSize } from './game'

export const SizeAmourClassMap = {
    [CharacterSize.FINE]: 8,
    [CharacterSize.DIMINUTIVE]: 4,
    [CharacterSize.TINY]: 2,
    [CharacterSize.SMALL]: 1,
    [CharacterSize.MEDIUM]: 0,
    [CharacterSize.LARGE]: -1,
    [CharacterSize.HUGE]: -2,
    [CharacterSize.GARGANTUAN]: -4,
    [CharacterSize.COLOSSAL]: -8,
}
