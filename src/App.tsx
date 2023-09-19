import React, {useEffect, useMemo, useState} from 'react'
import './App.css'
import {
    AppBar,
    Avatar,
    Box,
    Card,
    CardContent,
    CircularProgress,
    Container,
    IconButton,
    Toolbar,
    Typography
} from '@mui/material'
import SoundflowFormContainer from './components/FormContainer'
import logo1 from './assets/soundflow-logo.png'
import SpotifyPlayer from 'react-spotify-web-playback'
import {getProfile} from './auth/auth-spotify.utils'
import HistoryTable from './components/HistoryTable'

const App = () => {

    const token = localStorage.getItem('access_token') as string

    // Local state
    const [trackUri, setTrackUri] = useState<string | null>(null)
    const [profileData, setProfileData] = useState<any | null>(null)

    const profileDisplayName = useMemo(() => profileData?.display_name || 'Name', [profileData])
    const profileImage = useMemo(() => profileData?.images?.[0]?.url || '', [profileData])
    const profileHref = useMemo(() => profileData?.external_urls?.spotify || '', [profileData])

    useEffect(() => {
        if (token) {
            getProfile().then(value => setProfileData(value))
        }
    }, [token])

    return <div className="App">
        {token && profileData ? <>
            <AppBar position="static">
                <Toolbar className="d-flex justify-content-end" style={{backgroundColor: '#143e4d'}}>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            href={profileHref}
                            target="_blank"
                        >
                            <Typography style={{textDecoration: 'none', color: 'white'}}>
                                {profileDisplayName}
                            </Typography>

                            <Avatar className="ml-2" alt="Profile" src={profileImage}/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>

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

                <div className="row pt-4">
                    <div className="col d-flex justify-content-center">
                        <Box sx={{boxShadow: 4}}>

                            <HistoryTable/>
                        </Box>
                    </div>
                </div>


            </Container>
        </> : <div className="d-flex justify-content-center"><CircularProgress size={30} className="mt-4"/></div>}
    </div>

}

export default App
