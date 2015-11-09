var fs = require("fs");

exports.config = {
    specs: ["throwErrorTest.js"],

    onPrepare: function () {
        // overrides addExpectationResult to take screenshots on each expectation
        var originalAddExpectationResult = jasmine.Spec.prototype.addExpectationResult;
        jasmine.Spec.prototype.addExpectationResult = function () {
            takeScreenshotAndSave(this.result.fullName);
            return originalAddExpectationResult.apply(this, arguments);
        };
    },

    baseUrl: "https://angularjs.org/",

    rootElement: "html",

    framework: "jasmine2",
    jasmineNodeOpts: {
        showColors: true,
        includeStackTrace: true
    }
};

function takeScreenshotAndSave(name) {
    browser.takeScreenshot().then(function (image) {
        saveFile(name + ".png", new Buffer(image, "base64"));
    }, function () {
        throw new Error("[SCEENSHOT-CATCH] THIS SHOULD NEVER BE CALLED");
    });
}

function saveFile(fileName, data) {
    console.log("writing", fileName, "with data", data);
    var stream = fs.createWriteStream(fileName);
    stream.write(data);
    stream.end();
}