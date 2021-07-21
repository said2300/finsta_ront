import { calculTVA } from "../calculTVA";

describe("CalculTVA", () => {
  test("Should return 10 for 100 price and 10% TVA", () => {
    expect(calculTVA(100, 10)).toEqual(10);
  });
  test("Should return 0 price 0 and 0% TVA", () => {
    expect(calculTVA(0, 0)).toEqual(0);
  });
  test("Should return 10 for 200 price and 5% TVA", () => {
    expect(calculTVA(200, 5)).toEqual(10);
  });
});
