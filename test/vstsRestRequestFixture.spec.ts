"use strict";

import { VstsRestRequest } from "../src/vstsClient";

describe("VSTS Rest Request Fixture", () => {
    it("Should return request path with version query string", () => {
        let path = "/_apis/projects/testproject";
        let version = "1.0";
        let request = new VstsRestRequest(path, "GET", version);
        let expectedResult = `${path}?version=${version}`;

        let result = request.getRequestUrl();

        expect(result).toBe(expectedResult);
    });

    describe("#addQueryParameter()", () => {
        it("Should return request path with query parameters", () => {
            let path = "/_apis/build/123";
            let version = "2.0";
            let request = new VstsRestRequest(path, "GET", version);
            let expectedResult = `${path}?version=${version}&param1=value1&param2=value2&param3=value3`;

            request.addQueryParameter("param1", "value1");
            request.addQueryParameter("param2", "value2");
            request.addQueryParameter("param3", "value3");

            let result = request.getRequestUrl();

            expect(result).toBe(expectedResult);
        });
    });

});