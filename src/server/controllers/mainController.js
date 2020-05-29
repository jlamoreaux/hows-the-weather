const path = require('path');
const openWeatherUrl = 'http://api.openweathermap.org/data/2.5/onecall?';
const geoNamesUrl = 'http://api.geonames.org/geoCodeAddressJSON?';
const weatherbitUrl = 'http://api.weatherbit.io/v2.0/forecast/daily?';
const pixabayUrl = 'https://pixabay.com/api/?';
const weatherKey = process.env.OPENWEATHERKEY;
const geoNamesId = process.env.GEONAMESID;
const weatherbitKey = process.env.WEATHERBITKEY;
const pixabayKey = process.env.PIXABAYKEY;
const axios = require('axios');

exports.getHomepage = (req, res) => {
    res.sendFile("../../dist/index.html", { root: __dirname });
}

exports.getWeather = async (req, res) => {
    let locationArr = req.body.location.split(' ');
    console.log(locationArr);
    const location = locationArr.join("").split(",").join("+");
    const geocode = await getLatLng(location);
    const images = await getPlaceImage(locationArr);

    const latLng = {
        lat: geocode.data.address.lat,
        lng: geocode.data.address.lng,
    };

    const weather = await getWeatherbit(latLng);

    const data = { images: images.data, weather: weather.data };

    try {
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const getPlaceImage = async (location) => {
    try {
        for (let i = 0; i < location.length;){
            let result = await axios.get(`${pixabayUrl}key=${pixabayKey}&category=places&q=${location[i]}`);
            if (result.data.total == 0 && location[i + 1]) {
                i++
            } else {
                return result;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const getOpenWeather = async (location) => {
    try {
        return await axios.get(`${openWeatherUrl}lat=${location.lat}&lon=${location.lng}&exclude=current,minutely,hoUrly&appid=${weatherKey}`);
    } catch (error) {
        console.log(error);
    }
}

const getWeatherbit = async (location) => {
    try {
        return await axios.get(`${weatherbitUrl}key=${weatherbitKey}&lat=${location.lat}&lon=${location.lng}`);
    } catch (error) {
        console.log(error);
    }
}

const getLatLng = async (location) => {
    try {
        return await axios.get(`${geoNamesUrl}q=${location}&username=${geoNamesId}`);
    } catch (error) {
        console.log(error);
    }
}

