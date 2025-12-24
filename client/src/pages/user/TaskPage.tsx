import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ToolBar from "../../features/tasks/components/shared/ToolBar";
import TaskDetail from "../../features/tasks/components/TaskDetail/TaskDetail";
import KanbanBoard from "../../features/tasks/components/KabanView/KabanView";
import ViewSwitcher from "../../features/tasks/components/shared/ViewSwitcher";
import TaskTable from "../../features/tasks/components/TableView/TaskTable";
import { useTaskStore } from "../../features/tasks/stores/task.store";
import { mockTasks } from "../../mock/tasks";

type ViewStyle = "table" | "kanban" | "gantt";

function TaskPage() {
  const [openDetail, setOpenDetail] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewStyle, setViewStyle] = useState<ViewStyle>(
    (searchParams.get("view") as ViewStyle) || "table"
  );

  const { setTasks, selectedTask, setSelectedTask } = useTaskStore();

  useEffect(() => {
    const NewTasks = mockTasks;
    setTasks(NewTasks);
  }, [setTasks]);

  useEffect(() => {
    setOpenDetail(!!selectedTask);
  }, [selectedTask]);

  const changeViewStyle = (style: ViewStyle) => {
    setViewStyle(style);
    searchParams.set("view", style);
    setSearchParams(searchParams);
  };

  const onCloseDetail = () => {
    setOpenDetail(false);
    setSelectedTask(null);
  };

  return (
    <div className="flex-1 h-full w-full">
      <ViewSwitcher viewStyle={viewStyle} onChange={changeViewStyle} />
      <ToolBar />

      {viewStyle === "table" && <TaskTable />}
      {viewStyle === "kanban" && <KanbanBoard />}
      {viewStyle === "gantt" && <p>Gantt Chart View is not implemented yet.</p>}
      <TaskDetail open={openDetail} onClose={onCloseDetail} />
    </div>
  );
}

export default TaskPage;
