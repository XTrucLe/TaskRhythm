import { useContext, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TaskContext } from "../../../contexts/TaskContext";
import type { Task } from "../../../types/task";

let yCounter = 0; // dùng chung cho toàn cây

function groupByRoot(tasks: Task[]): Record<string, Task[]> {
  const roots = tasks.filter((t) => !t.parentId || t.level === 0);
  const map: Record<string, Task[]> = {};

  for (const root of roots) {
    const group: Task[] = [];
    const stack = [root];
    while (stack.length) {
      const current = stack.pop()!;
      group.push(current);
      const children = tasks.filter((t) => t.parentId === current.id);
      stack.push(...children);
    }
    map[root.id] = group;
  }

  return map;
}

function buildHierarchy(tasks: Task[]): { nodes: Node[]; edges: Edge[] } {
  const map: Record<number, Task & { children: Task[] }> = {};
  const roots: (Task & { children: Task[] })[] = [];

  // Tạo map
  for (const task of tasks) {
    map[task.id] = { ...task, children: [] };
  }

  // Xác định root và quan hệ cha-con
  for (const task of tasks) {
    if (task.parentId && map[task.parentId]) {
      map[task.parentId].children.push(map[task.id]);
    } else {
      roots.push(map[task.id]);
    }
  }

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // hàm đệ quy trả về min-max Y của cây
  const buildPosition = (
    task: Task & { children?: Task[] },
    level = 0
  ): [number, number] => {
    if (!task.children || task.children.length === 0) {
      const y = yCounter * 130;
      yCounter++;
      nodes.push({
        id: String(task.id),
        type: "taskNode",
        position: { x: level * 300, y },
        data: { task },
      });
      return [y, y];
    }

    const childYs: number[] = [];
    for (const child of task.children) {
      const [minY, maxY] = buildPosition(child, level + 1);
      childYs.push((minY + maxY) / 2);
      edges.push({
        id: `${task.id}-${child.id}`,
        source: String(task.id),
        target: String(child.id),
        animated: true,
        style: { stroke: "#CBD5E1", strokeWidth: 1.5 },
      });
    }

    const y = (Math.min(...childYs) + Math.max(...childYs)) / 2;
    nodes.push({
      id: String(task.id),
      type: "taskNode",
      position: { x: level * 300, y },
      data: { task },
    });

    return [Math.min(...childYs), Math.max(...childYs)];
  };

  // render từng root, mỗi cây cách nhau 1 khoảng
  for (const root of roots) {
    buildPosition(root);

    // nếu còn cây root sau → thêm gap
    yCounter += 1; // thêm 1 hàng trống giữa các cây
  }

  return { nodes, edges };
}

function TaskNode({ data }: { data: { task: Task } }) {
  const { task } = data;

  const statusStyle =
    task.status === "done"
      ? "bg-green-50 border-green-400"
      : task.status === "doing"
      ? "bg-yellow-50 border-yellow-400"
      : task.status === "overdue"
      ? "bg-red-50 border-red-400"
      : "bg-slate-50 border-slate-300";

  const priorityEmoji =
    task.priority === "high" ? "🔴" : task.priority === "medium" ? "🟠" : "🟢";

  return (
    <div
      className={`min-w-[180px] rounded-xl border shadow-sm px-3 py-2 ${statusStyle}`}
    >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <div className="font-semibold text-gray-800 truncate">{task.name}</div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>
          {priorityEmoji} {task.priority}
        </span>
        {task.assignee && <span>{task.assignee}</span>}
      </div>
    </div>
  );
}

export default function TaskFlowView() {
  const { tasks } = useContext(TaskContext);

  const { nodes, edges } = useMemo(() => {
    const groups = groupByRoot(tasks);
    const allNodes: Node[] = [];
    const allEdges: Edge[] = [];

    for (const [, group] of Object.entries(groups)) {
      const { nodes, edges } = buildHierarchy(group);
      allNodes.push(...nodes);
      allEdges.push(...edges);
    }

    return { nodes: allNodes, edges: allEdges };
  }, [tasks]);

  const nodeTypes = useMemo(() => ({ taskNode: TaskNode }), []);
  const [maxX, maxY] = [
    Math.max(...nodes.map((n) => n.position.x)),
    Math.max(...nodes.map((n) => n.position.y)),
  ];
  console.log([maxX, maxY]);

  return (
    <div className="w-full h-[600px] bg-white rounded-xl border border-slate-200">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
        nodesConnectable
        panOnScroll
        minZoom={0.5}
        maxZoom={2}
        translateExtent={[
          [-100, -100],
          [maxX + 200, maxY + 100],
        ]}
      >
        <Background gap={14} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
