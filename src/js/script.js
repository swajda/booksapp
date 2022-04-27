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
        },
    };

    const templates = {
        bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
    };

    const favouriteBooks = [];

    function render() {
        for (let book of dataSource.books) {
            const generatedHTML = templates.bookTemplate(book);
            const generatedDOM = utils.createDOMFromHTML(generatedHTML);
            const bookContainer = document.querySelector(select.containerOf.booksList);

            bookContainer.appendChild(generatedDOM);
        }
    }

    function initActions() {
        const bookImages = document.querySelectorAll(select.containerOf.images);

        for (let image of bookImages) {
            image.addEventListener('dblclick', function (event) {
                event.preventDefault();
                image.classList.toggle('favorite');
                const bookId = image.getAttribute('data-id');
                if (image.classList.contains('favourite')) {
                    console.log(bookId);
                    favouriteBooks.push(bookId);
                }else favouriteBooks.splice(bookId);
            });
        }

    }

    render();
    initActions();
    console.log('favBooks', favouriteBooks);
}