import eqjs from 'eq.js';

let contentContainers = document.querySelectorAll('.content').forEach((elm) => (
    eqjs.definePts(elm, {
        ['content--large']: 900,
    })
));
