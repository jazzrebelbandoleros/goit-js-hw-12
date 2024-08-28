import { fetchPhotos } from './js/pixabay-api';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { createGalleryCard } from './js/render-functions';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader');

const onSearchFormSubmit = e => {
  e.preventDefault();
  loaderEl.classList.remove('is-hidden');
  const searchValue = searchFormEl.elements.user_query.value;
  fetchPhotos(searchValue)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          backgroundColor: '#EF4040',
          messageColor: '#fafafb',
          iconColor: '#fafafb',
        });

        galleryEl.innerHTML = '';
        searchFormEl.reset();
        return;
      }

      const galleryCardsTemplate = data.hits
        .map(imgDetails => createGalleryCard(imgDetails))
        .join('');

      galleryEl.innerHTML = galleryCardsTemplate;

      lightbox.refresh();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      searchFormEl.reset();
      loaderEl.classList.add('is-hidden');
    });
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionPosition: 'bottom',
  captionsData: 'alt',
});
