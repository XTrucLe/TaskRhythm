import apiClient from "./apiClient";
import type { Workspace } from "../types";

export const workspaceService = {
  getWorkspace: async (workspaceId: string) => {
    const response = await apiClient.get<Workspace>(
      `/workspaces/${workspaceId}`
    );
    return response.data;
  },

  createWorkspace: async (workspaceData: Omit<Workspace, "id">) => {
    const response = await apiClient.post<Workspace>(
      "/workspaces",
      workspaceData
    );
    return response.data;
  },

  updateWorkspace: async (
    workspaceId: string,
    workspaceData: Partial<Workspace>
  ) => {
    const response = await apiClient.put<Workspace>(
      `/workspaces/${workspaceId}`,
      workspaceData
    );
    return response.data;
  },

  deleteWorkspace: async (workspaceId: string) => {
    await apiClient.delete(`/workspaces/${workspaceId}`);
  },
};
