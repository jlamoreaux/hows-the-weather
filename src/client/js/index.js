import "../style/main.scss";
import { $, $$, formatDate } from "./helpers";

// TODO: Refactor

const placeInput = $("#form__location");
const dateInput = $("#form__date");
const submitButton = $("#main__form--submit");
const cardSection = $('#trips');

const now = new Date();
const limit = new Date();

limit.setDate(now.getDate() + 16);

dateInput.valueAsDate = new Date();
dateInput.min = formatDate(now);
dateInput.max = formatDate(limit);

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const location = placeInput.value;
  const date = dateInput.value;
  const jsDate = Date.parse(date);

  if (!placeInput.value) {
    alert("Please enter a location");
    return;
  }

  if (now.setDate(now.getDate() - 1) < jsDate && jsDate < limit) {
    const weatherResult = await postData("/weather", {
      location,
      date,
    });
    if (!weatherResult) {
      alert("No results could be found");
    } else {
        weatherResult.date = jsDate;
        addTrip(weatherResult);
    }
  } else {
    alert(`Please choose a date between today and ${limit.toDateString()}`);
  }
});

/**
 * @description - Initializes Google Map
 */
const initMap = () => {
  const autocomplete = new google.maps.places.Autocomplete(placeInput, {
    types: ["(regions)"],
  });
};

window.initMap = initMap;

/**
 * @description - Simple POST request function
 * @param {String} route - Route of API to POST to
 * @param {Object} data - Object containing data to POST
 */
const postData = async (route, data) => {
  const result = await fetch(route, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const response = await result.json();
    return response;
  } catch (error) {
    console.log(`OH NO! There was an error...`, error);
    return 0;
  }
};

/**
 * @description - Adds a card containing trip information to the DOM
 * @param {Object} data - Object including data to add to card. {date, image, weather, location}
 */
const addTrip = async (data) => {
    const date = new Date(data.date);
    const card = document.createElement('div');
    card.classList = 'card';
    const image = document.createElement('img');
    image.classList = 'card__image';
    image.setAttribute('src', data.images.hits[0].webformatURL);
    card.appendChild(image);
    const countdownElem = document.createElement('div');
  countdownElem.classList = 'countdown';
    card.innerHTML += `
    <div class="card__inner">
        <h2 className="card__title">${data.location}</h2>
        <time class="card__date">${date.toDateString()}</time>
            <div class="card__weather">
                <div class="weather__description">
                    <span class="weather__description--label">Forecast:</span>
                    <ul class="weather__items">
                        <li class="weather__description__item">${data.weather.weather.description}</li>
                        <li class="weather__description__item weather__temp--hi">High: <span class="temp">${data.weather.high_temp}</span></li>
                        <li class="weather__description__item weather__temp--lo">Low: <span class="temp">${data.weather.low_temp}</span></li>
                    </ul>
                </div>
            </div>
        </div>`;
    card.appendChild(countdownElem);
  cardSection.appendChild(card);
  window.setInterval(() => { setCountdown(date, countdownElem) }, 500);
};

/**
 * 
 * @param {Date} futureDate - Date to countdown to
 * @param {Element} countdownElem - Element to add the countdown to
 */
const setCountdown = (futureDate, countdownElem) => {
    const currentDate = new Date();
    const dif = futureDate.getTime() - currentDate.getTime();
    let days, hours, minutes, seconds = 0;
    if (dif > 0) {
        days = Math.floor(dif / (1000 * 60 * 60 * 24));
        hours = Math.floor(
            (dif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        minutes = Math.floor(
            (dif % (1000 * 60 * 60)) / (1000 * 60)
        );
        seconds = Math.floor((dif % (1000 * 60)) / 1000);
    }
  const countdownString = `${days || 0} days, ${hours || 0} hours, ${minutes || 0} minutes, ${seconds || 0} seconds`;
  countdownElem.innerHTML = countdownString;
};

document.addEventListener("DOMContentLoaded", () => {});
