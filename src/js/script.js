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
        },
    };

    const templates = {
        bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
    };

    function render() {
        for (let book of dataSource.books) {
            const generatedHTML = templates.bookTemplate(book);
            const generatedDOM = utils.createDOMFromHTML(generatedHTML);
            const bookContainer = document.querySelector(select.containerOf.booksList);

            bookContainer.appendChild(generatedDOM);
        }


    }

    render();
}