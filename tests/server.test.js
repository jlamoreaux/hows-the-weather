import controller from '../src/server/controllers/mainController';

test("calculates number of days between June 13 1997 and June 14 1998 to equal 366", () => {
    const first = new Date('June 13, 1997');
    const last = new Date('June 14, 1998');
  expect(controller.getDif(last, first)).toBe(366);
});
