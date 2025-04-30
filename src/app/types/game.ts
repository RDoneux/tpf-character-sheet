export const CharacterExperienceTable = [
    0, 1000, 3000, 6000, 10000, 15000, 21000, 28000, 36000, 45000, 55000, 66000, 78000, 91000, 105000, 120000, 136000,
    153000, 171000, 190000,
]

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

export const CraftSpecialisation = {
    ALCHEMY: 'Alchemy',
    ARMORSMITHING: 'Armorsmithing',
    BLACKSMITHING: 'Blacksmithing',
    BOWMAKING: 'Bowmaking',
    CARPENTRY: 'Carpentry',
    COBBLING: 'Cobbling',
    GEMCUTTING: 'Gemcutting',
    LEATHERWORKING: 'Leatherworking',
    PAINTING: 'Painting',
    POTTERY: 'Pottery',
    SCULPTING: 'Sculpting',
    SHIPMAKING: 'Shipmaking',
    STONEMASONING: 'Stonemasonry',
    TRAPMAKING: 'Trapmaking',
    WEAPONSMITHING: 'Weaponsmithing',
    WOODWORKING: 'Woodworking',
}
export type CraftSpecialisation = (typeof CraftSpecialisation)[keyof typeof CraftSpecialisation]

export const KnowledgeSpecialisation = {
    ARCANA: 'Arcana',
    ARCHITECTURE_AND_ENGINEERING: 'Architecture and Engineering',
    DUNGEONEERING: 'Dungeoneering',
    GEOGRAPHY: 'Geography',
    HISTORY: 'History',
    LOCAL: 'Local',
    NATURE: 'Nature',
    NOBILITY_AND_ROYALTY: 'Nobility and Royalty',
    PSIONICS: 'Psionics',
    RELIGION: 'Religion',
    THE_PLANES: 'The Planes',
    PHILOSOPHY: 'Philosophy',
}
export type KnowledgeSpecialisation = (typeof KnowledgeSpecialisation)[keyof typeof KnowledgeSpecialisation]

export const PerformSpecialisation = {
    ACT: 'Act',
    COMEDY: 'Comedy',
    DANCE: 'Dance',
    KEYBOARD_INSTRUMENTS: 'Keyboard Instruments',
    ORATORY: 'Oratory',
    PERCUSSION_INSTRUMENTS: 'Percussion Instruments',
    STRING_INSTRUMENTS: 'String Instruments',
    WIND_INSTRUMENTS: 'Wind Instruments',
    SING: 'Sing',
}
export type PerformSpecialisation = (typeof PerformSpecialisation)[keyof typeof PerformSpecialisation]

export const ProfessionSpecialisation = {
    APOTHECARY: 'Apothecary',
    BREWER: 'Brewer',
    COOK: 'Cook',
    DRIVER: 'Driver',
    FARMER: 'Farmer',
    FISHERMAN: 'Fisherman',
    HERBALIST: 'Herbalist',
    HUNTER: 'Hunter',
    INNKEEPER: 'Innkeeper',
    LIBRARIAN: 'Librarian',
    MERCHANT: 'Merchant',
    MIDWIFE: 'Midwife',
    MILLER: 'Miller',
    MINER: 'Miner',
    PORTER: 'Porter',
    SAILOR: 'Sailor',
    SCRIBE: 'Scribe',
    SHEPHERD: 'Shepherd',
    TANNER: 'Tanner',
    TEAMSTER: 'Teamster',
    WOODCUTTER: 'Woodcutter',
}
export type ProfessionSpecialisation = (typeof ProfessionSpecialisation)[keyof typeof ProfessionSpecialisation]
