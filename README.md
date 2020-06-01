# How's The Weather

## Description
Check the weather for the day of your trip.

## Using
Enter the location and date of your trip. A card will be added with weather information for that day.

## Setup
1. Fork the repository
2. Install dependencies by running `npm install`
3. Generate webpack by running `npm run build-prod`
4. Get API credentials for Google Maps, GeoNames, Weatherbit and PixaBay
5. Create .env file and add the following:
    - PORT=7777
    - GOOGLEKEY=[ YOUR API KEY ]
    - GEONAMESID=[ YOUR USER ID]
    - WEATHERBITKEY=[ YOUR API KEY ]
    - PIXABAYKEY=[ YOUR API KEY ]
6. Run with `npm start` command.
