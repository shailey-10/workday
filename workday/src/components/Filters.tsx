import { Autocomplete, Box, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanyName, setMinBasePay, setMinExp, setRole, setType } from '../redux/Filters/filterSlice';
import { RootState } from '../redux/store';
import { BASE_PAY_OPTIONS, EXPERIENCE_OPTIONS, ROLE_OPTIONS, TYPE_OPTIONS } from '../utils/constants';

const Filters = () => {
  const [expInputValue, setExpInputValue] = useState('');
  const [expBaseValue, setExpBaseValue] = useState('');
  const expValue = useSelector((state : RootState) => state.filter.minExp)
  const companyName = useSelector((state : RootState) => state.filter.companyName)
  const minBasePay = useSelector((state : RootState) => state.filter.minBasePay)
  
  const dispatch = useDispatch()
  return (
    <Box display='flex' columnGap='15px' padding={2}>
          <Autocomplete
           size='small'
        value={expValue}
        onChange={(event: any, newValue: string | null) => {
          dispatch(setMinExp(newValue));
        }}
        inputValue={expInputValue}
        onInputChange={(event, newInputValue) => {
          setExpInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={EXPERIENCE_OPTIONS}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="Min Experience" />}
      />
      <TextField
       size='small'
  id="outlined-controlled"
  label="Company Name"
  value={companyName}
  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
     dispatch(setCompanyName(event.target.value))
  }}
/>
 <Autocomplete
  onChange={(event: any, newValue: string[] | null) => {
          dispatch(setRole(newValue))
        }}
 size='small'
        multiple
        id="tags-outlined"
        options={ROLE_OPTIONS}
        getOptionLabel={(option) => option}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
          sx={{minWidth : '150px'}}
            {...params}
            label="Role"
          />
        )}
      />
                <Autocomplete
           size='small'
        value={minBasePay}
        onChange={(event: any, newValue: string | null) => {
          dispatch(setMinBasePay(newValue));
        }}
        inputValue={expBaseValue}
        onInputChange={(event, newInputValue) => {
          setExpBaseValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={BASE_PAY_OPTIONS}
        sx={{minWidth : '250px'}}
        renderInput={(params) => <TextField {...params} label="Minimum Base Pay Salary" />}
      />

       <Autocomplete
  onChange={(event: any, newValue: string[] | null) => {
          dispatch(setType(newValue))
        }}
 size='small'
        multiple
        id="tags-outlined"
        options={TYPE_OPTIONS}
        getOptionLabel={(option) => option}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
          sx={{minWidth : '150px'}}
            {...params}
            label="Type"
          />
        )}
      />
      </Box>
  )
}

export default Filters