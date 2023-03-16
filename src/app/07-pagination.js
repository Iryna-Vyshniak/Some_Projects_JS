const gallery = document.querySelector('#pagination-gallery');

let page = 1;

function rickandmortyAPI(page = 1) {
  return fetch(`https://rickandmortyapi.com/api/character/?page=${page}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }
  );
}

//! ---------------------  -----------------------------------------------

// для плавного прокручування сторінки після запиту і відтворення кожної наступної групи зображень
// document.addEventListener('scroll', onScroll);

// function onScroll() {
//   const { height: cardHeight } = document
//     .querySelector('.js-list')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }

rickandmorty();

function rickandmorty() {
  return rickandmortyAPI()
    .then(({ info: { pages }, results }) => {
      console.log('сторінка: ', page, 'всього сторінок: ', pages);

      createMarkup(results);
      //load.hidden = false;
      // onScroll(); //плавне прокручування сторінки після запиту і відтворення кожної наступної групи зображень
    })
    .catch(err => console.log(err));
}

function createMarkup(arr) {
  const markup = arr
    .map(
      ({
        name,
        image,
        species,
        gender,
        location: { name: location },
      }) => `<li class="wrapper">
    <div class="img-area">
      <div class="inner-area">
        <img src="${image}" alt="${name}">
      </div>
    </div>
    <div class="icon arrow"><i class="fas fa-arrow-left"></i></div>
    <div class="icon dots"><i class="fas fa-ellipsis-v"></i></div>
    <div class="name">${name}</div>
    <div class="about">${species}</div>
    <div class="social-icons">
      <a href="#" class="fb"><i class="fab fa-facebook-f"></i></a>
      <a href="#" class="twitter"><i class="fab fa-twitter"></i></a>
      <a href="#" class="insta"><i class="fab fa-instagram"></i></a>
      <a href="#" class="yt"><i class="fab fa-youtube"></i></a>
    </div>
    <div class="buttons">
      <button>Message</button>
      <button>Subscribe</button>
    </div>
    <div class="social-share">
      <div class="row">
        <i class="far fa-heart"></i>
        <i class="icon-2 fas fa-heart"></i>
        <span>${randomNumber(1000)}</span>
      </div>
      <div class="row">
        <i class="far fa-comment"></i>
        <i class="icon-2 fas fa-comment"></i>
        <span>${randomNumber(1000)}</span>
      </div>
      <div class="row">
        <i class="fas fa-share"></i>
        <span>${randomNumber(1000)}</span>
      </div>
    </div>
        </li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

function onLoad() {
  nextPage();
  return rickandmortyAPI()
    .then(({ info: { pages }, results }) => {
      // data
      console.log('сторінка: ', page, 'всього сторінок: ', pages);

      if (pages === page) {
        // load.hidden = true;
        return;
      }
      createMarkup(results);
      //   onScroll(); //плавне прокручування сторінки після запиту і відтворення кожної наступної групи зображень
    })
    .catch(err => console.log(err));
}

function clearGallery() {
  gallery.innerHTML = '';
}

function nextPage() {
  page += 1;
}

const randomNumber = max => {
  return Math.floor(Math.random() * max + 1000);
};
