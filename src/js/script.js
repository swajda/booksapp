//const { render } = require("sass");

/* eslint-disable indent */
{
    'use strict';

    const select = {
        templateOf: {
            bookTemplate: '#template-book',
        },

        containerOf: {
            booksList: '.books-list',
            images: '.book__image',
            filters: '.filters',
        },
    };

    const templates = {
        bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
    };


    class BooksList {
        constructor() {
            const thisBooksList = this;

            thisBooksList.initData();
            thisBooksList.getElements();
            thisBooksList.render();
            thisBooksList.initActions();
        }

        initData() {
            const thisBooksList = this;

            thisBooksList.data = dataSource.books;
            thisBooksList.favoriteBooks = [];
            thisBooksList.filters = [];
        }

        getElements() {
            const thisBooksList = this;

            thisBooksList.bookContainer = document.querySelector(select.containerOf.booksList);
            thisBooksList.filtersContainter = document.querySelector(select.containerOf.filters);
        }


        render() {
            const thisBooksList = this;

            for (let book of dataSource.books) {
                const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
                const ratingWidth = book.rating * 10;
                const generatedHTML = templates.bookTemplate({
                    id: book.id,
                    name: book.name,
                    price: book.price,
                    image: book.image,
                    rating: book.rating,
                    ratingBgc: ratingBgc,
                    ratingWidth: ratingWidth,
                });
                thisBooksList.elem = utils.createDOMFromHTML(generatedHTML);
                thisBooksList.bookContainer.appendChild(thisBooksList.elem);
            }
        }

        initActions() {
            const thisBooksList = this;


            thisBooksList.bookContainer.addEventListener('dblclick', function (event) {
                event.preventDefault();

                const image = event.target.offsetParent;
                const bookId = image.getAttribute('data-id');


                if (!thisBooksList.favoriteBooks.includes(bookId)) {
                    image.classList.add('favorite');
                    thisBooksList.favoriteBooks.push(bookId);
                } else {
                    const indexOfFav = thisBooksList.favoriteBooks.indexOf(bookId);
                    thisBooksList.favoriteBooks.splice(indexOfFav, 1);
                    image.classList.remove('favorite');
                }
            });

            thisBooksList.filtersContainter.addEventListener('click', function (callback) {
                const clickedElement = callback.target;
                if (clickedElement.tagName == 'INPUT' && clickedElement.type == 'checkbox' && clickedElement.name == 'filter') {

                    if (clickedElement.checked) {
                        thisBooksList.filters.push(clickedElement.value);

                    } else {
                        const clickedElementIndex = thisBooksList.filters.indexOf(clickedElement.value);
                        thisBooksList.filters.splice(clickedElementIndex, 1);
                    }
                    thisBooksList.filterBooks();
                }
            });


        }

        filterBooks() {
            const thisBooksList = this;

            for (let book of thisBooksList.data) {
                let shouldBeHidden = false;
                const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
                for (let filter of thisBooksList.filters) {
                    if (!book.details[filter]) {
                        shouldBeHidden = true;
                        break;
                    }
                }
                if (shouldBeHidden) {
                    bookImage.classList.add('hidden');
                } else {
                    bookImage.classList.remove('hidden');
                }
            }
        }

        determineRatingBgc(rating) {
            let background = '';

            if (rating < 6) {
                background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
            } else if (rating > 6 && rating <= 8) {
                background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
            } else if (rating > 8 && rating <= 9) {
                background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
            } else if (rating > 9) {
                background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
            }

            return background;

        }
    }

    const app = new BooksList();

    app;

}