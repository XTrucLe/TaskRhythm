import { useLocation, useNavigate } from "react-router-dom";
import { type WorkspaceTab, WorkspaceTabs } from "../types";

function WorkspaceTabView() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = Object.keys(WorkspaceTabs) as WorkspaceTab[];

  const params = new URLSearchParams(location.search);
  const tabParam = params.get("tab");

  const activeTab =
    tabParam && tabs.includes(tabParam.toUpperCase() as WorkspaceTab)
      ? (tabParam.toUpperCase() as WorkspaceTab)
      : tabs[0];

  const activeIndex = tabs.indexOf(activeTab);
  const tabWidth = 100 / tabs.length;

  const changeTab = (tab: WorkspaceTab) => {
    const params = new URLSearchParams(location.search);
    params.set("tab", tab.toLowerCase());
    navigate({ search: params.toString() }, { replace: true });
  };

  return (
    <nav
      className="relative w-full"
      style={{ maxWidth: `calc(${tabs.length}* 160px)` }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 160px))`,
          gap: "0px",
          alignItems: "center",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => changeTab(tab)}
            className={`
              py-2 px-3
              text-md font-medium
              whitespace-nowrap
              transition-colors min-w-min w-full
              ${
                tab === activeTab
                  ? "text-primary"
                  : "text-muted hover:text-secondary"
              }
            `}
          >
            {tab[0] + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <span
        className="absolute bottom-0 h-[2px] bg-primary transition-transform duration-300"
        style={{
          width: `${tabWidth}%`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />
    </nav>
  );
}

export default WorkspaceTabView;
