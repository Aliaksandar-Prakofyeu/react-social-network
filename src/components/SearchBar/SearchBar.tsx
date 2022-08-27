import {useFormik} from 'formik'
import {Box, IconButton, InputAdornment, MenuItem, Select, Stack, TextField} from '@mui/material'
import {Search} from '@mui/icons-material'
import React from 'react'
import {FilterType} from '../../redux/usersReducer'

type PropsType = {
    onFilterChanged: (f: FilterType) => void
}

const SearchBar: React.FC<PropsType> = (props) => {

    const {onFilterChanged} = props

    const formik = useFormik({
        initialValues: {
            filter: {
                term: '',
                friend: null
            }
        },
        onSubmit: (values) => {
            onFilterChanged(values.filter)
        }
    })

    return (<form onSubmit={formik.handleSubmit}>

            <Stack direction={'row'} spacing={2} alignItems={'center'} sx={{margin: '5px', padding: '5px'}}>
                <Box flex={2}>
                    <TextField placeholder={'Search'}
                               name={'filter.term'}
                               onChange={formik.handleChange}
                               fullWidth InputProps={{
                        endAdornment: <InputAdornment position={'end'}>
                            <IconButton type={'submit'}>
                                <Search fontSize={'large'}/>
                            </IconButton>
                        </InputAdornment>
                    }}/>
                </Box>
                <Box flex={1}>
                    <Select name={'filter.friend'}
                            displayEmpty
                            value={formik.values.filter.friend}
                            onChange={formik.handleChange} sx={{m: 1, minWidth: 120}}>
                        <MenuItem value={'null'}>All</MenuItem>
                        <MenuItem value={'true'}>Followed</MenuItem>
                        <MenuItem value={'false'}>Not Followed</MenuItem>
                    </Select>
                </Box>
            </Stack>

        </form>

    )
}

export default SearchBar