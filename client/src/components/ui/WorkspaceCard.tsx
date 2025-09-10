import React from "react";
import { FiUsers, FiClock } from "react-icons/fi";
import { CustomAvatar } from "./CustomAvatar"; // avatar component nhỏ gọn

interface Owner {
  name: string;
  avatarUrl?: string;
}

interface WorkspaceCardProps {
  title: string;
  description?: string;
  milestones: string[];
  owner: Owner;
  membersCount: number;
  updatedAt: string; // ISO string
  status: "Active" | "Archived";
  onClick?: () => void;
}

export const WorkspaceCard: React.FC<WorkspaceCardProps> = ({
  title,
  description,
  milestones,
  owner,
  membersCount,
  updatedAt,
  status,
  onClick,
}) => {
  // format thời gian
  const formatUpdatedAt = (date: string) => {
    const diff = Math.floor(
      (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff === 0 ? "Today" : `${diff}d ago`;
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 cursor-pointer border border-gray-100 flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-base font-semibold text-gray-800 truncate pr-2">
          {title}
        </h2>
        <span
          className={`px-2 py-0.5 text-xs rounded-full font-medium ${
            status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Description */}
      {description && (
        <p className="text-gray-500 text-sm line-clamp-2 mb-3">{description}</p>
      )}

      {/* Milestones */}
      <div className="flex flex-wrap gap-2 mb-4">
        {milestones.slice(0, 3).map((ms, idx) => (
          <span
            key={idx}
            className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full"
          >
            {ms}
          </span>
        ))}
        {milestones.length > 3 && (
          <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
            +{milestones.length - 3} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
        <div className="flex items-center gap-2">
          <CustomAvatar src={owner.avatarUrl} alt={owner.name} size={28} />
          <span className="truncate text-gray-700 text-sm">{owner.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <FiUsers className="w-4 h-4" />
            {membersCount}
          </div>
          <div className="flex items-center gap-1">
            <FiClock className="w-4 h-4" />
            {formatUpdatedAt(updatedAt)}
          </div>
        </div>
      </div>
    </div>
  );
};
