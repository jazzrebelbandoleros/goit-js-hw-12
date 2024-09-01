import { fetchPhotos } from './js/pixabay-api';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { createGalleryCard } from './js/render-functions';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader');
const loadmoreEl = document.querySelector('.js-load-more');

let currentPage = 1;
let searchValue = '';
let cardHeight = 0;
let totalPages = 0;

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionPosition: 'bottom',
  captionsData: 'alt',
});

const onSearchFormSubmit = async e => {
  try {
    e.preventDefault();
    loaderEl.classList.remove('is-hidden');

    searchValue = searchFormEl.elements.user_query.value.trim();

    if (!searchValue) {
      iziToast.error({
        message: 'Enter what we are looking for',
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#fafafb',
        iconColor: '#fafafb',
      });
      return;
    }

    currentPage = 1;

    const response = await fetchPhotos(searchValue, currentPage);
    if (response.data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#fafafb',
        iconColor: '#fafafb',
      });

      loadmoreEl.classList.add('is-hidden');
      galleryEl.innerHTML = '';
      searchFormEl.reset();
      return;
    }
    const galleryCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCard(imgDetails))
      .join('');
    galleryEl.innerHTML = galleryCardsTemplate;
    cardHeight = galleryEl.querySelector('li').getBoundingClientRect().height;

    totalPages = Math.ceil(response.data.totalHits / 15);
    if (currentPage >= totalPages) {
      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
      });
    }
    loadmoreEl.classList.remove('is-hidden');
    lightbox.refresh();
  } catch (err) {
    console.log(err);
  } finally {
    searchFormEl.reset();
    loaderEl.classList.add('is-hidden');
  }
};

const OnLoadMoreBtnClick = async event => {
  try {
    currentPage++;
    const response = await fetchPhotos(searchValue, currentPage);
    const galleryCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCard(imgDetails))
      .join('');

    galleryEl.insertAdjacentHTML('beforeend', galleryCardsTemplate);
    lightbox.refresh();

    scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    totalPages = Math.ceil(response.data.totalHits / 15);

    if (currentPage >= totalPages) {
      loadmoreEl.classList.add('is-hidden');
      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
      });
    }
  } catch (err) {
    console.log(err);
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadmoreEl.addEventListener('click', OnLoadMoreBtnClick);
