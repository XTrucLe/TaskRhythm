import { useLocation, useNavigate } from "react-router-dom";
import { type WorkspaceTab, WorkspaceTabs } from "../types";

const TABWIDTH = 96;

function WorkspaceTabView() {
  const location = useLocation();
  const navigate = useNavigate();
  const tabs: WorkspaceTab[] = Object.keys(WorkspaceTabs) as WorkspaceTab[];

  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get("tab");

  const activeTab: WorkspaceTab =
    tabParam && tabs.includes(tabParam.toUpperCase() as WorkspaceTab)
      ? (tabParam.toUpperCase() as WorkspaceTab)
      : tabs[0];

  const changeTab = (tab: WorkspaceTab) => {
    const params = new URLSearchParams(location.search);
    params.set("tab", tab.toLowerCase());

    navigate({ search: params.toString() }, { replace: true });
  };

  return (
    <div className="self-end ml-4">
      <div className="relative flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => changeTab(tab)}
            className={`
                text-center py-1 text-lg font-medium bg-transparent z-10 rounded-md outline-none
                ${
                  tab === activeTab
                    ? "text-[var(--color-text)]"
                    : "text-gray-500 hover:text-[var(--color-text)] hover:bg-gray-200 dark:hover:bg-gray-300"
                }
            `}
            style={{ width: TABWIDTH }}
          >
            {tab.slice(0, 1).toUpperCase() + tab.slice(1).toLowerCase()}
          </button>
        ))}
        {/* Mask */}
        <div
          className="absolute border-2 h-full -mb-1 border-b-2 transition-all duration-300 rounded-t-lg"
          style={{
            width: TABWIDTH,
            marginLeft: tabs.indexOf(activeTab) * TABWIDTH,
          }}
        >
          <div className="absolute -bottom-[3px] -left-2 -right-2 h-2 bg-[var(--color-background-mix)]">
            <div className="absolute bg-transparent border-b-2 border-r-2 h-2 left-0 w-2 rounded-br-lg" />
            <div className="absolute bg-transparent border-b-2 border-l-2 h-2 right-0 w-2 rounded-bl-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceTabView;
