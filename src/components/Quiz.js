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
import Box from '@mui/material/Box';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';



const Item = styled(Paper)(({ theme }) => ({
    fontVariant: "small-caps",
    backgroundColor: 'rgba(252, 202, 202, 0.925)',
    padding: theme.spacing(2),
    textAlign: 'center',
    elevation: 3,
    width: "100%",
    marginBlock: "2%",
    alignSelf: "center"
}));

export default function Quiz() {
    const [value, setValue] = React.useState(new Date());
    return (
        <div className='quiz'>

            <Stack spacing={2}>
                <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.705)', width: '80%', border: '1px grey', alignSelf: "center" }}>
                    <div className="question">
                        <br></br>
                        <h2>Welcome to the first steps of your journey on LifeChanger, dear $name.</h2>
                        <h3>Before you start, we have some questions about your life.</h3>
                        <h5>It is very import for you to answer them honestly.</h5>
                    </div>
                    <Item>
                        <FormLabel>Please enter your date of birth.</FormLabel> <p></p>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disableFuture
                                label="mm / dd / yyyy"
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
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

                </Box>
            </Stack>

        </div >
    )
}
