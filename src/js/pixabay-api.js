import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchPhotos = (searchQuery, page) => {
  const axiosOptions = {
    params: {
      key: '45589223-69f3ad275007a1fe85231a89e',
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
  };

  return axios.get('', axiosOptions);
};
