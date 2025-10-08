import { useLocation } from "react-router-dom";
import Header from "../../components/ui/Header";
import { Button } from "../../components/ui/Button";
import { MdEdit } from "react-icons/md";
import SidingTabs from "../../components/ui/SidingTabs";
import { mockMilestones } from "../../mock/milestone";
import MilestonesRow from "../../components/workspaces/MilestonesRow";

export default function WorkspaceDetailPage() {
  const { data: workspaceInfo } = useLocation().state || {};

  return (
    <div>
      <Header />
      <main className="p-6 py-2">
        <section id="main" className="p-2 rounded-md">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            {/* Title */}
            <h2 className="text-xl font-bold flex items-center">
              Workspace:{" "}
              <span className="ml-2 text-[var(--color-primary-dark)]">
                {workspaceInfo.name}
              </span>
            </h2>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-end gap-2">
              <Button variant="ghost" aria-label="Edit Workspace">
                <MdEdit className="text-2xl font-thin" />
              </Button>
              <Button>Invite</Button>
              <Button variant="danger">Leave</Button>
            </div>
          </div>

          {/* Description */}
          {workspaceInfo.description && (
            <p className="mt-3 text-gray-700 line-clamp-2">
              {workspaceInfo.description}
            </p>
          )}
        </section>
        <nav>
          {/* Tabs */}
          <SidingTabs
            items={[
              { name: "Overview", label: "Overview" },
              { name: "Activity", label: "Activity" },
              { name: "Calendar", label: "Calendar" },
              { name: "Settings", label: "Settings" },
            ]}
            className="border-b "
            onChange={(index) => {
              console.log("Selected tab index:", index);
            }}
          ></SidingTabs>

          {/* Tab Content */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4 px-2">
            {mockMilestones.map((milestone, index) => (
              <MilestonesRow key={index} milestone={milestone} />
            ))}
          </section>

          {/* Pagination */}
          {/* Activity log */}
        </nav>
      </main>
    </div>
  );
}
