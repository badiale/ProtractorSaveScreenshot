describe("Throw error", function () {
    "use strict";

    beforeEach(function () {
        browser.get("#");
    });

    it("this is saved correctly", function () {
        expect(true).toBe(false);
    });

    it("this is not", function () {
        throw new Error("error");
    });

    xit("if this is enabled, then it works", function () {
    });
});
