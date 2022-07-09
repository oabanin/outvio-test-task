import { axiosInstance } from 'src/api/instance';

export const getCovidData = async () => await axiosInstance.get('/data/owid-covid-data.json');
