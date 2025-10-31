import { FaChartGantt } from "react-icons/fa6";
import TaskTable from "../../components/workspace/task-views/TaskTable";
import { BsFillKanbanFill, BsTable } from "react-icons/bs";
import { useEffect, useState } from "react";
import { mockTasks } from "../../mock/tasks";
import { TaskContext } from "../../contexts/TaskContext";
import type { Task } from "../../types/task";
import KanbanBoard from "../../components/workspace/task-views/KabanView";
import { useSearchParams } from "react-router-dom";
import ToolBar from "../../components/workspace/ui/ToolBar";
import TaskDetail from "../../components/workspace/task-views/TaskDetail";

type ViewStyle = "table" | "kanban" | "gantt";

function TaskPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [viewStyle, setViewStyle] = useState<ViewStyle>(
    (searchParams.get("view") as ViewStyle) || "table"
  );
  const [expanded, setExpanded] = useState<string[]>([]);

  useEffect(() => {
    const newTasks = mockTasks.map((task) => ({ ...task }));
    setTasks([...newTasks]);
  }, []);

  const viewIcons = {
    table: <BsTable size={20} color="#6B7280" />,
    kanban: <BsFillKanbanFill size={20} color="#3B82F6" />,
    gantt: <FaChartGantt size={20} color="#8B5CF6" />,
  };

  const RenderTaskView = () => {
    switch (viewStyle) {
      case "table":
        return <TaskTable expanded={expanded} setExpanded={setExpanded} />;
      case "kanban":
        return <KanbanBoard />;
      case "gantt":
        return <p>Gantt Chart View is not implemented yet.</p>;
      default:
        return null;
    }
  };

  const changeViewStyle = (style: ViewStyle) => {
    setViewStyle(style);
    searchParams.set("view", style);
    setSearchParams(searchParams);
  };

  const assignTask = (taskId: string, userId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, assigneeId: userId } : task
      )
    );
  };

  const claimTask = (taskId: string, userId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, assigneeId: userId } : task
      )
    );
  };

  const unclaimTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, assigneeId: null } : task
      )
    );
  };

  const addTask = (newTask: (typeof mockTasks)[0]) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (updatedTask: (typeof mockTasks)[0]) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const updateTaskStatus = (taskId: string, status: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: status } : task
      )
    );
    console.log(`Update task: ${taskId} with status: ${status} successful`);
  };

  return (
    <div className="flex-1 h-full w-full">
      <div className="absolute left-1 top-16 rounded-full bg-[var(--color-background)] p-1 border-2">
        <div className="relative flex space-x-1">
          <div
            className="absolute top-0 bottom-0 z-10 rounded-full bg-primary transition-all duration-300 ease-in-out"
            style={{
              left: `${
                (Object.keys(viewIcons).indexOf(viewStyle) * 100) /
                Object.keys(viewIcons).length
              }%`,
              width: `${100 / Object.keys(viewIcons).length}%`,
            }}
          />
          {Object.entries(viewIcons).map(([key, icon]) => {
            return (
              <div
                key={key}
                className="flex p-2 rounded-full cursor-pointer z-20 px-2"
                onClick={() => changeViewStyle(key as ViewStyle)}
              >
                {icon}{" "}
                <span className="ml-2 text-sm ">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <ToolBar />
      <TaskContext.Provider
        value={{
          tasks,
          assignTask,
          addTask,
          updateTask,
          deleteTask,
          claimTask,
          unclaimTask,
          updateTaskStatus,
          permissions: {},
        }}
      >
        <RenderTaskView />
        <TaskDetail open={true} onClose={() => {}} taskId={mockTasks[0].id} />
      </TaskContext.Provider>
    </div>
  );
}

export default TaskPage;
