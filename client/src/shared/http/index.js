import axios from 'axios';

const http = {
  get(url, params = {}) {
    return axios({
      method: 'get',
      url,
      params
    });
  },
  post(url, params = {}, data) {
    return axios({
      method: 'post',
      url,
      params,
      data
    });
  },
  delete(url, params = {}, data) {
    return axios({
      method: 'delete',
      url,
      params,
      data
    });
  },
  put(url, params = {}, data) {
    return axios({
      method: 'put',
      url,
      params,
      data
    });
  }
};

export default http;
