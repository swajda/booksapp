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

    const favoriteBooks = [];
    const filters = [];

    function render() {
        for (let book of dataSource.books) {
            const generatedHTML = templates.bookTemplate(book);
            const generatedDOM = utils.createDOMFromHTML(generatedHTML);
            const bookContainer = document.querySelector(select.containerOf.booksList);

            bookContainer.appendChild(generatedDOM);
        }
    }

    function initActions() {

        const bookContainer = document.querySelector(select.containerOf.booksList);
        const filtersContainter = document.querySelector(select.containerOf.filters);

        bookContainer.addEventListener('dblclick', function (event) {
            event.preventDefault();

            const image = event.target.offsetParent;
            const bookId = image.getAttribute('data-id');


            if (!favoriteBooks.includes(bookId)) {
                image.classList.add('favorite');
                favoriteBooks.push(bookId);
            } else {
                const indexOfFav = favoriteBooks.indexOf(bookId);
                favoriteBooks.splice(indexOfFav, 1);
                image.classList.remove('favorite');
            }
            console.log(favoriteBooks);
        });

        filtersContainter.addEventListener('click', function (callback) {
            const clickedElement = callback.target;
            if (clickedElement.tagName == 'INPUT' && clickedElement.type == 'checkbox' && clickedElement.name == 'filter') {

                if (clickedElement.checked) {
                    filters.push(clickedElement.value);

                } else {
                    const clickedElementIndex = filters.indexOf(clickedElement.value);
                    filters.splice(clickedElementIndex, 1);
                }
                filterBooks();
            }

        });


    }

    function filterBooks() {

        for (let book of dataSource.books) {
            let shouldBeHidden = false;
            const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
            for (let filter of filters) {
                if (!book.details[filter]) {
                    shouldBeHidden = true;
                    break;
                }
            }
            if(shouldBeHidden){
                bookImage.classList.add('hidden');
            }else {
                bookImage.classList.remove('hidden');
            }
        }
    }


    render();
    initActions();

}