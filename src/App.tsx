import React, {useEffect, useState} from 'react'
import './App.css'
import {Box, Card, CardContent, Container} from '@mui/material'
import SoundflowFormContainer from './components/FormContainer'
import logo1 from './assets/soundflow-logo.png'

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
                uri: 'spotify:track:77lp4fXKk6G1Md0aYAl4Mz'
            }
            let callback = (EmbedController: any) => {
            }
            IFrameAPI.createController(element, options, callback)
        }
    }, [token])

    return <div className="App">
        <Container fixed className="pt-5">

            <div className="row pt-2">
                <div className="col d-flex justify-content-center">
                    <Box sx={{boxShadow: 4}}>
                        <Card variant="outlined" sx={{maxWidth: 460, backgroundColor: '#d5e7e1'}}>
                            <CardContent>
                                <form action="POST">
                                    {/*header*/}
                                    <div className="row">
                                        <div className="col-12">
                                            <img src={logo1} alt="Logo" width="256" height="80"
                                                 style={{borderRadius: '10px'}}/>
                                        </div>
                                    </div>

                                    {/*form container*/}
                                    <SoundflowFormContainer/>
                                </form>
                            </CardContent>
                        </Card>
                    </Box>
                </div>
            </div>

            <div className="row pt-3">
                <div className="col-6 offset-3">
                    <div id="embed-iframe"/>
                </div>
            </div>

        </Container>
    </div>

}

export default App
