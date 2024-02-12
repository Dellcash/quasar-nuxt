export const useApi = () => {
  const nuxtApp = useNuxtApp();

  const getToken = () => {
    return localStorage.getItem('token');
  };

  return async (url, options = {}) => {
    const token = getToken();
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`
      };
    }

    try {
      const response = await $fetch(url, options);
      return response;
    } catch (error) {
      if ([401, 403, 404, 400, 406].includes(error.response?.status)) {
        Notify.create({
          type: 'error',
          message: error.response?._data.detail,
          progress: false,
          position: 'top',
        });
      }

      if (error.response?.status === 401) {
        nuxtApp.$router.push('/login');
      }

      if (error.response?.status === 422) {
        error.response?._data.detail.forEach(element => {
          console.error('Validation Error:', element.msg);
        });
      }

      throw error;
    }
  };
};

