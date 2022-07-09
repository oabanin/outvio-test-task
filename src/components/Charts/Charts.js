import * as React from 'react';

import RankedChart from 'src/components/RankedChart/RankedChart';
import ReportedCases from 'src/components/ReportedCases/ReportedCases';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Charts({ selectedCountry, data }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', marginTop: '10px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab sx={{ width: '50%' }} label="Reported Cases" />
          <Tab sx={{ width: '50%' }} label="Ranked Charts" />
        </Tabs>
      </Box>
      <div style={{ marginTop: 55 }}>
        <TabPanel value={value} index={0}>
          <ReportedCases data={data[selectedCountry]} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RankedChart data={data} selectedCountry={selectedCountry} />
        </TabPanel>
      </div>
    </Box>
  );
}
