const closingButton = document.querySelector('#closing-button');
const bookForm = document.querySelector('#book-entering-form');
const showBookFormButton = document.querySelector('#show-book-entering-form');
const fullPage = document.querySelector('body');
const libraryDisplay = document.querySelector('#library');
const authorInput = document.querySelector('#author-input');
const titleInput = document.querySelector('#title-input');
const pagesInput = document.querySelector('#pages-input');
const submitButton = document.querySelector('#submit');
const deleteButton = document.querySelector('#delete-book');
const removeButton = document.querySelector('#remove-book');
const haveReadButton = document.querySelector('#have-read');
let libraryArray = [];
let bookId = 0;

function Book (id, author, title, numberOfPages, haveRead) {
  this.id = id;
  this.author = author;
  this.title = title;
  this.numberOfPages = numberOfPages;
  this.haveRead = haveRead;
};

const hideBookForm = () => {
  bookForm.classList.add('invisible');
  fullPage.classList.remove('darken')
};

const showBookForm = () => {
  bookForm.classList.remove('invisible');
  fullPage.classList.add('darken')
};

const haveReadOrNot = () => {
  if(haveReadButton.checked) {
    return 'Read!'
  } else {
    return 'Still Need to Read!'
  }
};

const clearLibraryBeforeAddingBooks = () => {
  if (libraryDisplay.hasChildNodes()) {
    while (libraryDisplay.firstChild) {
      libraryDisplay.removeChild(libraryDisplay.lastChild);
    }
  }
};

const deleteBookFromLibrary = () => {
  if (
    authorInput.value === '' ||
    titleInput.value === '' ||
    pagesInput.value === ''
  ) {
    alert('ERROR: ALL FIELDS REQUIRED');
    return;
  }
  deleteAuthor = authorInput.value;
  deleteTitle = titleInput.value;
  deleteNumberOfPages = pagesInput.value;
  deleteHaveRead = haveReadOrNot();
  let checkBook = new Book(deleteAuthor, deleteTitle, deleteNumberOfPages, deleteHaveRead);
  for(let i = 0; i < libraryArray.length; i++){
    if(
      checkBook.author === libraryArray[i].author 
      // checkBook.title === libraryArray[i].title && 
      // checkBook.numberOfPages === libraryArray[i].numberOfPages &&
      // checkBook.haveRead === libraryArray[i].haveRead
      ) {
          console.log(libraryArray[i]);
      }
  }
  // clearLibraryBeforeAddingBooks();
  // addBooksToLibrary();
  // bookForm.classList.add('invisible');
  // fullPage.classList.remove('darken');
  // console.log(checkBook);
  // console.log(libraryArray);
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
    readDiv.innerHTML = `<h2>${haveRead}</h2>`;
    removeButton.innerHTML = `<button id=${bookId} class="remove-button">Remove</button>`;
    removeButton.addEventListener('click', removeFromLibrary)
    bookContainer.appendChild(authorDiv);
    bookContainer.appendChild(titleDiv);
    bookContainer.appendChild(pagesDiv);
    bookContainer.appendChild(readDiv);
    bookContainer.appendChild(removeButton);
    libraryDisplay.appendChild(bookContainer);
    bookForm.classList.add('invisible');
    fullPage.classList.remove('darken');
  }
};

const createBook = () => {
  let readingStatus = haveReadOrNot();
  bookId++;
  if (
    authorInput.value === '' ||
    titleInput.value === '' ||
    pagesInput.value === ''
  ) {
    alert('ERROR: ALL FIELDS REQUIRED');
    return;
  }
  const newBook = new Book(
    bookId,
    authorInput.value,
    titleInput.value,
    pagesInput.value,
    readingStatus
  );
  authorInput.value = '';
  titleInput.value = '';
  pagesInput.value = '';
  haveReadButton.checked = false;
  clearLibraryBeforeAddingBooks();
  libraryArray.push(newBook);
  addBooksToLibrary();
  console.log(libraryArray);
};

const removeFromLibrary = () => {
  libraryArray.pop();
  clearLibraryBeforeAddingBooks();
  addBooksToLibrary();
};


/**
 * adding event listeners to buttons
 */
submitButton.addEventListener('click', createBook);
haveReadButton.addEventListener('click', haveReadOrNot);
closingButton.addEventListener('click', hideBookForm);
showBookFormButton.addEventListener('click', showBookForm);
deleteButton.addEventListener('click', deleteBookFromLibrary);