import "./style/main.scss";
import { $, $$, formatDate } from "./js/helpers";
import { placeInput, listenForSubmit } from './js/app';
import "core-js/stable";
import "regenerator-runtime/runtime";

/**
 * @description - Initializes Google Map
 */
const initMap = () => {
  const autocomplete = new google.maps.places.Autocomplete(placeInput, {
    types: ["(regions)"],
  });
};

window.initMap = initMap;

document.addEventListener("DOMContentLoaded", () => {
  listenForSubmit();
});
