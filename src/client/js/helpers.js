import "core-js/stable";
import "regenerator-runtime/runtime";

/**
 * @description - Shortcut for "document.querySelector()"
 * @param {String} elem - String containing one or more selectors to match
 * @returns {Element} - An HTMLElement object representing the first element in the document that matches the selector
 */
export const $ = (elem) => {
    return document.querySelector(elem);
}

/**
 * @description - Shortcut for "document.querySelectorAll()"
 * @param {String} elem - String containing one or more selectors to match
 * @returns {NodeList} - A non-live NodeList containing one Element object for each element that matches at least one of the specified selectors
 */
export const $$ = (elem) => {
    return document.querySelectorAll(elem);
}

/**
 * @description - Formats date object to to YYYY-MM-DD format String
 * @param {Date} date - Date object
 * @returns {String} - Date string in YYYY-MM-DD format
 */
export const formatDate = (date) => {
    let month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

/**
 * @description - Simple POST request function
 * @param {String} route - Route of API to POST to
 * @param {Object} data - Object containing data to POST
 */
export const postData = async (route, data) => {
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