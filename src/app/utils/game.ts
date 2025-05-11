import { IMoney } from '../core/money/interfaces/i-money'
import { CharacterExperienceTable } from '../types/game'

export function calculateLevelFromExperience(xp: number): number {
    // Find the highest level where XP is greater than or equal to the required XP
    for (let level = CharacterExperienceTable.length - 1; level >= 0; level--) {
        if (xp >= CharacterExperienceTable[level]) {
            return level + 1
        }
    }

    return 1 // Default to level 1 if XP is below the first threshold
}

export function convertToCopper(money: IMoney): number {
    return +money.cp + +money.sp * 10 + +money.gp * 100 + +money.pp * 1000
}

export function convertFromCopper(copper: number): IMoney {
    return {
        cp: copper % 10,
        sp: Math.floor((copper / 10) % 10),
        gp: Math.floor((copper / 100) % 10),
        pp: Math.floor(copper / 1000),
    }
}
