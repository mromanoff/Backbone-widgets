'use strict';

describe("myFunction", function () {
    var myfunc = NS.myFunction;

    it("should be able to initialize", function() {
        expect(myfunc.init).toBeDefined();
        myfunc.init();
        expect(myfunc.init).toHaveBeenCalled();
    });
});
