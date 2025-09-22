import React from "react";
import Header from "../components/ui/Header";
import WorkspaceCard from "../components/ui/WorkspaceCard";
import { workspacesMockup } from "../mock/workspaces";
import { useCurrentTime } from "../hooks/useCurrentTime";

function DashboardPage() {
  const currentTime = useCurrentTime();
  return (
    <div>
      <Header />
      <main className="p-6 pt-2">
        {/* Greeting Header */}
        <GreetingHeader currentTime={currentTime} />

        {/* Workspace Section */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Your Workspaces</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-6">
            {workspacesMockup.map((workspace) => (
              <WorkspaceCard key={workspace.id} workspace={workspace} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

interface GreetingHeaderProps {
  currentTime: Date;
}

const GreetingHeader = React.memo(({ currentTime }: GreetingHeaderProps) => {
  return (
    <div className="flex w-full justify-between items-center mb-8 mt-3">
      <div>
        <h2 className="text-3xl font-bold">Welcome back!</h2>
        <p className="text-gray-500 ml-1">
          {currentTime.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {" • "}
          {currentTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <button className="btn btn-primary">+ New Workspace</button>
    </div>
  );
});

export default DashboardPage;
