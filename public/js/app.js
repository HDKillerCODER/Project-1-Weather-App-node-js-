

const weather = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weather.addEventListener('submit', (event) => {
    event.preventDefault()  // it prevents the page to reload instead it allows us to do whatever we want to do
    const location = search.value;
    messageOne.textContent = 'Loading..'
            messageTwo.textContent = '';

    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if(data.error)
            {
                messageOne.textContent = data.error; 
                return;
            }
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
            //messageOne.textContent = '';
        })
    })

    //console.log(location);
})