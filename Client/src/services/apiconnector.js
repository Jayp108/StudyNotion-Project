import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
});

// Add response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token expired or invalid, clear localStorage and redirect to login
    if (error.response?.status === 401) {
      const message = error.response?.data?.message || '';
      if (message.includes('expired') || message.includes('invalid')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const apiConnector = (method, url, bodyData, headers, params) => {
  // Get token from localStorage
  const token = localStorage.getItem("token");
  
  // Merge headers with Authorization if token exists
  const finalHeaders = {
    ...headers,
  };
  
  // Only add Authorization header if token exists and it's not already present
  if (token && !finalHeaders.Authorization) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: Object.keys(finalHeaders).length > 0 ? finalHeaders : null,
    params: params ? params : null,
  });
};
