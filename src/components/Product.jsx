const Product = ({
  name,
  image,
  daysLeft,
  onClick,
  bgColor,
  borderColor = "bg-white",
}) => {
  // 진행바 계산 (예: 20일 기준)
  const progressValue = Math.max(
    0,
    Math.min(100, ((20 - daysLeft) / 20) * 100),
  );

  // 유통기한 음수 -> 양수 변환
  const ddayformat = (daysLeft) => {
    if (daysLeft === Infinity || isNaN(daysLeft)) return "기한 없음";

    if (daysLeft === 0) {
      return "D-DAY";
    } else if (daysLeft > 0) {
      return `D-${daysLeft}`;
    } else {
      return `D+${Math.abs(daysLeft)}`;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`flex h-38.5 w-full cursor-pointer flex-col overflow-hidden rounded-[10px] border ${borderColor} pb-2`}
    >
      {/*이미지 */}
      <div className="relative h-40 w-full bg-gray-200">
        {image ? (
          <img className="h-full w-full object-cover" src={image} alt={name} />
        ) : (
          <div className="font-main flex h-full w-full items-center justify-center text-xs text-gray-400">
            이미지 없음
          </div>
        )}

        {/* D-Day 배지 (우측 하단 고정) */}
        <div
          className={`font-main absolute right-2 bottom-2 rounded-sm px-1 text-[14px] text-white ${bgColor}`}
        >
          {ddayformat(daysLeft)}
        </div>
      </div>

      {/* 하단 정보 영역 */}
      <div className="h-[45px] px-1 py-1">
        <h3 className="font-main-Regular truncate text-[14px] text-black">
          {name}
        </h3>

        {/* 진행 바 커스텀 */}
        <div className={`mt-1.5 h-3 w-full rounded-full bg-gray-200`}>
          <div
            className={`h-full rounded-full ${bgColor}`}
            style={{ width: `${progressValue}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Product;
