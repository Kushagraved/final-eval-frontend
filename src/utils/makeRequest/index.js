import axios from 'axios';

import { BACKEND_URL } from '../../constants/apiEndPoints';


const makeRequest = async (
  apiEndPoint,
  dynamicConfig = {},
  navigate
) => {
  try {
    const requestDetails = {
      baseURL: BACKEND_URL,
      url: apiEndPoint.url,
      method: apiEndPoint.method,
      ...dynamicConfig,
    };
    const { data } = await axios(requestDetails);
    return data;
  } catch (e) {
    if (navigate) {
      const errorStatus = e.response?.status;
      if (errorStatus) {
        navigate(`/error/${errorStatus}`);
      } else {
        navigate('/error');
      }
    }
  }
};

export default makeRequest;
