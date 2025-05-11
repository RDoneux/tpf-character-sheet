export const constructRequestBody = (httpMethod: HttpMethod, path: string, body: any) => ({
    httpMethod,
    path,
    headers: {
        'Content-Type': 'application/json',
    },
    body,
})

export const HttpMethod = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
} as const

export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod]
