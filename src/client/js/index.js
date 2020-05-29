import "../style/main.scss"
import { $, $$ } from './helpers';

const placeInput = $('#form__location');
const dateInput = $('#form__date');
const submitButton = $('#main__form--submit');

dateInput.valueAsDate = new Date();

submitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const location = placeInput.value;
    const date = dateInput.value;
    const weatherResult = await postData('/weather', { location, date });
    try {
        console.log(weatherResult);
    } catch (error) {
        console.log(error);
    }
});


const initMap = () => {
    const autocomplete = new google.maps.places.Autocomplete(placeInput, {
        types: ['(regions)'] 
    });
}

window.initMap = initMap;

const postData = async (route, data) => {
    const result = await fetch(route, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        const response = await result.json();
        return response;
    } catch (error) {
        console.log(`OH NO! There was an error...`, error);
    }
}

document.addEventListener('DOMContentLoaded', () => {

})
