/**
 * Dom Element Creation
 */
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
let buttonId = 0;

/**
 * constructor for book objects
 * @param {*} id
 * @param {*} author
 * @param {*} title
 * @param {*} numberOfPages
 * @param {*} haveRead
 */
class Book {
  constructor(id, author, title, numberOfPages, haveRead) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.haveRead = haveRead;
  };
}

/**
 * every time a book is deleted, this resets all id's from 1 and increasing in increments of 1
 */
const resetBookIdsFrom1 = () => {
  bookId = 0;
  for (let j = 0; j < libraryArray.length; j++) {
    bookId++;
    libraryArray[j].id = bookId;
  }
};

/**
 * this hides the form for entering a new book
 */
const hideBookForm = () => {
  bookForm.classList.add('invisible');
  fullPage.classList.remove('darken');
};

/**
 * this shows the form for entering a new book
 */
const showBookForm = () => {
  bookForm.classList.remove('invisible');
  fullPage.classList.add('darken');
};

/**
 * clears book form. . .
 */
const clearBookForm = () => {
  authorInput.value = '';
  titleInput.value = '';
  pagesInput.value = '';
  haveReadButton.checked = false;
};

/**
 *
 * @returns whether a book has been read or not
 */
const haveReadOrNot = () => {
  if (haveReadButton.checked) {
    return 'Read!';
  } else {
    return 'Still Need to Read!';
  }
};

/**
 *
 * @param {*} e
 * handles logic for altering a book from read to not read and vice versa
 */
const alterReadOrNotRead = (e) => {
  let currentText = e.target.innerText;
  let currentCard = e.target.dataset.reference;
  if (currentText === 'Read!') {
    currentText = 'Still Need to Read!';
    e.target.textContent = '';
    e.target.textContent = currentText;
    e.target.classList.remove('have-read');
  } else if (currentText === 'Still Need to Read!') {
    currentText = 'Read!';
    e.target.textContent = '';
    e.target.textContent = currentText;
    e.target.classList.add('have-read');
  }
  for (let i = 0; i < libraryArray.length; i++) {
    let currentBook = libraryArray[i];
    if (currentCard == currentBook.id) {
      currentBook.haveRead = currentText;
    }
  }
};

/**
 * clears the library to reset for adding books
 */
const clearLibraryBeforeAddingBooks = () => {
  if (libraryDisplay.hasChildNodes()) {
    while (libraryDisplay.firstChild) {
      libraryDisplay.removeChild(libraryDisplay.lastChild);
    }
  }
};

/**
 * 
 * @returns handles logic for delete button in book form
 * calls   
 *  clearBookForm()
    clearLibraryBeforeAddingBooks()
    addBooksToLibrary()
    haveReadOrNot()
 */
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
  deleteId = bookId;
  let checkBook = new Book(
    deleteId,
    deleteAuthor,
    deleteTitle,
    deleteNumberOfPages,
    deleteHaveRead
  );

  for (let i = 0; i < libraryArray.length; i++) {
    let currentBook = libraryArray[i];
    if (
      checkBook.author === currentBook.author &&
      checkBook.title === currentBook.title &&
      checkBook.numberOfPages === currentBook.numberOfPages &&
      checkBook.haveRead === currentBook.haveRead
    ) {
      libraryArray.splice(i, 1);
    }
  }

  clearBookForm();
  clearLibraryBeforeAddingBooks();
  addBooksToLibrary();
  bookForm.classList.add('invisible');
  fullPage.classList.remove('darken');
};

/**
 * adds books to on-screen library by creating DOM objects to contain indeces from libraryArray
 */
const addBooksToLibrary = () => {
  buttonId = 0;
  for (let i = 0; i < libraryArray.length; i++) {
    buttonId++;

    const bookContainer = document.createElement('div');
    const newAuthor = libraryArray[i].author;
    const newTitle = libraryArray[i].title;
    const numberOfPages = libraryArray[i].numberOfPages;
    const haveRead = libraryArray[i].haveRead;
    const authorDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const pagesDiv = document.createElement('div');
    const readButton = document.createElement('div');
    const removeButton = document.createElement('div');

    readButton.setAttribute('id', 'read-div');
    bookContainer.classList.add('book-container');
    authorDiv.classList.add('book-container-line');
    titleDiv.classList.add('book-container-line');
    pagesDiv.classList.add('book-container-line');
    readButton.classList.add('book-container-line');

    if (haveRead === 'Read!') {
      readButton.classList.add('have-read');
    }

    readButton.addEventListener('click', alterReadOrNotRead);
    readButton.setAttribute('data-reference', `${buttonId}`);
    removeButton.classList.add('book-container-remove');
    removeButton.setAttribute('id', `${buttonId}`);

    authorDiv.innerHTML = `<h2>Author</h2> <p>${newAuthor}</p>`;
    titleDiv.innerHTML = `<h2>Title</h2> <p>${newTitle}</p>`;
    pagesDiv.innerHTML = `<h2>Number of Pages</h2> <p>${numberOfPages}</p>`;
    readButton.innerText = `${haveRead}`;
    removeButton.innerHTML = `<button id=${buttonId} class='remove-button'>Remove</button>`;
    removeButton.addEventListener('click', removeFromLibrary);

    bookContainer.appendChild(authorDiv);
    bookContainer.appendChild(titleDiv);
    bookContainer.appendChild(pagesDiv);
    bookContainer.appendChild(readButton);
    bookContainer.appendChild(removeButton);
    libraryDisplay.appendChild(bookContainer);

    bookForm.classList.add('invisible');
    fullPage.classList.remove('darken');
  }
};

/**
 * handles logic for adding book to lobraryArray
 * @returns Alert if all fields are not filled in
 * calls
 *  haveReadOrNot()
 *  clearBookForm()
 *  clearLibraryBeforeAddingBooks()
 *  addBooksToLibrary()
 */
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

  clearBookForm();
  clearLibraryBeforeAddingBooks();
  libraryArray.push(newBook);
  buttonId = 0;
  addBooksToLibrary();
};

/**
 * handles logic for remove button in bookContainer
 * @param {*} e links to remove button on bookContainer
 * calls
 *  resetBookIdsFrom1();
    clearLibraryBeforeAddingBooks();
    addBooksToLibrary();
 */
const removeFromLibrary = (e) => {
  let bookIdToRemove = parseInt(e.target.id);
  for (let i = 0; i < libraryArray.length; i++) {
    let currentBook = libraryArray[i];

    if (bookIdToRemove === currentBook.id) {
      libraryArray.splice(i, 1);
    }
  }

  resetBookIdsFrom1();
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
