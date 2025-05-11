export interface ICamp {
    campCode: string | null
}

export const initialCampState: ICamp = {
    campCode: null,
}

export interface ICampDetails extends ICamp {
    id: string
    name: string
    description: string
    copper: number
}
