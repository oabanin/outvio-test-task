import { getCovidData } from 'src/api/covid';

import { useQuery } from 'react-query';

const useCovidData = (options) =>
  useQuery(['/data/owid-covid-data.json'], getCovidData, {
    select: (response) => {
      if (!response) return response;
      if (response.status === 200) {
        return response.data;
      }
    },
    ...options,
  });

export { useCovidData };
