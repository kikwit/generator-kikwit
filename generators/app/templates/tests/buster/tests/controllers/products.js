var buster = require("buster");

var assert = buster.referee.assert;

buster.testCase("A module", {
    "states the obvious": function () {
        assert(true);
    }
});
