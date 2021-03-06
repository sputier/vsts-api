"use strict";

import { VstsRestExecutor, VstsRestRequest, HttpMethod } from "../vstsRestExecutor";
import { Sequence } from "./common";

export interface Project {
    id: string;
    url: string;
    name: string;
    description: string;
    state: string;
    capabilities: ProjectCapabilities;
}

export interface ProjectCapabilities {
    versioncontrol: {
        sourceControlType: string
    };
    processTemplate: {
        templateTypeId: string;
        templateName: string;
    };
}

export class ProjectClient {
    private restExecutor: VstsRestExecutor;

    constructor(restExecutor: VstsRestExecutor) {
        this.restExecutor = restExecutor;
    }

    public getProjects(): Promise<Project[]> {
        let request = new VstsRestRequest("/_apis/projects", HttpMethod.GET, "1.0");

        return this.restExecutor.execute<Sequence<Project>>(request).then(result => {
            return result.value;
        });
    }

    public getProject(nameOrId: string, includeCapabilities: boolean = false): Promise<Project> {
        let request = new VstsRestRequest(`/_apis/projects/${nameOrId}`, HttpMethod.GET, "1.0");

        if (includeCapabilities) {
            request.addQueryParameter("includeCapabilities", includeCapabilities.toString());
        }

        return this.restExecutor.execute<Project>(request);
    }
}