import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Workspace } from "../types";
import type { Project } from "@/features/projects/types/project";
import type { UserBase } from "@/features/auth/types";

//temp
import { projects as mockProjects } from "@/mock/project";
import { data as mockWorkspace } from "@/mock/workspace";
import { AllUsers as mockUsers } from "@/mock/tasks";

interface WorkspaceState {
  workspace: Workspace | null;
  projects: Project[];
  members: UserBase[];
  searches: Record<string, string>;

  loading: {
    workspace: boolean;
    projects: boolean;
    members: boolean;
  };

  setWorkspace: (workspace: Workspace | null) => void;
  setProjects: (projects: Project[]) => void;
  setMembers: (members: UserBase[]) => void;
  setSearch: (tab: string, query: string) => void;

  fetchWorkspace: (workspaceId: string) => Promise<void>;
  fetchProjects: (workspaceId: string) => Promise<void>;
  fetchMembers: (workspaceId: string) => Promise<void>;

  reset: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  devtools(
    persist(
      (set) => ({
        workspace: null,
        projects: [],
        members: [],
        searches: {},

        loading: {
          workspace: false,
          projects: false,
          members: false,
        },

        setWorkspace: (workspace: Workspace | null) => set({ workspace }),
        setProjects: (projects: Project[]) => set({ projects }),
        setMembers: (members: UserBase[]) => set({ members }),
        setSearch: (tab: string, query: string) =>
          set((state) => ({
            searches: { ...state.searches, [tab]: query },
          })),

        fetchWorkspace: async (workspaceId: string) => {
          set((state) => ({ loading: { ...state.loading, workspace: true } }));
          try {
            set({
              workspace:
                (mockWorkspace.find(
                  (w) => w.id === workspaceId
                ) as Workspace) || null,
            });
          } catch (error) {
            console.log(error);
          }
          set((state) => ({ loading: { ...state.loading, workspace: false } }));
        },
        fetchProjects: async (workspaceId: string) => {
          set((state) => ({ loading: { ...state.loading, projects: true } }));
          try {
            set({
              projects: mockProjects.filter(
                (p) => p.workspace_id === workspaceId
              ),
            });
          } catch (error) {
            console.log(error);
          }
          set((state) => ({ loading: { ...state.loading, projects: false } }));
        },
        fetchMembers: async (workspaceId: string) => {
          set((state) => ({ loading: { ...state.loading, members: true } }));
          try {
            set({
              members: mockUsers,
            });
          } catch (error) {
            console.log(error);
          }
          set((state) => ({ loading: { ...state.loading, members: false } }));
        },
        reset: () =>
          set({
            workspace: null,
          }),
      }),
      { name: "workspace-storage" }
    )
  )
);
