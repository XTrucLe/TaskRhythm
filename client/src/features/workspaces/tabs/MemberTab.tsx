import MemberCard from "@/features/members/components/MemberCard";
import { useWorkspaceStore } from "@/features/workspaces/stores/useWorkspaceStore";

function MemberTab() {
  const { members, searches } = useWorkspaceStore();
  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes((searches.members || "").toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {filteredMembers.length > 0 ? (
        filteredMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))
      ) : (
        <p>No members found.</p>
      )}
    </div>
  );
}

export default MemberTab;
