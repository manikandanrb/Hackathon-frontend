import axiosApi from '../axios';
import { Toast } from 'native-base';
import { navigate } from '../utils/RootNavigation';
import {
  setAuthToken,
  removeAuthToken,
} from '../utils/Auth';
import {
  LOGIN_SUCCESS,
  GET_DETECTHANDWRITTEN,
  LOGIN_FAILURE,
} from '../constants';

export const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload,
});

const loginFailure = payload => ({
  type: LOGIN_FAILURE,
  payload,
});

export const getDetectSuccess = payload => ({
  type: GET_DETECTHANDWRITTEN,
  payload,
});


export const logout = () => dispatch => {
  return axiosApi({
    method: 'get',
    url: 'logout/',
  }, { withCredentials: true }).then(resp => {
    if (resp.data) {
      removeAuthToken();
      dispatch(loginSuccess(null));
      return { data: 'success', response: resp.data };
    }
  }).catch(error => {
    Toast.show({
      text: error.response.data.non_field_errors[0],
      buttonText: 'Okay',
      duration: 3000,
      type: 'error'
    });
    return { data: 'Fail' };
  });
};

export const doDirectLogin = (data) => dispatch => {
  return axiosApi({
    method: 'get',
    url: 'profile',
    data: data
  }, { withCredentials: true }).then(resp => {
    if (resp.data) {
      dispatch(loginSuccess(resp.data));
      return { data: 'success', response: resp.data };
    }
    else {
      dispatch(loginFailure(resp.data));
    }
  }).catch(error => {
    Toast.show({
      text: error.response.data.non_field_errors[0],
      buttonText: 'Okay',
      duration: 3000,
      type: 'error'
    });
    dispatch(loginFailure(error));
    return { data: 'Fail' };
  });
};

export const doLogin = (data) => dispatch => {
  return axiosApi({
    method: 'post',
    url: 'login/',
    data: data
  }).then(resp => {
    if (resp.data) {
      const { user, token } = resp.data
      setAuthToken(token);
      dispatch(loginSuccess(user));
      return { data: 'success', response: resp.data };
    }
    else {
      dispatch(loginFailure(resp.data));
    }
  }).catch(error => {
    if (error.message == "Network Error") {
      Toast.show({
        text: "Network Error, Try after some time",
        buttonText: 'Okay',
        duration: 3000,
        type: 'error'
      });
      return { data: 'Fail' };
    }
    Toast.show({
      text: error.response.data.non_field_errors[0],
      buttonText: 'Okay',
      duration: 3000,
      type: 'error'
    });
    dispatch(loginFailure(error));
    return { data: 'Fail' };
  });
};

export const getProfileData = () => dispatch => {
  return axiosApi({
    method: 'get',
    url: 'profile/'
  }, { withCredentials: true }).then(resp => {
    if (resp.data) {
      dispatch(loginSuccess(resp.data));
      return { data: 'success', response: resp.data };
    } else {
      return { data: 'Fail' };
    }
  })
    .catch(async error => {
      navigate('Login');
    });
};

export const getDetectHandwritten = (data) => dispatch => {
  return axiosApi({
    method: 'get',
    url: `detect/`,
    params: data
  }, { withCredentials: true }).then(resp => {
    if (resp.data) {
      dispatch(getDetectSuccess(resp.data));
      return { data: 'success', response: resp.data };
    }
  })
    .catch(error => {
      if (error.message != "Network Error") {
        Toast.show({
          text: error.response.data.detail,
          buttonText: 'Okay',
          duration: 3000,
          type: 'error'
        });
        return { data: 'Fail' };
      }
      return { data: 'Fail' };
    });
};

export const detectHandwritten = (data) => dispatch => {
  return axiosApi({
    method: 'post',
    url: `detect/`,
    data: data
  }, { withCredentials: true }).then(resp => {
    if (resp.data) {
      return { data: 'success', response: resp.data };
    }
  })
    .catch(error => {
      return { data: 'Fail', error: error.response.data };
    });
};