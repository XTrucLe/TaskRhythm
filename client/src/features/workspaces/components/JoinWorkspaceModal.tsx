import { useState } from "react";
import Modal from "../../../components/ui/Modal";
import { InputField } from "../../../components/ui/InputField";

interface Workspace {
  name: string;
  description: string;
  members: number;
}

interface JoinWorkspaceModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const JoinWorkspaceModal = ({ isOpen, setIsOpen }: JoinWorkspaceModalProps) => {
  const [code, setCode] = useState("");
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [error, setError] = useState("");

  const onClose = () => {
    setIsOpen(false);
    setCode("");
    setWorkspace(null);
    setError("");
  };

  const handleCheck = () => {
    setError("");
    setWorkspace(null);

    if (!code.trim()) {
      setError("Enter workspace code");
      return;
    }

    try {
      // Mock API call
      const data: Workspace = {
        name: "Team Alpha",
        description: "Project X",
        members: 5,
      };
      setWorkspace(data);
    } catch {
      setError("Invalid workspace code");
    }
  };

  const handleJoin = () => {
    if (!workspace) return;
    console.log("Joining workspace:", workspace);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-4 w-full">
        <h1 className="text-xl font-semibold">Join Workspace</h1>
        <p className="text-sm text-gray-500 -mt-2 mb-2">
          Join a workspace using a unique code provided by your team.
        </p>

        <div className="w-full flex flex-col gap-2">
          <InputField
            label="Workspace Code"
            placeholder="Enter workspace code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            error={error}
          />
          <button
            type="button"
            className="self-end bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
            onClick={handleCheck}
          >
            Check
          </button>
        </div>

        {workspace && (
          <div className="w-full p-4 border rounded bg-gray-50 flex flex-col gap-2">
            <h2 className="font-semibold">{workspace.name}</h2>
            <p className="text-sm text-gray-700">{workspace.description}</p>
            <p className="text-sm text-gray-700">
              Members: {workspace.members}
            </p>

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
                onClick={handleJoin}
              >
                Join
              </button>
              <button
                className="px-4 py-2 rounded border border-strong hover:bg-[var(--color-background-secondary)] transition"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default JoinWorkspaceModal;
