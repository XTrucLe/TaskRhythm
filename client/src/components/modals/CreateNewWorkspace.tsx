import React, { useState } from "react";
import Modal from "../ui/Modal";
import { InputField } from "../ui/InputField";
import Selection from "../ui/Selection";

interface WorkspaceData {
  name: string;
  description: string;
  type: "personal" | "team";
  max_member: number;
}

interface CreateWorkspaceModalProps {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
}

const CreateWorkspaceModal = ({
  modalOpen,
  setModalOpen,
}: CreateWorkspaceModalProps) => {
  const [data, setData] = useState<WorkspaceData>({
    name: "",
    description: "",
    type: "personal",
    max_member: 10,
  });

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name.trim()) {
      setError("Workspace name is required");
      return;
    }
    console.log("Creating workspace:", data);
    setModalOpen(false);
  };

  const handleClose = () => {
    setModalOpen(false);
    setError("");
  };

  return (
    <Modal isOpen={modalOpen} onClose={handleClose}>
      <div className="flex flex-col items-center gap-4 w-full">
        <h1 className="text-xl font-semibold">Create New Workspace</h1>
        <p className="text-sm text-gray-500 -mt-2 mb-4">
          Create a new workspace to collaborate with your team.
        </p>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4 items-start">
            <div className="col-span-2">
              <InputField
                label="Workspace Name"
                placeholder="Enter workspace name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                required
                error={error}
              />
            </div>
            <Selection
              label="Type"
              options={[
                { value: "personal", label: "Personal" },
                { value: "team", label: "Team" },
              ]}
              value={data.type}
              onChange={(e) =>
                setData({
                  ...data,
                  type: e.target.value as "personal" | "team",
                })
              }
            />
          </div>

          <InputField
            label="Description"
            placeholder="Enter workspace description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />

          {data.type === "team" && (
            <InputField
              label="Max Members"
              type="number"
              placeholder="Enter maximum number of members"
              value={data.max_member}
              onChange={(e) =>
                setData({ ...data, max_member: Number(e.target.value) })
              }
            />
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
            >
              Create Workspace
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded border border-strong hover:bg-[var(--color-background-secondary)] transition"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateWorkspaceModal;
