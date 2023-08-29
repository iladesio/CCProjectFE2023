import React, {useState} from 'react'
import './App.css'
import {Box, Card, CardContent, Container} from '@mui/material'
import SoundflowFormContainer from './components/FormContainer'
import logo1 from './assets/soundflow-logo.png'
import SpotifyPlayer from 'react-spotify-web-playback'

const App = () => {

    const [trackUri, setTrackUri] = useState<string | null>(null)

    const token = localStorage.getItem('access_token')

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
                                    <SoundflowFormContainer setTrackUri={setTrackUri}/>
                                </form>
                            </CardContent>
                        </Card>
                    </Box>
                </div>
            </div>

            {trackUri && token && <div className="row mt-1 mt-sm-3">
                <div className="col">
                    <SpotifyPlayer
                        token={token}
                        showSaveIcon
                        play
                        uris={trackUri ? ['spotify:track:' + trackUri] : []}
                        styles={{
                            bgColor: '#d5e7e1',
                            sliderColor: '#143e4d',
                            color: '#143e4d'
                        }}
                    /></div>
            </div>}

        </Container>
    </div>

}

export default App
