import React, {useEffect, useState} from 'react'
import './App.css'
import {Container} from '@mui/material'
import SoundflowFormContainer from './components/FormContainer'

const App = () => {

    const [player, setPlayer] = useState(undefined)
    const token = localStorage.getItem('access_token')

    useEffect(() => {

        const script = document.createElement('script')
        script.src = 'https://sdk.scdn.co/spotify-player.js'
        script.async = true

        document.body.appendChild(script)

        // @ts-ignore
        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new (window as any).Spotify.Player({
                name: 'soundflow',
                getOAuthToken: (cb: any) => {
                    cb(token)
                },
                volume: 0.5
            })

            setPlayer(player)

            player.addListener('ready', ({device_id}: any) => {
                console.log('Ready with Device ID', device_id)
            })

            player.addListener('not_ready', ({device_id}: any) => {
                console.log('Device ID has gone offline', device_id)
            })

            player.connect()

        }

        // @ts-ignore
        window.onSpotifyIframeApiReady = (IFrameAPI) => {
            let element = document.getElementById('embed-iframe')
            let options = {
                uri: 'spotify:track:3DG2hUPMLKcFptV1Gv32oI'
            }
            let callback = (EmbedController: any) => {
            }
            IFrameAPI.createController(element, options, callback)
        }
    }, [token])

    return <div className="App">
        <Container fixed>
            <form action="POST">

                {/*header*/}
                <div className="row">
                    <div className="col-12">
                        insert image
                    </div>
                </div>

                {/*form container*/}
                <SoundflowFormContainer/>
            </form>

            <div className="row">
                <div className="col">
                    <div id="embed-iframe"/>
                </div>
            </div>

        </Container>
    </div>

}

export default App
