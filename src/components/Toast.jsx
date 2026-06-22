import React from "react";
import { useState, useEffect } from "react";

/**
 * Toast 컴포넌트
 */

const Toast = ({ type = "check", text = "" }) => {
  return (
    <div
      className={`flex w-95 flex-col items-center justify-center gap-2 rounded-[20px] py-5 shadow-sm ${type === "check" ? "bg-white" : "bg-white"}`}
    >
      <p className="font-main-SemiBold text-5 text-black">{text}</p>
      {type === "check" ? (
        <img src="/images/Ganadi.png" />
      ) : (
        <img src="/images/Ganadi.png" />
      )}
    </div>
  );
};

/**
 * ToastManager 컴포넌트
 */

export const ToastManager = ({
  type,
  text,
  isOpen,
  duration = 2000,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setVisible(true);

    //toast 생김-사라짐 전체 구성
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose?.(), 200);
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]); //timer 객체 없애기 위한 clearTimeout

  if (!isOpen) return null;

  return (
    // 💡 [여기 수정] fixed inset-0와 flex를 사용해 화면 전체 기준 완벽한 중앙 정렬을 합니다.
    // pointer-events-none을 주어 토스트 배경 뒤의 버튼들을 클릭할 수 있게 만듭니다.
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      <div
        // pointer-events-auto로 토스트 자체는 클릭이 작동하도록 복구하고,
        // 중앙에서 자연스럽게 위아래로 움직이도록 원래 갖고 계시던 애니메이션을 유지합니다.
        className={`pointer-events-auto transition-all duration-300 ease-out ${
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-95 opacity-0"
        }`}
      >
        <Toast type={type} text={text} />
      </div>
    </div>
  );
};

export default Toast;
