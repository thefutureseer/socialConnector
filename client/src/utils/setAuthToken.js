import axios from 'axios';

const setAuthToken = token => {
  if(token) {
//Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
//If no token delete the auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;