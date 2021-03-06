"use strict";

import {VstsClient, VstsConfiguration} from "../src/index";
import {TestExecutor} from "./helpers/testExecutor";

describe("Project Fixture", () => {
    describe("#getProjects()", () => {
        it("Should return multiple projects", (done) => {
            let mockExecutor = new TestExecutor("/_apis/projects?api-version=1.0", "GET", "getProjects");
            let client = new VstsClient(mockExecutor);

            return client.project.getProjects().then(result => {
                expect(result).not.toBeNull();
                expect(result.length).toBe(3);

                let first = result[0];
                expect(first.name).toBe("Fabrikam-Fiber-TFVC");
                expect(first.id).toBe("eb6e4656-77fc-42a1-9181-4c6d8e9da5d1");
                expect(first.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/projects/eb6e4656-77fc-42a1-9181-4c6d8e9da5d1");
                expect(first.state).toBe("wellFormed");

                let second = result[1];
                expect(second.name).toBe("Fabrikam-Fiber-Git");
                expect(second.id).toBe("6ce954b1-ce1f-45d1-b94d-e6bf2464ba2c");
                expect(second.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/projects/6ce954b1-ce1f-45d1-b94d-e6bf2464ba2c");
                expect(second.state).toBe("wellFormed");

                let third = result[2];
                expect(third.name).toBe("TestGit");
                expect(third.id).toBe("281f9a5b-af0d-49b4-a1df-fe6f5e5f84d0");
                expect(third.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/projects/281f9a5b-af0d-49b4-a1df-fe6f5e5f84d0");
                expect(third.state).toBe("wellFormed");

                done();
            });
        });

        it("Should return single project when only one exists", (done) => {
            let mockExecutor = new TestExecutor("/_apis/projects?api-version=1.0", "GET", "getProjectsOneResult");
            let client = new VstsClient(mockExecutor);

            return client.project.getProjects().then(result => {
                expect(result).not.toBeNull();
                expect(result.length).toBe(1);

                let project = result[0];
                expect(project.name).toBe("Fabrikam-Fiber-Git");
                expect(project.id).toBe("6ce954b1-ce1f-45d1-b94d-e6bf2464ba2c");
                expect(project.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/projects/6ce954b1-ce1f-45d1-b94d-e6bf2464ba2c");
                expect(project.state).toBe("wellFormed");

                done();
            });
        });

        it("Should return no projects if none exists", (done) => {
            let mockExecutor = new TestExecutor("/_apis/projects?api-version=1.0", "GET", "getProjectsEmpty");
            let client = new VstsClient(mockExecutor);

            return client.project.getProjects().then(result => {
                expect(result).not.toBeNull();
                expect(result.length).toBe(0);

                done();
            });
        });
    });

    describe("#getProject()", () => {
        it("Should return project with no capabilities", (done) => {
            let testProjectName = "Fabrikam-Fiber-TFVC";
            let mockExecutor = new TestExecutor(`/_apis/projects/${testProjectName}?api-version=1.0`, "GET", "getProject");
            let client = new VstsClient(mockExecutor);

            return client.project.getProject(testProjectName, false).then(result => {
                expect(result.name).toBe(testProjectName);
                expect(result.id).toBe("eb6e4656-77fc-42a1-9181-4c6d8e9da5d1");
                expect(result.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/projects/eb6e4656-77fc-42a1-9181-4c6d8e9da5d1");
                expect(result.state).toBe("wellFormed");
                expect(result.capabilities.versioncontrol.sourceControlType).toBe("Tfvc");
                expect(result.capabilities.processTemplate.templateName).toBe("Microsoft Visual Studio Scrum 2013");

                done();
            });
        });

        it("Should return project with capabilities", (done) => {
            let testProjectName = "Fabrikam-Fiber-TFVC";
            let mockExecutor = new TestExecutor(`/_apis/projects/${testProjectName}?api-version=1.0&includeCapabilities=true`, "GET", "getProject");
            let client = new VstsClient(mockExecutor);

            return client.project.getProject(testProjectName, true).then(result => {
                expect(result.name).toBe(testProjectName);
                expect(result.id).toBe("eb6e4656-77fc-42a1-9181-4c6d8e9da5d1");
                expect(result.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/projects/eb6e4656-77fc-42a1-9181-4c6d8e9da5d1");
                expect(result.state).toBe("wellFormed");
                expect(result.capabilities).not.toBeNull;

                done();
            });
        });
    });
});