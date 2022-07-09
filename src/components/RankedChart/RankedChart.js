import React, { useMemo, useState } from 'react';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { BarChart, BarSeries } from 'reaviz';

const getTotalDeathsTop = (data, count) => {
  const newData = [];
  Object.keys(data).forEach((country) => {
    if (!country.startsWith('OWID_')) {
      newData.push({
        key: country,
        data: data[country].data.slice(-1)[0].total_deaths,
      });
    }
  });

  return newData.sort((a, b) => b.data - a.data).slice(0, count);
};

const getTotalCasesTop = (data, count) => {
  const newData = [];
  Object.keys(data).forEach((country) => {
    if (!country.startsWith('OWID_')) {
      newData.push({
        key: country,
        data: data[country].data.slice(-1)[0].total_cases,
      });
    }
  });

  return newData.sort((a, b) => b.data - a.data).slice(0, count);
};

function RankedChart({ data, selectedCountry }) {
  const [value, setValue] = useState('cases');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [count, setCount] = useState('10');
  const handleSelectChange = (event) => {
    setCount(event.target.value);
  };

  const filteredData = useMemo(() => {
    let newData;

    if (value === 'cases') {
      newData = getTotalCasesTop(data, count);
    } else {
      newData = getTotalDeathsTop(data, count);
    }

    return newData;
  }, [value, count, data]);

  return (
    <div>
      <BarChart
        width="100%"
        height={300}
        series={
          <BarSeries colorScheme={(data) => (data.key === selectedCountry ? 'red' : 'green')} />
        }
        data={filteredData}
      />

      <Typography variant="h5" component="h5">
        Chart Controls
      </Typography>

      <FormControl>
        <FormLabel>Mode</FormLabel>
        <RadioGroup value={value} onChange={handleChange} row>
          <FormControlLabel value="cases" control={<Radio />} label="Cases" />
          <FormControlLabel value="deaths" control={<Radio />} label="Deaths" />
        </RadioGroup>
      </FormControl>

      <FormControl variant="outlined" fullWidth>
        <InputLabel variant="outlined">Top countries</InputLabel>
        <Select
          variant="outlined"
          value={count}
          label="Count"
          onChange={handleSelectChange}
          input={<OutlinedInput label="Top countries" />}
        >
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="20">20</MenuItem>
          <MenuItem value="30">30</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default RankedChart;
