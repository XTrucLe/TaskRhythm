import { FaChartGantt } from "react-icons/fa6";
import TaskTable from "../../components/workspace/TaskTable";
import { BsFillKanbanFill, BsTable } from "react-icons/bs";
import { useState } from "react";
import { Tooltip } from "@mui/material";
import { mockTasks } from "../../mock/tasks";
import { TaskContext } from "../../contexts/TaskContext";
import type { Task } from "../../types/task";

type ViewStyle = "table" | "kanban" | "gantt";

function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [viewStyle, setViewStyle] = useState<ViewStyle>("table");

  const viewIcons = {
    table: <BsTable size={24} color="#6B7280" />,
    kanban: <BsFillKanbanFill size={24} color="#3B82F6" />,
    gantt: <FaChartGantt size={24} color="#8B5CF6" />,
  };

  const RenderTaskView = () => {
    switch (viewStyle) {
      case "table":
        return <TaskTable />;
      case "kanban":
        return <div>Kanban View - Coming Soon!</div>;
      case "gantt":
        return <div>Gantt View - Coming Soon!</div>;
      default:
        return null;
    }
  };

  const handleChangeView = () => {
    setViewStyle((prev) =>
      prev === "table" ? "kanban" : prev === "kanban" ? "gantt" : "table"
    );
  };

  // Handlers for TaskContext functions
  const handleAssignUser = (taskId: number, userId: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, assigneeId: userId } : task
      )
    );
  };

  const handleClaimTask = (taskId: number, userId: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, assigneeId: userId } : task
      )
    );
  };
  const handleUnclaimTask = (taskId: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, assigneeId: null } : task
      )
    );
  };

  const handleAddTask = (newTask: (typeof mockTasks)[0]) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleUpdateTask = (updatedTask: (typeof mockTasks)[0]) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleUpdateTaskStatus = (taskId: number, status: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status } : task))
    );
  };

  return (
    <div className="h-full w-full">
      <Tooltip
        title={viewStyle.charAt(0).toUpperCase() + viewStyle.slice(1)}
        onClick={handleChangeView}
      >
        <div className="absolute right-10 top-16 rounded-full bg-[var(--color-background)] p-2.5">
          {viewIcons[viewStyle]}
        </div>
      </Tooltip>
      <TaskContext.Provider
        value={{
          tasks,
          assignUser: handleAssignUser,
          addTask: handleAddTask,
          updateTask: handleUpdateTask,
          deleteTask: handleDeleteTask,
          claimTask: handleClaimTask,
          unclaimTask: handleUnclaimTask,
          updateTaskStatus: handleUpdateTaskStatus,
          permissions: {},
        }}
      >
        <RenderTaskView />
      </TaskContext.Provider>
    </div>
  );
}

export default TaskPage;
