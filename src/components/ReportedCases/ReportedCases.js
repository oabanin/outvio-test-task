import { useMemo, useState } from 'react';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { AreaChart, AreaSeries } from 'reaviz';

const getTotalCasesData = ({ data }) =>
  data
    .map((item) => ({ key: new Date(item.date), data: item.total_cases }))
    .filter((item) => item.data !== undefined);

const getTotalDeathsData = ({ data }) =>
  data
    .map((item) => ({ key: new Date(item.date), data: item.total_deaths }))
    .filter((item) => item.data !== undefined);

const getNewCasesData = ({ data }) =>
  data
    .map((item) => ({ key: new Date(item.date), data: item.new_cases }))
    .filter((item) => item.data !== undefined);

const getNewDeathsData = ({ data }) =>
  data
    .map((item) => ({ key: new Date(item.date), data: item.new_deaths }))
    .filter((item) => item.data !== undefined);

function ReportedCases({ data }) {
  const [value, setValue] = useState('total');
  const [checked, setChecked] = useState(true);

  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const filteredData = useMemo(() => {
    let newData;
    if (value === 'total') {
      newData = [
        {
          key: 'Total cases',
          data: getTotalCasesData(data),
        },
      ];
    } else {
      newData = [
        {
          key: 'New cases',
          data: getNewCasesData(data),
        },
      ];
    }

    if (checked) {
      newData.push({
        key: value === 'total' ? 'Total deaths' : 'New deaths',
        data: value === 'total' ? getTotalDeathsData(data) : getNewDeathsData(data),
      });
    }
    return newData;
  }, [value, checked, data]);

  return (
    <div>
      {!filteredData[0].data.length ? (
        <h1>Sorry, there are no data!</h1>
      ) : (
        <AreaChart
          width="100%"
          height={300}
          data={filteredData}
          series={<AreaSeries type="grouped" colorScheme="Accent" />}
        />
      )}
      <Typography variant="h5" component="h5">
        Chart Controls
      </Typography>

      <FormControl>
        <FormLabel>Mode</FormLabel>
        <RadioGroup value={value} onChange={handleChange} row>
          <FormControlLabel value="total" control={<Radio />} label="Total" />
          <FormControlLabel value="new" control={<Radio />} label="New" />
        </RadioGroup>
      </FormControl>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={handleSwitchChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="Show deaths"
        />
      </FormGroup>
    </div>
  );
}

export default ReportedCases;
