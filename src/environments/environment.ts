import { IEnvironment } from './i-environment'

export const environment: IEnvironment = {
    production: false,
    versionSuffix: '-local',
    apiUrl: 'http://localhost:3000/dev',
    saveCharacterUrl: 'https://sraxl0ousf.execute-api.eu-west-2.amazonaws.com/dev/character',
}
