import {
    ACCESS_TOKEN_LOCAL_STORAGE,
    APP_CLIENT_ID,
    CODE_VERIFIER_LOCAL_STORAGE,
    REDIRECT_URI
} from './auth-spotify.constants'
import {generateCodeChallenge, generateRandomString} from './auth-spotify.utils'


export const checkAuthCode = async () => {

    const isTokenPresent = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE)

    if (!isTokenPresent) {

        const urlParams = new URLSearchParams(window.location.search)
        let code = urlParams.get('code')

        if (code) {
            const codeVerifierLocalStorage = localStorage.getItem(CODE_VERIFIER_LOCAL_STORAGE)

            if (!!codeVerifierLocalStorage) {
                let body = new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: REDIRECT_URI,
                    client_id: APP_CLIENT_ID,
                    code_verifier: codeVerifierLocalStorage
                })

                fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: body
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('HTTP status ' + response.status)
                        }
                        return response.json()
                    })
                    .then(data => {
                        localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE, data.access_token)
                    })
                    .then(() => {
                        let urlParams = new URLSearchParams(window.location.search);

                        urlParams.delete('code');
                        urlParams.delete('state');

                        // @ts-ignore
                        (window as Window).location.search = urlParams

                    })
                    .catch(error => {
                        console.error('Error:', error)
                    })
            }


        } else {

            const codeVerifier = generateRandomString(128)

            generateCodeChallenge(codeVerifier).then(codeChallenge => {
                let state = generateRandomString(16)
                let scope = 'user-read-private user-read-email streaming app-remote-control'

                localStorage.setItem(CODE_VERIFIER_LOCAL_STORAGE, codeVerifier)

                let args = new URLSearchParams({
                    response_type: 'code',
                    client_id: APP_CLIENT_ID,
                    scope: scope,
                    redirect_uri: REDIRECT_URI,
                    state: state,
                    code_challenge_method: 'S256',
                    code_challenge: codeChallenge
                });

                (window as Window).location = 'https://accounts.spotify.com/authorize?' + args
            })

        }

    }

}
