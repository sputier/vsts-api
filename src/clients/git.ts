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

    public getRepository(nameOrId? : string, projectNameOrId? : string): Promise<GitRepository> {
        let uri: string;
        if (!projectNameOrId) {
            uri = `/_apis/git/repositories/${nameOrId}`;
        } else {
            uri = `/${projectNameOrId}/_apis/git/repositories/${name}`;
        }
        
        let request = new VstsRestRequest(uri, HttpMethod.GET, "1.0");

        return this.restExecutor.execute<GitRepository>(request);
    }
}