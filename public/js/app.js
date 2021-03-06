console.log('Client side javascript file is loaded!');

// fetch('http://puzzle.mead.io/puzzle').then(response => {
//     response.json().then(data => {
//         console.log(data);
//     });
// });

// Grab a reference to the form and entities
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
    // Prevent form submit
    e.preventDefault();

    // Grab the search value
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    // Client side Javascript only, async
    fetch('/weather?address=' + encodeURI(location)).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});
