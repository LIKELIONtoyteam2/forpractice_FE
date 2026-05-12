const Modal = ({ isOpen, onClose, children }) => {
  // 1. isOpen이 false면 아예 화면에 안 나타남
  if (!isOpen) return null;

  return (
    // 배경: 화면 전체를 덮는 반투명 검은색
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose} // 배경 클릭 시 모달 닫힘
    >
      {/* 모달 박스: 흰색 배경, 둥근 모서리, 그림자 */}
      <div
        className="relative w-80 p-6 bg-white rounded-[20px] shadow-2xl"
        onClick={(e) => e.stopPropagation()} // 박스 내부 클릭 시 닫힘 방지
      >
        {/* 우측 상단 닫기 버튼 */}
        <button className="flex flex-row" onClick={onClose}>
          <img src="/icons/X.svg" className="w-6 h-6 mb-4" />
        </button>

        {/* 부모가 보낸 내용(children)이 들어가는 곳 */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
