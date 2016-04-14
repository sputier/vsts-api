"use strict";

import { VstsRestExecutor, VstsRestRequest, HttpMethod } from "../vstsRestExecutor";
import { Project } from "./project"
import { Sequence } from "./common";

export interface GitRepository {
    id: string;
    name: string;
    url: string;
    project: Project;
    remoteUrl: string;
}

export interface GitCommitListOptions {
    itemPath : string,
    committerUsername : string,
    authorUsername : string,
    dateRange : {
        from : Date,
        to : Date
    }
}

export interface GitCommit {
    commitId : string,
    author : {
        name : string,
        email : string,
        date : Date
    },
    committer : {
        name : string,
        email : string,
        date : Date
    },
    comment : string,
    changeCounts : {
        edit : number,
        add : number,
        delete : number
    },
    url : string,
    remoteUrl : string
}

export interface GitCommitDetail {
    parents : GitCommit[],
    treeId : string,
    push : {
        pushId : number,
        date : Date,
        pushedBy : {
            id : string,
            displayName : string,
            uniquename : string,
            url : string,
            imageUrl : string
        }
    },
    commitId : string,
    author : {
        name : string,
        email : string,
        date : Date
    },
    committer : {
        name : string,
        email : string,
        date : Date
    },
    comment : string,
    url : string,
    remoteUrl : string,
    changeCounts : {
        edit : number,
        add : number,
        delete : number
    },
    changes: {
        item : {
            gitObjectType: string,
            path : string,
            url : string
        },
        changeType : string
    }[]
}

export class GitClient {
    private restExecutor: VstsRestExecutor;

    constructor(restExecutor: VstsRestExecutor) {
        this.restExecutor = restExecutor;
    }
   
    public getRepositories(): Promise<GitRepository[]>;
    public getRepositories(projectNameOrId: string): Promise<GitRepository[]>;

    public getRepositories(projectNameOrId? : string): Promise<GitRepository[]> {
        let uri: string;
        if (projectNameOrId) {
            uri = `/${projectNameOrId}/_apis/git/repositories`;
        } else {
            uri = `/_apis/git/repositories`;
        }
        
        let request = new VstsRestRequest(uri, HttpMethod.GET, "1.0");

        return this.restExecutor.execute<Sequence<GitRepository>>(request).then(result => {
            return result.value;
        });
    }

    public getRepository(id : string) : Promise<GitRepository>;
    public getRepository(name : string, projectNameOrId : string) : Promise<GitRepository>;

    public getRepository(nameOrId : string, projectNameOrId? : string): Promise<GitRepository> {
        let uri: string;
        if (!projectNameOrId) {
            uri = `/_apis/git/repositories/${nameOrId}`;
        } else {
            uri = `/${projectNameOrId}/_apis/git/repositories/${name}`;
        }
        
        let request = new VstsRestRequest(uri, HttpMethod.GET, "1.0");

        return this.restExecutor.execute<GitRepository>(request);
    }
    
    public getCommits(repositoryId: string) : Promise<GitCommit[]>;
    public getCommits(repositoryId: string, options : GitCommitListOptions) : Promise<GitCommit[]>;
    
    public getCommits(repositoryId : string, options? : GitCommitListOptions) : Promise<GitCommit[]> {
        let request = new VstsRestRequest(`/_apis/git/repositories/${repositoryId}`, HttpMethod.GET, "1.0");

        if (options) {
            if (options.itemPath) { 
                request.addQueryParameter("itemPath", options.itemPath);
            }
            if (options.committerUsername) { 
                request.addQueryParameter("committer", options.committerUsername);
            }
            if (options.authorUsername) { 
                request.addQueryParameter("author", options.authorUsername);
            }
            if (options.dateRange && (options.dateRange.from || options.dateRange.to)) { 
                if (options.dateRange.from)
                    request.addQueryParameter("from", options.dateRange.from.toISOString());
                if (options.dateRange.to)
                    request.addQueryParameter("from", options.dateRange.from.toISOString());
            }
        }
        
        return this.restExecutor.execute<Sequence<GitCommit>>(request).then(result => {
            return result.value;
        });
    }
    
    public getCommit(repositoryId : string, id : string) : Promise<GitCommitDetail>;
    public getCommit(repositoryId : string, id : string, numberOfChangesToInclude : number) : Promise<GitCommitDetail>;
    
    public getCommit(repositoryId : string, id : string, numberOfChangesToInclude? : number) : Promise<GitCommitDetail> {
        
        let request = new VstsRestRequest(`/_apis/git/repositories/${repositoryId}/commits/${id}`, HttpMethod.GET, "1.0");
        
        if (numberOfChangesToInclude) {
            request.addQueryParameter("changeCount", numberOfChangesToInclude.toString());
        }

        return this.restExecutor.execute<GitCommitDetail>(request);
    }
    
    
}