/**
 * Created by Alice on 22/01/17.
 */

import Server from "../src/rest/Server";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";
var fs = require('fs');


function base64_encode(file: any) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}
var testBase64: string = null;
var insightFacade: InsightFacade = null;

describe("InsightFacadeSpec", function () {

    function sanityCheck(response: InsightResponse) {
        expect(response).to.have.property('code');
        expect(response).to.have.property('body');
        expect(response.code).to.be.a('number');
    }

    before(function (done) {
        // Empty for now
        //Log.test('Before: ' + (<any>this).test.parent.title);
        done();
    });

    beforeEach(function (done) {
        // Initialize zip file
        try { testBase64 = base64_encode("courses.zip"); } catch(e) { Log.trace("e = " + e); }
        Log.trace("testBase64 encoded, = " + testBase64);

        // Initialize InsightFacade instance
        insightFacade = new InsightFacade();
        Log.test('BeforeTest: ' + (<any>this).currentTest.title);
        done();
    });

    after(function (done) {
        //Log.test('After: ' + (<any>this).test.parent.title);
        done();
    });

    afterEach(function (done) {
        //Log.test('AfterTest: ' + (<any>this).currentTest.title);
        done();
    });

    // TODO: test each helper function in InsightFacade.ts
    
    // tests addDataset with converted zip file, passing in arbitrary ID "courses", expects code 204
    it("Calling addDataset with test base64 zip, should return code 204", function (done) {
        var id: string = "courses";

        insightFacade.addDataset(id, testBase64)
            .then(function (value: InsightResponse) {
                Log.test('Value: ' + value);
                Log.test("Value.code: " + value.code);
                expect(value.code).to.equal(204);
                done();
            })
            .catch(function (err: InsightResponse) {
                Log.test('Test error: ' + err);
                expect.fail();
                done();
            });
    });
});
