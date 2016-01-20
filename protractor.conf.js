var fs = require("fs");

var openStreams = [];

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

    afterLaunch: function () {
        var defer = protractor.promise.defer();
        openStreams.forEach(function (stream) {
            stream.on("end", function () {
                removeStream(stream);
                resolve();
            });
        });
        resolve();
        return defer.promise;

        function resolve() {
            if (openStreams.length === 0) {
                defer.resolve();
            }
        }
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
    stream.end(data, function () {
        removeStream(stream);
    });
    openStreams.push(stream);
}

function removeStream(stream) {
    var index = openStreams.indexOf(stream);
    if (index !== -1) {
        openStreams.slice(index, 1);
    }
}