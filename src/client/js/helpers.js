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