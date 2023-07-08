import React, {useCallback, useState} from 'react'
import {Box, Button, TextField, Typography} from '@mui/material'


const SoundflowFormContainer = () => {

    // Local state
    const [feelingText, setFeelingText] = useState('')

    const handleSubmitText = useCallback(() => {
        console.log('AAA feelingText', feelingText)
    }, [feelingText])

    return <div className="row">
        <div className="col-12 d-flex justify-content-center">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography component="h1" variant="h5">
                    Soundflow
                </Typography>

                <Box sx={{mt: 1}}>
                    <TextField
                        value={feelingText}
                        onChange={(e) => setFeelingText(e?.target?.value || '')}
                        margin="normal"
                        fullWidth
                        id="input-text"
                        label="How do you feel?"
                        name="input-text"
                        autoComplete="input-text"
                        autoFocus
                        multiline
                        rows={3}
                    />

                    <Button
                        onClick={handleSubmitText}
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}>
                        Recommend me a song!
                    </Button>

                </Box>
            </Box>
        </div>
    </div>
}

export default SoundflowFormContainer
