const Product = ({
  name,
  image,
  daysLeft,
  onClick,
  category,
  bgColor = "bg-white",
}) => {
  // 진행바 계산 (예: 20일 기준)
  const progressValue = Math.max(
    0,
    Math.min(100, ((20 - daysLeft) / 20) * 100),
  );

  return (
    <div
      onClick={onClick}
      className={`w-full cursor-pointer overflow-hidden rounded-[20px] border border-red-200 pb-3 shadow-sm `}
    >
      {/*이미지 */}
      <div className="relative h-40 w-full bg-gray-200">
        {image ? (
          <img className="h-full w-full object-cover" src={image} alt={name} />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
            이미지 없음
          </div>
        )}

        {/* D-Day 배지 (우측 하단 고정) */}
        <div
          className={`absolute bottom-2 right-2 rounded-lg px-2 py-1 text-sm font-bold text-white ${bgColor}`}
        >
          D-{daysLeft}
        </div>
      </div>

      {/* 하단 정보 영역 */}
      <div className="px-3 pt-3">
        <h3 className="truncate text-lg font-bold text-gray-800">{name}</h3>

        {/* 진행 바 커스텀 */}
        <div className={`mt-2 h-3 w-full rounded-full ${bgColor}`}>
          <div
            className={`h-full rounded-full ${bgColor}`}
            style={{ width: `${progressValue}%` }}
          ></div>
        </div>

        {/* 카테고리가 필요하다면 작게 표시 */}
        {category && <p className="mt-1 text-xs text-gray-400">{category}</p>}
      </div>
    </div>
  );
};

export default Product;
