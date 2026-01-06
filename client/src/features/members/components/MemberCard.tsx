import type { UserBase } from "@/features/auth/types";
import MemberAvatar from "./MemberAvatar";
import { Button } from "@mui/material";

function MemberCard({ member }: { member: UserBase }) {
  return (
    <div className="flex items-center px-4 py-3 md:max-w-sm  w-full border-b border-gray-300">
      <MemberAvatar url={member.avatarUrl} name={member.name} size={48} />

      <div className="ml-4 flex flex-col min-w-0 flex-1">
        <span className="text-sm font-medium text-secondary truncate">
          {member.name}
        </span>

        <span className="text-xs text-muted truncate">{member.email}</span>
      </div>

      <span className="ml-3 px-2 py-0.5 text-xs rounded-md text-muted ">
        Member
      </span>

      <div className="ml-3 shrink-0">
        <Button
          variant="outlined"
          size="small"
          color="error"
          className="!normal-case !font-bold"
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

export default MemberCard;
