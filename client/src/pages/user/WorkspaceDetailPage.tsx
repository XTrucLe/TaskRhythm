import { useLocation, useParams } from "react-router-dom";
import Header from "../../components/ui/Header";
import { Button } from "../../components/ui/Button";
import { MdEdit } from "react-icons/md";

export default function WorkspaceDetailPage() {
  const { workspaceId } = useParams();
  const { data: workspaceInfo } = useLocation().state || {};
  console.log(workspaceId, workspaceInfo);

  return (
    <div>
      <Header />
      <main className="p-6 py-2">
        <section id="main" className="p-4 rounded-md">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            {/* Title */}
            <h2 className="text-2xl font-bold flex items-center">
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
        <nav></nav>
      </main>
    </div>
  );
}
