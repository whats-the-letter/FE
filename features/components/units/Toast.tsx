import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  duration?: number;
}

const Toast = ({ message, duration }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration || 2000);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!isVisible) return <></>;

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 bg-[#111111] text-white text-sm text-pretendard rounded-md z-50`}
    >
      <span className="text-center">{message}</span>
    </div>
  );
};

export default Toast;
