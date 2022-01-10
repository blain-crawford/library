const closingButton = document.querySelector('#closing-button');
const bookForm = document.querySelector('#book-entering-form');
const showBookFormButton = document.querySelector('#show-book-entering-form');
const fullPage = document.querySelector('body');
const libraryDisplay = document.querySelector('#library');
const authorInput = document.querySelector('#author-input');
const titleInput = document.querySelector('#title-input');
const pagesInput = document.querySelector('#pages-input');
const submitButton = document.querySelector('#submit');
const removeButton = document.querySelector('#remove-book');
const haveReadButton = document.querySelector('#have-read');
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

function Book (author, title, numberOfPages, haveRead) {
  this.auther = author;
  this.title = title;
  this.numberOfPages = numberOfPages;
  this.haveRead = haveRead;
};

const addBooksToLibrary = () => {
  for (let i = 0; i < libraryArray.length; i++) {
    const bookContainer = document.createElement('div')
    bookContainer.classList.add('book-container');
    const newAuthor = libraryArray[i].author;
    const newTitle = libraryArray[i].title;
    const numberOfPages = libraryArray[i].numberOfPages;
    const haveRead = libraryArray[i].haveRead
    const authorDiv = document.createElement('div')
    authorDiv.classList.add('book-container-line');
    const titleDiv = document.createElement('div')
    titleDiv.classList.add('book-container-line');
    const pagesDiv = document.createElement('div')
    pagesDiv.classList.add('book-container-line');
    const readDiv = document.createElement('div')
    readDiv.classList.add('book-container-line');
    const removeButton = document.createElement('div')
    removeButton.classList.add('book-container-remove')
    authorDiv.innerHTML = `<h2>Author</h2> <p>${newAuthor}</p>`;
    titleDiv.innerHTML = `<h2>Title</h2> <p>${newTitle}</p>`;
    pagesDiv.innerHTML = `<h2>Number of Pages</h2> <p>${numberOfPages}</p>`;
    readDiv.innerHTML = `<h2>Read</h2> <p>${haveRead}</p>`;
    removeButton.innerHTML = `<button class="remove-button">Remove</button>`;
    bookContainer.appendChild(authorDiv);
    bookContainer.appendChild(titleDiv);
    bookContainer.appendChild(pagesDiv);
    bookContainer.appendChild(readDiv);
    bookContainer.appendChild(removeButton);
    libraryDisplay.appendChild(bookContainer);
    bookForm.classList.add('invisible');
    fullPage.classList.remove('darken')
  }
};

const createBook = () => {
  if (
    authorInput.value === '' ||
    titleInput.value === '' ||
    pagesInput.value === '' ||
    !haveReadButton.checked
  ) {
    alert('ERROR: ALL FIELDS REQUIRED');
    return;
  }
  const newBook = new Book(
    authorInput.value,
    titleInput.value,
    pagesInput.value,
    haveReadButton.value
  );
  authorInput.value = '';
  titleInput.value = '';
  pagesInput.value = '';
  // haveReadButton.checked = ;
  if (libraryDisplay.hasChildNodes()) {
    while (libraryDisplay.firstChild) {
      libraryDisplay.removeChild(libraryDisplay.lastChild);
    }
  }
  libraryArray.push(newBook);
  addBooksToLibrary();
};

const deleteAccount = () => {
  libraryArray.pop();
  if (myDiv.hasChildNodes()) {
    while (myDiv.firstChild) {
      myDiv.removeChild(myDiv.lastChild);
    }
  }
  displayUsers();
};

const haveReadValue = () => {
  if(haveReadButton.checked) {
    console.log('checked')
  } else {
    console.log('nope')
  }
}

submitButton.addEventListener('click', createBook);

haveReadButton.addEventListener('click', haveReadValue);
