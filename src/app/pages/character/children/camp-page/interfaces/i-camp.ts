export interface ICamp {
    details: ICampDetails
    copper: number
}

export interface ICampDetails {
    code: string | null
    name: string | null
}

export const initialCampState: ICamp = {
    details: {
        code: null,
        name: null,
    },
    copper: 0,
}
