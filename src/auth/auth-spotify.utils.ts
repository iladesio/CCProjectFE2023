import {ACCESS_TOKEN_LOCAL_STORAGE} from './auth-spotify.constants'

export const generateRandomString = (length: number) => {
    let text = ''
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

export const generateCodeChallenge = async (codeVerifier: any) => {

    const base64encode = (stringToEncode: any) => {
        // @ts-ignore
        return btoa(String.fromCharCode.apply(null, new Uint8Array(stringToEncode)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '')
    }

    const encoder = new TextEncoder()
    const data = encoder.encode(codeVerifier)
    const digest = await window.crypto.subtle.digest('SHA-256', data)

    return base64encode(digest)
}

export const getProfile = async () => {
    let accessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE)

    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    })

    return await response.json()
}
