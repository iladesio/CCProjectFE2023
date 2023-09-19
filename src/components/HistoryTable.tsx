import {
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material'
import {useFetchHook} from './custom-hook/useFetchHook'
import {BASE_HISTORY_URL, GET_HISTORY_END_POINT} from './constants'
import {useEffect, useMemo} from 'react'

const HistoryTable = () => {

    const {fetchData, response, isRequestPending} = useFetchHook({
        url: `${BASE_HISTORY_URL}${GET_HISTORY_END_POINT}`
    })

    useEffect(() => {
        !response && fetchData('GET')
    }, [response, fetchData])

    const rows = useMemo((): any[] => {
        // @ts-ignore
        return !!response ? JSON.parse(response) : []
    }, [response])

    return <>
        <TableContainer component={Paper}>
            <div className="col d-flex justify-content-center py-2" style={{backgroundColor: '#d5e7e1'}}>
                <Typography
                    variant="h5"
                    id="tableTitle">USER HISTORY</Typography>
            </div>
            {isRequestPending ?
                <div className="col-12" style={{backgroundColor: '#d5e7e1'}}>
                    <Skeleton className="col-12 mr-4" height={50} variant="text"/>
                    <Skeleton className="col-12 mr-4" height={50} variant="text"/>
                    <Skeleton className="col-12 mr-4" height={50} variant="text"/>
                </div>
                : rows?.length ? <Table sx={{minWidth: 650, backgroundColor: '#d5e7e1'}} aria-label="history-table">

                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Date </TableCell>
                                <TableCell align="left">Text </TableCell>
                                <TableCell align="left">Song Title </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows?.map((row, index) => (
                                <TableRow
                                    key={'key_' + index}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.Date}
                                    </TableCell>
                                    <TableCell align="left"> {row.Text}</TableCell>
                                    <TableCell align="left">{row.Title}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    :
                    <div className="d-flex justify-content-around align-items-center py-4"
                         style={{backgroundColor: '#d5e7e1'}}>
                        <Typography variant="body1"
                                    className="d-flex align-items-center"
                                    color="textSecondary">Nessun risultato trovato</Typography>
                    </div>}

        </TableContainer>
    </>
}

export default HistoryTable
