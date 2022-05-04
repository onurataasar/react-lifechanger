import React from 'react'
import Navbar from './Navbar'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    padding: theme.spacing(1),
    textAlign: 'center',
}));


export default function Quiz() {
    return (

        <div className='dashboard'>
            <Navbar />
            <div className='question'>
                <Stack spacing={2}>
                    <Item>

                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">How many litres do you drink water in a day?</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="less"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="less" control={<Radio />} label="Less than 1 L." />
                                <FormControlLabel value="between" control={<Radio />} label="Between 1 L. - 3 L." />
                                <FormControlLabel value="more" control={<Radio />} label="More than 3 L." />
                            </RadioGroup>
                        </FormControl>

                    </Item>
                    <Item>

                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">How many litres do you drink water in a day?</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="less"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="less" control={<Radio />} label="Less than 1 L." />
                                <FormControlLabel value="between" control={<Radio />} label="Between 1 L. - 3 L." />
                                <FormControlLabel value="more" control={<Radio />} label="More than 3 L." />
                            </RadioGroup>
                        </FormControl>

                    </Item>
                </Stack>
            </div>
        </div >
    )
}
