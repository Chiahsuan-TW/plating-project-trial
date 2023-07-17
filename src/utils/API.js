import axios from 'axios';
import Cookies from 'js-cookie';
import imageCompression from 'browser-image-compression';

const API = axios.create({
  baseURL: import.meta.env.VITE_APP_FRONTEND_HOST,
  // baseURL: `http://192.168.1.78:8080/${import.meta.env.VITE_APP_FRONTEND_HOST}`,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json'
  }
});

API.interceptors.request.use(
  config => {
    const token = Cookies.get('PlatingToken');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

API.interceptors.response.use(
  // 2xx
  response => {
    return {
      data: response.data,
      meta: response.data.meta
    };
  }
);

export default {
  async GET(path, params) {
    const response = await API.get(path, params);
    return response;
  },
  async POST(path, form) {
    const response = await API.post(path, form);
    return response;
  },
  async PUT(path, form, params) {
    const response = await API.put(path, form, params);
    return response;
  },
  async PATCH(path, form) {
    const response = await API.patch(path, form);
    return response;
  },
  async DELETE(path, params) {
    const response = await API.delete(path, params);
    return response;
  },

  async UploadImg(type, file, filename) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };

    if (type === 'photo') {
      const {
        data: { data: response }
      } = await this.POST('/share/upload-image-presignedURL', {
        filename: file.name
      });

      const presignedURL = response.presignedURL;

      const compressedFile = await imageCompression(file, options);

      await axios.put(presignedURL, compressedFile, {
        headers: {
          'Content-Type': 'image'
        }
      });
    } else if (type === 'signature') {
      const {
        data: { data: response }
      } = await this.POST('/share/upload-image-presignedURL', {
        filename
      });

      const presignedURL = response.presignedURL;

      await axios.put(presignedURL, file, {
        headers: {
          'Content-Type': 'image'
        }
      });
    }
  }
};
