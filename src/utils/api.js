import config from '../config';

export const postApi = (url, data) => {
    let formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    return fetch(`${config.backendBaseUrl}${url}`,  {
      method: 'POST',
      body: formData,
    });
}

export const putApi = (url, data) => {
    let formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    return fetch(`${config.backendBaseUrl}${url}`,  {
      method: 'PUT',
      body: formData,
    });
} 

export const getApi = (url, query) => {
    return fetch(`${config.backendBaseUrl}${url}?${query}`);
} 