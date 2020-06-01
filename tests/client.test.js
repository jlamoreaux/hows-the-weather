const formatDate = require('../src/client/js/helpers').formatDate;

test("provides date object of 'June 11, 1997' and returns '1997-06-11' as a string", () => {
    let date = new Date(866005200000);
    expect(formatDate(date)).toBe('1997-06-11');
});