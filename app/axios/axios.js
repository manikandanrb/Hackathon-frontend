import axios from 'axios';
import config from '../config';
import { getAuthToken } from '../utils/Auth';
import { navigate } from '../utils/RootNavigation';

const Token = async () => {
  try {
    await getAuthToken().then(
      token => token
    );
  } catch (error) {
    return null;
  }
}

const apiClient = axios.create({
  baseURL: config.baseUrl,
  headers: {
    Accept: 'application/json',
  }

});

apiClient.interceptors.request.use(
  async config => {
    console.log("setting auth token in header");
    const token = await getAuthToken();
    console.log(token);
    config.headers.Authorization = 'Token ' + token;
    return config;
  }
)


apiClient.interceptors.response.use((response) => response, (error) => {
  console.log(error.response);
  if (error && error.response && error.response.status === 403) {
    navigate('Login');
  }
  throw error;
});



export default apiClient;
