export const CharacterClass = {
    BARBARIAN: 'Barbarian',
    BARD: 'Bard',
    CLERIC: 'Cleric',
    DRUID: 'Druid',
    FIGHTER: 'Fighter',
    MONK: 'Monk',
    PALADIN: 'Paladin',
    RANGER: 'Ranger',
    ROGUE: 'Rogue',
    SORCER: 'Wizard',
}
export type CharacterClass = (typeof CharacterClass)[keyof typeof CharacterClass]

export const CharacterRace = {
    HUMAN: 'Human',
    DWARF: 'Dwarf',
    ELF: 'Elf',
    GNOME: 'Gnome',
    HALFELF: 'Half-Elf',
    HALFORC: 'Half-Orc',
    HALFLING: 'Halfling',
}
export type CharacterRace = (typeof CharacterRace)[keyof typeof CharacterRace]

export const CharacterAlignment = {
    LAWFUL_GOOD: 'Lawful Good',
    NEUTRAL_GOOD: 'Neutral Good',
    CHAOTIC_GOOD: 'Chaotic Good',
    LAWFUL_NEUTRAL: 'Lawful Neutral',
    TRUE_NEUTRAL: 'True Neutral',
    CHAOTIC_NEUTRAL: 'Chaotic Neutral',
    LAWFUL_EVIL: 'Lawful Evil',
    NEUTRAL_EVIL: 'Neutral Evil',
    CHAOTIC_EVIL: 'Chaotic Evil',
}
export type CharacterAlignment = (typeof CharacterAlignment)[keyof typeof CharacterAlignment]

export const CharacterSize = {
    FINE: 'Fine',
    DIMINUTIVE: 'Diminutive',
    TINY: 'Tiny',
    SMALL: 'Small',
    MEDIUM: 'Medium',
    LARGE: 'Large',
    HUGE: 'Huge',
    GARGANTUAN: 'Gargantuan',
    COLOSSAL: 'Colossal',
}
export type CharacterSize = (typeof CharacterSize)[keyof typeof CharacterSize]
