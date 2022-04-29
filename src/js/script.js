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
            const ratingBgc = determineRatingBgc(book.rating);
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

    function determineRatingBgc(rating) {
        let background = '';

      if(rating < 6){
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if(rating > 6 && rating <= 8){
        background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
      } else if(rating > 8 && rating <= 9){
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if(rating > 9){
        background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
      }

      return background;
    
    }

    render();
    initActions();
    

}