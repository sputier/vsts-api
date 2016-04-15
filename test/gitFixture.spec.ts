"use strict";

import {VstsClient, VstsConfiguration} from "../src/index";
import {TestExecutor} from "./helpers/testExecutor";

describe("Git Fixture", () => {
    describe("#getRepositories()", () => {
        it('Should return multiple repositories', (done) => {
            let mockExecutor = new TestExecutor("/_apis/git/repositories?api-version=1.0", "GET", "getGitRepositories");
            let client = new VstsClient(mockExecutor);
            
            return client.git.getRepositories().then(result => {
                expect(result).not.toBeNull();
                expect(result.length).toBe(3);

                let first = result[0];                
                expect(first.id).toBe("5febef5a-833d-4e14-b9c0-14cb638f91e6");
                expect(first.name).toBe("AnotherRepository");
                expect(first.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/git/repositories/5febef5a-833d-4e14-b9c0-14cb638f91e6");
                expect(first.remoteUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/Fabrikam-Fiber-Git/_git/AnotherRepository");
                expect(first.project).not.toBeNull();
                expect(first.project.id).toBe("6ce954b1-ce1f-45d1-b94d-e6bf2464ba2c");
                expect(first.project.name).toBe("Fabrikam-Fiber-Git");
                expect(first.project.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/projects/6ce954b1-ce1f-45d1-b94d-e6bf2464ba2c");
                expect(first.project.state).toBe("wellFormed");
                
                let second = result[1];
                expect(second.id).toBe("278d5cd2-584d-4b63-824a-2ba458937249");
                expect(second.name).toBe("Fabrikam-Fiber-Git");
                expect(second.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/git/repositories/278d5cd2-584d-4b63-824a-2ba458937249");
                expect(second.remoteUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_git/Fabrikam-Fiber-Git");
                expect(second.defaultBranch).toBe("refs/heads/master");
                expect(second.project).not.toBeNull();
                expect(second.project.id).toBe("6ce954b1-ce1f-45d1-b94d-e6bf2464ba2c");
                expect(second.project.name).toBe("Fabrikam-Fiber-Git");
                expect(second.project.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/projects/6ce954b1-ce1f-45d1-b94d-e6bf2464ba2c");
                expect(second.project.state).toBe("wellFormed");
                
                let third = result[2];
                expect(third.id).toBe("66efb083-777a-4cac-a350-a24b046be6be");
                expect(third.name).toBe("TestGit");
                expect(third.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/git/repositories/66efb083-777a-4cac-a350-a24b046be6be");
                expect(third.remoteUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_git/TestGit");
                expect(third.defaultBranch).toBe("refs/heads/master");
                expect(third.project).not.toBeNull();
                expect(third.project.id).toBe("281f9a5b-af0d-49b4-a1df-fe6f5e5f84d0");
                expect(third.project.name).toBe("TestGit");
                expect(third.project.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/projects/281f9a5b-af0d-49b4-a1df-fe6f5e5f84d0");
                expect(third.project.state).toBe("wellFormed");
                
                done();
            });
        });
    });

    describe("#getRepositories(projectNameOrId)", () => {
        it('should return multiple repositories', (done) => {
        
            let projectNameOrId = "ProjectName";
            let mockExecutor = new TestExecutor(`/${projectNameOrId}/_apis/git/repositories?api-version=1.0`, "GET", "getGitRepositories");
            let client = new VstsClient(mockExecutor);

            return client.git.getRepositories(projectNameOrId).then(result => {
                expect(result).not.toBeNull();
                expect(result.length).toBe(3);

                let first = result[0];                
                expect(first.id).toBe("5febef5a-833d-4e14-b9c0-14cb638f91e6");
                expect(first.name).toBe("AnotherRepository");
                expect(first.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/git/repositories/5febef5a-833d-4e14-b9c0-14cb638f91e6");
                expect(first.remoteUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/Fabrikam-Fiber-Git/_git/AnotherRepository");
                expect(first.project).not.toBeNull();
                expect(first.project.id).toBe("6ce954b1-ce1f-45d1-b94d-e6bf2464ba2c");
                expect(first.project.name).toBe("Fabrikam-Fiber-Git");
                expect(first.project.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/projects/6ce954b1-ce1f-45d1-b94d-e6bf2464ba2c");
                expect(first.project.state).toBe("wellFormed");
                
                let second = result[1];
                expect(second.id).toBe("278d5cd2-584d-4b63-824a-2ba458937249");
                expect(second.name).toBe("Fabrikam-Fiber-Git");
                expect(second.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/git/repositories/278d5cd2-584d-4b63-824a-2ba458937249");
                expect(second.remoteUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_git/Fabrikam-Fiber-Git");
                expect(second.defaultBranch).toBe("refs/heads/master");
                expect(second.project).not.toBeNull();
                expect(second.project.id).toBe("6ce954b1-ce1f-45d1-b94d-e6bf2464ba2c");
                expect(second.project.name).toBe("Fabrikam-Fiber-Git");
                expect(second.project.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/projects/6ce954b1-ce1f-45d1-b94d-e6bf2464ba2c");
                expect(second.project.state).toBe("wellFormed");
                
                let third = result[2];
                expect(third.id).toBe("66efb083-777a-4cac-a350-a24b046be6be");
                expect(third.name).toBe("TestGit");
                expect(third.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/git/repositories/66efb083-777a-4cac-a350-a24b046be6be");
                expect(third.remoteUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_git/TestGit");
                expect(third.defaultBranch).toBe("refs/heads/master");
                expect(third.project).not.toBeNull();
                expect(third.project.id).toBe("281f9a5b-af0d-49b4-a1df-fe6f5e5f84d0");
                expect(third.project.name).toBe("TestGit");
                expect(third.project.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/projects/281f9a5b-af0d-49b4-a1df-fe6f5e5f84d0");
                expect(third.project.state).toBe("wellFormed");
                
                done();
            });
        });
    });

    describe("#getRepository(id)", () => {
        it('should return a single repository', (done) => {
            let repositoryId = "5febef5a-833d-4e14-b9c0-14cb638f91e6";
            let mockExecutor = new TestExecutor(`/_apis/git/repositories/${repositoryId}?api-version=1.0`, "GET", "getRepository");
            let client = new VstsClient(mockExecutor);

            return client.git.getRepository(repositoryId).then(result => {
                expect(result).not.toBeNull();
                
                expect(result.id).toBe("5febef5a-833d-4e14-b9c0-14cb638f91e6");
                expect(result.name).toBe("AnotherRepository");
                expect(result.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/git/repositories/5febef5a-833d-4e14-b9c0-14cb638f91e6");
                expect(result.remoteUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/Fabrikam-Fiber-Git/_git/AnotherRepository");
                expect(result.project).not.toBeNull();
                expect(result.project.id).toBe("6ce954b1-ce1f-45d1-b94d-e6bf2464ba2c");
                expect(result.project.name).toBe("Fabrikam-Fiber-Git");
                expect(result.project.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/projects/6ce954b1-ce1f-45d1-b94d-e6bf2464ba2c");
                expect(result.project.state).toBe("wellFormed");
                
                done();
            });
        });
    });

    describe("#getRepository(nameOrId, projectNameOrId)", () => {
       it('should return a single repository', (done) => {
            let projectNameOrId = "Fabrikam-Fiber-Git";
            let repositoryName = "AnotherRepository";
            let mockExecutor = new TestExecutor(`/${projectNameOrId}/_apis/git/repositories/${repositoryName}?api-version=1.0`, "GET", "getRepository");
            let client = new VstsClient(mockExecutor);

            return client.git.getRepository(repositoryName, projectNameOrId).then(result => {
                expect(result).not.toBeNull();
                
                expect(result.id).toBe("5febef5a-833d-4e14-b9c0-14cb638f91e6");
                expect(result.name).toBe("AnotherRepository");
                expect(result.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/git/repositories/5febef5a-833d-4e14-b9c0-14cb638f91e6");
                expect(result.remoteUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/Fabrikam-Fiber-Git/_git/AnotherRepository");
                expect(result.project).not.toBeNull();
                expect(result.project.id).toBe("6ce954b1-ce1f-45d1-b94d-e6bf2464ba2c");
                expect(result.project.name).toBe("Fabrikam-Fiber-Git");
                expect(result.project.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/projects/6ce954b1-ce1f-45d1-b94d-e6bf2464ba2c");
                expect(result.project.state).toBe("wellFormed");
                
                done();
            });
        });
    });

    describe("#getCommits(repositoryId)", () => {
        it('should return multiple commits', (done) => {
            let repositoryId = "278d5cd2-584d-4b63-824a-2ba458937249";
            let mockExecutor = new TestExecutor(`/_apis/git/repositories/${repositoryId}/commits?api-version=1.0`, "GET", "getCommits");
            let client = new VstsClient(mockExecutor);
            
             return client.git.getCommits(repositoryId).then(result => {
                expect(result).not.toBeNull();
                expect(result.length).toBe(19);
                
                let item1 = result[0];
                expect(item1.commitId).toBe("23d0bc5b128a10056dc68afece360d8a0fabb014");
                expect(item1.author).not.toBeNull()
                expect(item1.author.name).toBe("Norman Paulk");
                expect(item1.author.email).toBe("Fabrikamfiber16@hotmail.com");
                expect(item1.author.date).toEqual("2014-06-30T18:10:55Z");
                expect(item1.committer).not.toBeNull()
                expect(item1.committer.name).toBe("Norman Paulk");
                expect(item1.committer.email).toBe("Fabrikamfiber16@hotmail.com");
                expect(item1.committer.date).toEqual("2014-06-30T18:10:55Z");
                expect(item1.comment).toBe("Better description for hello world");
                expect(item1.changeCounts).not.toBeNull();
                expect(item1.changeCounts.Edit).toBe(1);
                expect(item1.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/git/repositories/278d5cd2-584d-4b63-824a-2ba458937249/commits/23d0bc5b128a10056dc68afece360d8a0fabb014");
                expect(item1.remoteUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_git/Fabrikam-Fiber-Git/commit/23d0bc5b128a10056dc68afece360d8a0fabb014");
                
                let item2 = result[1];
                expect(item2.commitId).toBe("fe17a84cc2dfe0ea3a2202ab4dbac0706058e41f");
                expect(item2.author).not.toBeNull()
                expect(item2.author.name).toBe("Norman Paulk");
                expect(item2.author.email).toBe("Fabrikamfiber16@hotmail.com");
                expect(item2.author.date).toEqual("2014-06-30T17:51:09Z");
                expect(item2.committer).not.toBeNull()
                expect(item2.committer.name).toBe("Norman Paulk");
                expect(item2.committer.email).toBe("Fabrikamfiber16@hotmail.com");
                expect(item2.committer.date).toEqual("2014-06-30T17:51:09Z");
                expect(item2.comment).toBe("Better description for hello world");
                expect(item2.changeCounts).not.toBeNull();
                expect(item2.changeCounts.Edit).toBe(1);
                expect(item2.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/git/repositories/278d5cd2-584d-4b63-824a-2ba458937249/commits/fe17a84cc2dfe0ea3a2202ab4dbac0706058e41f");
                expect(item2.remoteUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/git/repositories/278d5cd2-584d-4b63-824a-2ba458937249/commits/fe17a84cc2dfe0ea3a2202ab4dbac0706058e41f");
                
                
                
                
                
                
                
                
                expect(false).toBe(true);
                done();
             });
            //     expect(result).not.toBeNull();
            //     expect(result.length).toBe(3);

            //     let first = result[0];                
            //     expect(first.id).toBe("5febef5a-833d-4e14-b9c0-14cb638f91e6");
            //     expect(first.name).toBe("AnotherRepository");
            //     expect(first.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/git/repositories/5febef5a-833d-4e14-b9c0-14cb638f91e6");
            //     expect(first.remoteUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/Fabrikam-Fiber-Git/_git/AnotherRepository");
            //     expect(first.project).not.toBeNull();
            //     expect(first.project.id).toBe("6ce954b1-ce1f-45d1-b94d-e6bf2464ba2c");
            //     expect(first.project.name).toBe("Fabrikam-Fiber-Git");
            //     expect(first.project.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/projects/6ce954b1-ce1f-45d1-b94d-e6bf2464ba2c");
            //     expect(first.project.state).toBe("wellFormed");
                
            //     let second = result[1];
            //     expect(second.id).toBe("278d5cd2-584d-4b63-824a-2ba458937249");
            //     expect(second.name).toBe("Fabrikam-Fiber-Git");
            //     expect(second.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/git/repositories/278d5cd2-584d-4b63-824a-2ba458937249");
            //     expect(second.remoteUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_git/Fabrikam-Fiber-Git");
            //     expect(second.defaultBranch).toBe("refs/heads/master");
            //     expect(second.project).not.toBeNull();
            //     expect(second.project.id).toBe("6ce954b1-ce1f-45d1-b94d-e6bf2464ba2c");
            //     expect(second.project.name).toBe("Fabrikam-Fiber-Git");
            //     expect(second.project.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/projects/6ce954b1-ce1f-45d1-b94d-e6bf2464ba2c");
            //     expect(second.project.state).toBe("wellFormed");
                
            //     let third = result[2];
            //     expect(third.id).toBe("66efb083-777a-4cac-a350-a24b046be6be");
            //     expect(third.name).toBe("TestGit");
            //     expect(third.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/git/repositories/66efb083-777a-4cac-a350-a24b046be6be");
            //     expect(third.remoteUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_git/TestGit");
            //     expect(third.defaultBranch).toBe("refs/heads/master");
            //     expect(third.project).not.toBeNull();
            //     expect(third.project.id).toBe("281f9a5b-af0d-49b4-a1df-fe6f5e5f84d0");
            //     expect(third.project.name).toBe("TestGit");
            //     expect(third.project.url).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_apis/projects/281f9a5b-af0d-49b4-a1df-fe6f5e5f84d0");
            //     expect(third.project.state).toBe("wellFormed");
                
            //     done();
            // });
        });
    });

    describe("#getCommits(repositoryId, options)", () => {
        it('is not implemented', () => {
            expect(false).toBe(true);
        });
        
    //     it("Should return users in room", (done) => {
    //         let roomId = 305;
    //         let mockExecutor = new TestExecutor(`/_apis/chat/rooms/${roomId}/users?api-version=1.0`, "GET", "getUsers");
    //         let client = new VstsClient(mockExecutor);

    //         return client.team.getUsers(roomId).then(result => {
    //             expect(result).not.toBeNull();

    //             let first = result[0];
    //             expect(first.user.id).toBe("d6245f20-2af8-44f4-9451-8107cb2767db");
    //             expect(first.user.displayName).toBe("Normal Paulk");
    //             expect(first.user.url).toBe("https://fabrikam-fiber-inc.vssps.visualstudio.com/_apis/Identities/d6245f20-2af8-44f4-9451-8107cb2767db");
    //             expect(first.user.imageUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_api/_common/identityImage?id=d6245f20-2af8-44f4-9451-8107cb2767db");
    //             expect(first.lastActivity).toBe("2014-10-27T16:36:02.28Z");
    //             expect(first.joinedDate).toBe("2014-10-27T16:36:02.203Z");
    //             expect(first.isOnline).toBe(true);

    //             let second = result[1];
    //             expect(second.user.id).toBe("3b5f0c34-4aec-4bf4-8708-1d36f0dbc468");
    //             expect(second.user.displayName).toBe("Christie Church");
    //             expect(second.user.url).toBe("https://fabrikam-fiber-inc.vssps.visualstudio.com/_apis/Identities/3b5f0c34-4aec-4bf4-8708-1d36f0dbc468");
    //             expect(second.user.imageUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_api/_common/identityImage?id=3b5f0c34-4aec-4bf4-8708-1d36f0dbc468");
    //             expect(second.lastActivity).toBe("0001-01-01T00:00:00");
    //             expect(second.joinedDate).toBe("0001-01-01T00:00:00");
    //             expect(second.isOnline).toBe(false);

    //             let third = result[2];
    //             expect(third.user.id).toBe("8c8c7d32-6b1b-47f4-b2e9-30b477b5ab3d");
    //             expect(third.user.displayName).toBe("Chuck Reinhart");
    //             expect(third.user.url).toBe("https://fabrikam-fiber-inc.vssps.visualstudio.com/_apis/Identities/8c8c7d32-6b1b-47f4-b2e9-30b477b5ab3d");
    //             expect(third.user.imageUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_api/_common/identityImage?id=8c8c7d32-6b1b-47f4-b2e9-30b477b5ab3d");
    //             expect(third.lastActivity).toBe("0001-01-01T00:00:00");
    //             expect(third.joinedDate).toBe("0001-01-01T00:00:00");
    //             expect(third.isOnline).toBe(false);

    //             let fourth = result[3];
    //             expect(fourth.user.id).toBe("e5a5f7f8-6507-4c34-b397-6c4818e002f4");
    //             expect(fourth.user.displayName).toBe("Fabrikam Fiber");
    //             expect(fourth.user.url).toBe("https://fabrikam-fiber-inc.vssps.visualstudio.com/_apis/Identities/e5a5f7f8-6507-4c34-b397-6c4818e002f4");
    //             expect(fourth.user.imageUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_api/_common/identityImage?id=e5a5f7f8-6507-4c34-b397-6c4818e002f4");
    //             expect(fourth.lastActivity).toBe("0001-01-01T00:00:00");
    //             expect(fourth.joinedDate).toBe("0001-01-01T00:00:00");
    //             expect(fourth.isOnline).toBe(false);

    //             let fifth = result[4];
    //             expect(fifth.user.id).toBe("19d9411e-9a34-45bb-b985-d24d9d87c0c9");
    //             expect(fifth.user.displayName).toBe("Johnnie McLeod");
    //             expect(fifth.user.url).toBe("https://fabrikam-fiber-inc.vssps.visualstudio.com/_apis/Identities/19d9411e-9a34-45bb-b985-d24d9d87c0c9");
    //             expect(fifth.user.imageUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_api/_common/identityImage?id=19d9411e-9a34-45bb-b985-d24d9d87c0c9");
    //             expect(fifth.lastActivity).toBe("0001-01-01T00:00:00");
    //             expect(fifth.joinedDate).toBe("0001-01-01T00:00:00");
    //             expect(fifth.isOnline).toBe(false);

    //             let sixth = result[5];
    //             expect(sixth.user.id).toBe("d291b0c4-a05c-4ea6-8df1-4b41d5f39eff");
    //             expect(sixth.user.displayName).toBe("Jamal Hartnett");
    //             expect(sixth.user.url).toBe("https://fabrikam-fiber-inc.vssps.visualstudio.com/_apis/Identities/d291b0c4-a05c-4ea6-8df1-4b41d5f39eff");
    //             expect(sixth.user.imageUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_api/_common/identityImage?id=d291b0c4-a05c-4ea6-8df1-4b41d5f39eff");
    //             expect(sixth.lastActivity).toBe("0001-01-01T00:00:00");
    //             expect(sixth.joinedDate).toBe("0001-01-01T00:00:00");
    //             expect(sixth.isOnline).toBe(false);

    //             done();
    //         });
    //     });
    });

    describe("#getCommit(repositoryId, id)", () => {
        it('is not implemented', () => {
            expect(false).toBe(true);
        });
        
        // it("Should return user in room", (done) => {
        //     let roomId = 305;
        //     let userId = "d6245f20-2af8-44f4-9451-8107cb2767db";
        //     let mockExecutor = new TestExecutor(`/_apis/chat/rooms/305/users/d6245f20-2af8-44f4-9451-8107cb2767db?api-version=1.0`, "GET", "getUser");
        //     let client = new VstsClient(mockExecutor);

        //     return client.team.getUser(roomId, userId).then(result => {
        //         expect(result).not.toBeNull();

        //         expect(result.user.id).toBe("d6245f20-2af8-44f4-9451-8107cb2767db");
        //         expect(result.user.displayName).toBe("Normal Paulk");
        //         expect(result.user.url).toBe("https://fabrikam-fiber-inc.vssps.visualstudio.com/_apis/Identities/d6245f20-2af8-44f4-9451-8107cb2767db");
        //         expect(result.user.imageUrl).toBe("https://fabrikam.visualstudio.com/DefaultCollection/_api/_common/identityImage?id=d6245f20-2af8-44f4-9451-8107cb2767db");
        //         expect(result.lastActivity).toBe("2014-10-27T16:36:02.28Z");
        //         expect(result.joinedDate).toBe("2014-10-27T16:36:02.203Z");
        //         expect(result.isOnline).toBe(true);

        //         done();
        //     });
        // });
    });

    describe("#getCommit(repositoryId, id, numberOfChangesToInclude)", () => {
        it('is not implemented', () => {
            expect(false).toBe(true);
        });
        
        // it("Should join room", (done) => {
        //     let roomId = 305;
        //     let userId = "d6245f20-2af8-44f4-9451-8107cb2767db";
        //     let mockExecutor = new TestExecutor("/_apis/chat/rooms/305/users/d6245f20-2af8-44f4-9451-8107cb2767db?api-version=1.0", "PUT", "joinRoom");
        //     let client = new VstsClient(mockExecutor);

        //     return client.team.joinRoom(roomId, userId).then(result => {
        //         expect(result).not.toBe(null);
        //         expect(result).toBe(userId);

        //         done();
        //     });
        // });
    });
    

});