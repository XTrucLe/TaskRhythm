import React from "react";
import Header from "../../components/ui/Header";
import WorkspaceCard from "../../components/ui/WorkspaceCard";
import { workspacesMockup } from "../../mock/workspaces";
import { useCurrentTime } from "../../hooks/useCurrentTime";
import TaskEntry from "../../components/ui/TaskEntry";
import { mockTaskEntries } from "../../mock/taskEntry";
import { Button } from "../../components/ui/Button";
import Card from "../../components/ui/Card";

function DashboardPage() {
  const currentTime = useCurrentTime();
  const [recentActivities] = React.useState(mockTaskEntries);

  return (
    <div>
      <Header />
      <main className="p-6 pt-2">
        {/* Greeting Header */}
        <GreetingHeader currentTime={currentTime} />

        {/* Workspace Section */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Your Workspaces</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {workspacesMockup.map((workspace) => (
              <WorkspaceCard key={workspace.id} workspace={workspace} />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <Card>
            <h3 className="text-3xl font-bold mb-4">Recent Activities</h3>
            {recentActivities.length === 0 ? (
              <p className="text-gray-500">No recent activities.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 [@media(min-width:1920px)]:grid-cols-3">
                {recentActivities.map((activity, index) => (
                  <TaskEntry key={index} item={activity} />
                ))}
              </div>
            )}
          </Card>
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
        <h1 className="text-4xl font-bold">Welcome back!</h1>
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
      <Button className="btn btn-primary">+ New Workspace</Button>
    </div>
  );
});

export default DashboardPage;
