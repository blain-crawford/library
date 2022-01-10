const closingButton = document.querySelector('#closing-button');
const bookForm = document.querySelector('#book-entering-form');
const showBookFormButton = document.querySelector('#show-book-entering-form');
const fullPage = document.querySelector('body');
let libraryArray = [];


const hideBookForm = () => {
  bookForm.classList.add('invisible');
  fullPage.classList.remove('darken')
};

const showBookForm = () => {
  bookForm.classList.remove('invisible');
  fullPage.classList.add('darken')
};

closingButton.addEventListener('click', hideBookForm);
showBookFormButton.addEventListener('click', showBookForm);