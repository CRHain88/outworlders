import eqjs from 'eq.js';

const contentContainers = document.querySelectorAll('[data-eq--content]').forEach((elm) => {
    eqjs.definePts(elm, {
        ['content--large']: 900,
    });

    elm.addEventListener('eqResize', (event) => {
        elm.querySelectorAll('[data-eq--card="contact"]').forEach((card) => {
            let cardClasses = card.className;

            if (event.detail === 'content--large') {
                card.className = cardClasses.replace('card--dark', 'card--light');
            } else {
                card.className = cardClasses.replace('card--light', 'card--dark');
            }
        });

        elm.querySelectorAll('[data-eq--card="officers"] .card__header, [data-eq--card="about-us"] .card__header').forEach((card) => {
            let cardClasses = card.className;

            if (event.detail === 'content--large') {
                card.className = (cardClasses.indexOf('card__header--solid') === -1) ? cardClasses + ' card__header--solid' : cardClasses;
            } else {
                card.className = cardClasses.replace('card__header--solid', '').trim();
            }
        });
    });
});

export default contentContainers;
