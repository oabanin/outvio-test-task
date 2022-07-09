import React, { useState } from 'react';

import { useCovidData } from 'src/modules/chart/hooks/useCovidData/useCovidData';

import Charts from 'src/components/Charts/Charts';

import { CircularProgress, Paper } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import s from './ChartPage.module.scss';

function ChartPage() {
  const [options, setOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('OWID_WRL');

  const { isSuccess, isError, data } = useCovidData({
    onSuccess: (data) => {
      const countries = [];
      Object.keys(data).forEach((country) => {
        if (!country.startsWith('OWID_') && data[country].location) {
          countries.push({
            label: data[country].location,
            value: country,
          });
        }
      });
      setOptions(countries);
    },
  });

  if (!isSuccess || isError) {
    return (
      <div className={s.preloader}>
        <CircularProgress size={100} />
      </div>
    );
  }

  return (
    <div className={s.container}>
      <Paper sx={{ width: '100%', height: 'auto', padding: 4 }} elevation={6}>
        <Autocomplete
          disablePortal
          onChange={(e, valueObj) => {
            if (valueObj) {
              setSelectedCountry(valueObj.value);
              return;
            }
            setSelectedCountry('OWID_WRL');
          }}
          options={options}
          renderInput={(params) => <TextField {...params} label="Country" />}
        />
        <Charts selectedCountry={selectedCountry} data={data} />
      </Paper>
    </div>
  );
}

export default ChartPage;
