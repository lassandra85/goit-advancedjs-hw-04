import { fetchImages } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
const perPage = 15;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', async e => {
  e.preventDefault();

  currentQuery = e.target.elements.searchQuery.value.trim();
  if (!currentQuery) {
    iziToast.warning({ message: 'Please enter a search query' });
    return;
  }

  currentPage = 1;
  gallery.innerHTML = '';
  toggleLoader(true);
  toggleLoadMore(false);

  try {
    const data = await fetchImages(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    const markup = createMarkup(data.hits);
    gallery.innerHTML = markup;
    lightbox.refresh();
    toggleLoadMore(currentPage * perPage < totalHits);
  } catch (error) {
    iziToast.error({ message: 'Something went wrong. Try again later.' });
    console.error(error);
  } finally {
    toggleLoader(false);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  toggleLoader(true);
  toggleLoadMore(false);

  try {
    const data = await fetchImages(currentQuery, currentPage);
    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    lightbox.refresh();

    smoothScroll();
    toggleLoadMore(currentPage * perPage < totalHits);

    if (currentPage * perPage >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({ message: 'Something went wrong.' });
  } finally {
    toggleLoader(false);
  }
});

function toggleLoader(show) {
  loader.classList.toggle('is-hidden', !show);
}

function toggleLoadMore(show) {
  loadMoreBtn.classList.toggle('is-hidden', !show);
}

function smoothScroll() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
