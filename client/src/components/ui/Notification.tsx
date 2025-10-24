/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import {
  RiCloseFill,
  RiErrorWarningFill as RiWarningFill,
  RiCloseCircleFill as RiErrorFill,
  RiInformationFill,
  RiCheckboxCircleFill as RiSuccessFill,
} from "react-icons/ri";

type NoticeficationType = "info" | "warning" | "error" | "success";

type Toast = {
  id: number;
  title: string;
  message: string;
  type: NoticeficationType;
  closeButton?: boolean;
  timeout?: number;
};

let toasts: Toast[] = [];
let listeners: ((toasts: Toast[]) => void)[] = [];
let id = 0;

export function notify(toast: Omit<Toast, "id">) {
  const newToast = { id: ++id, ...toast };
  toasts = [newToast, ...toasts].slice(0, 5);
  emit();
  setTimeout(() => remove(newToast.id), newToast.timeout ?? 10000);
}

function emit() {
  listeners.forEach((listener) => listener(toasts));
}

function remove(id: number) {
  toasts = toasts.filter((toast) => toast.id !== id);
  emit();
}

function NotificationContainer() {
  const [items, setItems] = useState<Toast[]>([]);

  useEffect(() => {
    listeners.push(setItems);
    return () => {
      listeners = listeners.filter((fn) => fn !== setItems);
    };
  }, []);

  const renderIcon = (type: NoticeficationType) => {
    const icons = {
      info: <RiInformationFill size={32} color="var(--color-info)" />,
      warning: <RiWarningFill size={32} color="var(--color-warning)" />,
      error: <RiErrorFill size={32} color="var(--color-danger)" />,
      success: <RiSuccessFill size={32} color="var(--color-success)" />,
    };
    return icons[type] ?? null;
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-1">
      {items.map((toast, index) => {
        const opacity = 1 - index * 0.15;
        const scale = 1 - index * 0.02;
        const translateY = -index * 15;

        return (
          <div
            key={toast.id}
            className="notification-item transition-all duration-300 ease-in-out animate-fade-in"
            style={{
              opacity,
              transform: `translateY(${translateY}px) scale(${scale})`,
              zIndex: items.length - index,
            }}
          >
            <div className="notification-icon">{renderIcon(toast.type)}</div>
            <div className="notification-content">
              <div className="notification-title">{toast.title}</div>
              <div className="notification-message">{toast.message}</div>
            </div>
            {toast.closeButton && (
              <button
                className="notification-close"
                onClick={() => remove(toast.id)}
              >
                <RiCloseFill size={18} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default NotificationContainer;
