import axios from 'axios';
import { getStorage } from '../config';
import React from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export async function sendRequest(options) {
  const requestOptions = {
    url: options.url,
    method: options.method,
    data: options.data,
    params: options.params
  };

  return axios(requestOptions).then(res => {
    return Promise.resolve(res);
  }).catch(err => {
    return Promise.reject(err);
  })
}