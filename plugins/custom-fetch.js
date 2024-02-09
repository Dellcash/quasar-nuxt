export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('useCustomFetch', () => {
    const api = $fetch.create({ baseURL: '/api' })

    const getToken = () => {
      return localStorage.getItem('token');
    }

    return async (url, options = {}) => {
      const token = getToken();
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`
        };
      }

      try {
        console.log('api', api);
        // const response = await $fetch(url, options);

        // if ([401, 403, 404, 400, 406].includes(response.status)) {
        //   console.error('Error:', response.statusText);
        //   console.log('400001', response);
        // }

        // if (response.status === 401) {
        //   nuxtApp.$router.push('/login');
        // }

        // if (response.status === 422) {
        //   const json = await response.json();
        //   json.detail.forEach(element => {
        //     console.error('Validation Error:', element.msg);
        //   });
        // }

        // console.log('response', response);
        // return response;
      } catch (error) {
        console.error('Fetch error:', error);

        Notify.create({
          type: 'error',
          message: "نام کاربری و یا رمز عبور اشتباه می باشد.",
          progress: false,
          position: 'top',
        })

        throw error;
      }
    };
  });
})
