import React, {useCallback, useEffect, useState} from 'react'
import {Box, Button, TextField} from '@mui/material'
import {useFetchHook} from './custom-hook/useFetchHook'
import {BASE_PREDICTION_URL, GET_PREDICTION_END_POINT} from './constants'


const SoundflowFormContainer = () => {

    const {fetchData, response, isRequestPending} = useFetchHook({
        url: `${BASE_PREDICTION_URL}${GET_PREDICTION_END_POINT}`
    })

    // Local state
    const [feelingText, setFeelingText] = useState('')

    const handleSubmitText = useCallback(() => {
        fetchData({text: feelingText})

    }, [fetchData, feelingText])

   /* useEffect(() => {
        console.log('AAA response', response)
    }, [response])*/

    return <div className="row">
        <div className="col-12 d-flex justify-content-center">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                {/*<Typography component="caption" >
                    Insert text
                </Typography>*/}

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
                        variant="contained"
                        style={{
                            backgroundColor: 'rgb(1 131 116)'
                        }}
                        sx={{mt: 3, mb: 2}}>
                        Recommend me a song!
                    </Button>

                </Box>
            </Box>
        </div>
    </div>
}

export default SoundflowFormContainer
