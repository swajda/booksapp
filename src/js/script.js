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

    const favoriteBooks = [];

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

        bookContainer.addEventListener('dblclick', function (event) {
            event.preventDefault();

            const image = event.target.offsetParent;
            const bookId = image.getAttribute('data-id');
            
            
            if (!favoriteBooks.includes(bookId)) {
                image.classList.add('favorite');
                favoriteBooks.push(bookId);
            }else {
                const indexOfFav = favoriteBooks.indexOf(bookId);
                favoriteBooks.splice(indexOfFav, 1);
                image.classList.remove('favorite');                
            }
            console.log(favoriteBooks);
        });

    }




    render();
    initActions();
    
}