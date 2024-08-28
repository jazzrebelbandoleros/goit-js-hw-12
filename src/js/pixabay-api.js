const API_URL = 'https://pixabay.com/api/';
const API_KEY = '45589223-69f3ad275007a1fe85231a89e';

export const fetchPhotos = searchQuery => {
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 30,
  });

  return fetch(`${API_URL}?${urlParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};
