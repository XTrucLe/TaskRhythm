import type { ReactNode, ButtonHTMLAttributes } from "react";

type ModalButtonType = "OK" | "Cancel" | "Delete" | "Close" | "None";

type ModalButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType?: ModalButtonType;
  label: string;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
};

export function ModalButton({
  buttonType = "None",
  label,
  ...props
}: ModalButtonProps) {
  const typeStyles: Record<ModalButtonType, string> = {
    OK: "bg-blue-500 text-white hover:bg-blue-600",
    Cancel: "bg-gray-500 text-white hover:bg-gray-600",
    Delete: "bg-red-500 text-white hover:bg-red-600",
    Close: "bg-gray-300 text-black hover:bg-gray-400",
    None: "bg-transparent text-black hover:bg-gray-200 border border-[var(--color-border)]",
  };
  return (
    <button
      className={`
        px-4 py-2 rounded
        ${typeStyles[buttonType ?? "None"]}
        focus:outline-none focus:ring-2 focus:ring-offset-2
        transition
        `}
      {...props}
    >
      {label[0].toUpperCase() + label.slice(1)}
    </button>
  );
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
}: ModalProps) {
  if (!isOpen) return null;

  const sizes: Record<typeof size, string> = {
    sm: "w-80",
    md: "w-96",
    lg: "w-[36rem]",
  };

  return (
    <div className="modal" aria-modal="true" role="dialog">
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "var(--color-modal-overlay)" }}
        onClick={onClose}
      />

      {/* Modal content */}
      <div
        className={`
          modal-content
          ${sizes[size]}
          z-10
        `}
      >
        {/* Header */}
        {title && (
          <div
            className="text-lg font-semibold mb-4"
            style={{ color: "var(--color-modal-header)" }}
          >
            {title}
          </div>
        )}

        {/* Body */}
        <div className="mb-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div
            className="flex justify-end space-x-2 text-sm"
            style={{ color: "var(--color-modal-footer)" }}
          >
            {footer}
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-3 text-gray-400 hover:text-gray-600 font-bold text-2xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
