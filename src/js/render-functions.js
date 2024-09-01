export const createGalleryCard = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img
        class="gallery-image"
        src="${webformatURL}"
        alt="${tags}"/>
      </a>
      <ul class="gallary-descr">
        <li class="gallary-descr-item">
          <h2 class="gallary-descr-item-title">Likes</h2>
          <p class="gallary-descr-item-num">${likes}</p>
        </li>
        <li class="gallary-descr-item">
          <h2 class="gallary-descr-item-title">Views</h2>
          <p class="gallary-descr-item-num">${views}</p>
        </li>
        <li class="gallary-descr-item">
          <h2 class="gallary-descr-item-title">Comments</h2>
          <p class="gallary-descr-item-num">${comments}</p>
        </li>
        <li class="gallary-descr-item">
          <h2 class="gallary-descr-item-title">Downloads</h2>
          <p class="gallary-descr-item-num">${downloads}</p>
        </li>
      </ul>
  </li>
  `;
};
