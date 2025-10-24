import type React from "react";
import { useEffect } from "react";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  onClose?: () => void;
}

function Modal({ isOpen, onClose, className, ...props }: ModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen && onClose) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    isOpen && (
      <div className="modal-overlay">
        <div
          className={`modal ${className ?? ""}`}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
          <div className="modal-content">{props.children}</div>
        </div>
      </div>
    )
  );
}

export default Modal;
