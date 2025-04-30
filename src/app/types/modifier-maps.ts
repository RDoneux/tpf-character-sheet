import { Skill } from '../core/skills/interfaces/i-skills'
import {
    CharacterClass,
    CharacterSize,
    CraftSpecialisation,
    KnowledgeSpecialisation,
    PerformSpecialisation,
    ProfessionSpecialisation,
} from './game'

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

export const ClassSkillsMap: { [key: CharacterClass]: Skill[] } = {
    [CharacterClass.BARD]: [
        Skill.CONCENTRATION,
        Skill.DECIPHER_SCRIPT,
        Skill.PROFESSION,
        Skill.SPELLCRAFT,
        Skill.TUMBLE,
    ],
    [CharacterClass.BARBARIAN]: [
        Skill.CLIMB,
        Skill.CRAFT,
        Skill.HANDLE_ANIMAL,
        Skill.INTIMIDATE,
        Skill.JUMP,
        Skill.LISTEN,
        Skill.PROFESSION,
        Skill.RIDE,
        Skill.SURVIVAL,
    ],
    [CharacterClass.CLERIC]: [Skill.CONCENTRATION, Skill.PROFESSION, Skill.SPELLCRAFT],
    [CharacterClass.DRUID]: [
        Skill.CONCENTRATION,
        Skill.HANDLE_ANIMAL,
        Skill.PROFESSION,
        Skill.SPELLCRAFT,
        Skill.SURVIVAL,
    ],
    [CharacterClass.FIGHTER]: [Skill.CLIMB, Skill.HANDLE_ANIMAL, Skill.PROFESSION, Skill.RIDE],
    [CharacterClass.MONK]: [
        Skill.BALANCE,
        Skill.CLIMB,
        Skill.CONCENTRATION,
        Skill.ESCAPE_ARTIST,
        Skill.HIDE,
        Skill.JUMP,
        Skill.LISTEN,
        Skill.MOVE_SILENTLY,
        Skill.TUMBLE,
    ],
    [CharacterClass.PALADIN]: [Skill.CONCENTRATION, Skill.HANDLE_ANIMAL, Skill.PROFESSION, Skill.RIDE],
    [CharacterClass.RANGER]: [
        Skill.CLIMB,
        Skill.CONCENTRATION,
        Skill.HANDLE_ANIMAL,
        Skill.LISTEN,
        Skill.PROFESSION,
        Skill.RIDE,
        Skill.SEARCH,
        Skill.SURVIVAL,
        Skill.SWIM,
    ],
    [CharacterClass.ROGUE]: [
        Skill.BALANCE,
        Skill.BLUFF,
        Skill.CLIMB,
        Skill.DISABLE_DEVICE,
        Skill.ESCAPE_ARTIST,
        Skill.FORGERY,
        Skill.GATHER_INFORMATION,
        Skill.HIDE,
        Skill.JUMP,
        Skill.LISTEN,
        Skill.MOVE_SILENTLY,
        Skill.OPEN_LOCK,
        Skill.SEARCH,
        Skill.SLEIGHT_OF_HAND,
        Skill.TUMBLE,
        Skill.USE_MAGIC_DEVICE,
    ],
    [CharacterClass.SORCER]: [Skill.CONCENTRATION, Skill.PROFESSION, Skill.SPELLCRAFT],
}

export const ClassSpecialisationMap: {
    [key: CharacterClass]: (
        | CraftSpecialisation
        | KnowledgeSpecialisation
        | PerformSpecialisation
        | ProfessionSpecialisation
    )[]
} = {
    [CharacterClass.BARD]: [
        PerformSpecialisation.ACT,
        PerformSpecialisation.COMEDY,
        PerformSpecialisation.DANCE,
        PerformSpecialisation.KEYBOARD_INSTRUMENTS,
        PerformSpecialisation.ORATORY,
        PerformSpecialisation.PERCUSSION_INSTRUMENTS,
        PerformSpecialisation.STRING_INSTRUMENTS,
        PerformSpecialisation.WIND_INSTRUMENTS,
        PerformSpecialisation.SING,
    ],
    [CharacterClass.BARBARIAN]: [ProfessionSpecialisation.HUNTER, ProfessionSpecialisation.WOODCUTTER],
    [CharacterClass.CLERIC]: [KnowledgeSpecialisation.RELIGION],
    [CharacterClass.DRUID]: [KnowledgeSpecialisation.NATURE, ProfessionSpecialisation.HERBALIST],
    [CharacterClass.FIGHTER]: [CraftSpecialisation.WEAPONSMITHING, CraftSpecialisation.ARMORSMITHING],
    [CharacterClass.MONK]: [KnowledgeSpecialisation.RELIGION, KnowledgeSpecialisation.PHILOSOPHY],
    [CharacterClass.PALADIN]: [KnowledgeSpecialisation.RELIGION],
    [CharacterClass.RANGER]: [KnowledgeSpecialisation.NATURE, ProfessionSpecialisation.HUNTER],
    [CharacterClass.ROGUE]: [CraftSpecialisation.TRAPMAKING, ProfessionSpecialisation.MERCHANT],
    [CharacterClass.SORCER]: [KnowledgeSpecialisation.ARCANA],
}
