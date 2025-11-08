import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ToolBar from "../../components/workspace/ui/ToolBar";
import TaskDetail from "../../components/task/views/TaskDetail";
import KanbanBoard from "../../components/task/views/KabanView";
import ViewSwitcher from "../../components/workspace/ui/ViewSwitcher";
import TaskTable from "../../components/task/views/TaskTable";
import { useTaskStore } from "../../store/task.store";
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
    console.log("selectedTask changed", selectedTask);
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
