import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ToolBar from "../../components/workspace/ui/ToolBar";
import TaskDetail from "../../components/task/views/TaskDetail";
import { useTasks } from "../../hooks/useTasks";
import { TaskContext } from "../../contexts/TaskContext";
import KanbanBoard from "../../components/task/views/KabanView";
import ViewSwitcher from "../../components/workspace/ui/ViewSwitcher";
import TaskTable from "../../components/task/views/TaskTable";

type ViewStyle = "table" | "kanban" | "gantt";

function TaskPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewStyle, setViewStyle] = useState<ViewStyle>(
    (searchParams.get("view") as ViewStyle) || "table"
  );
  const [expanded, setExpanded] = useState<string[]>([]);
  const tasksState = useTasks();

  const changeViewStyle = (style: ViewStyle) => {
    setViewStyle(style);
    searchParams.set("view", style);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex-1 h-full w-full">
      <ViewSwitcher viewStyle={viewStyle} onChange={changeViewStyle} />
      <ToolBar />
      <TaskContext.Provider
        value={{
          ...tasksState,
          permissions: {},
        }}
      >
        {viewStyle === "table" && (
          <TaskTable expanded={expanded} setExpanded={setExpanded} />
        )}
        {viewStyle === "kanban" && <KanbanBoard />}
        {viewStyle === "gantt" && (
          <p>Gantt Chart View is not implemented yet.</p>
        )}
        <TaskDetail open={false} onClose={() => {}} taskId={""} />
      </TaskContext.Provider>
    </div>
  );
}

export default TaskPage;
